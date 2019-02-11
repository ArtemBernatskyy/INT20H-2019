import time
import requests
import flickr_api as flickr
from django.conf import settings

from server.taskapp.celery import app
from .models import Photo, Emotion, PhotoEmotion


@app.task(bind=True)
def check_flickr(self):
    flickr.set_keys(api_key=settings.FLICKR_API_KEY, api_secret=settings.FLICKR_API_SECRET)

    # photos from photoset
    photoset = flickr.Photoset(id=settings.FLICKR_PHOTOSET_ID)
    photos_from_photoset = photoset.getPhotos(extras=['url_m', 'url_o'], media='photos')
    photos_from_photoset_to_save = [
        Photo(
            title=photo.title,
            flickr_id=photo.id,
            url_m=photo.url_m,
            url_o=photo.url_o,
        ) for photo in photos_from_photoset
    ]
    # photos by tag #int20h
    photos_by_tag = flickr.Photo.search(
        tags=settings.FLICKR_PARSE_TAG,
        extras=['url_m', 'url_o'],
        media='photos',
        per_page=500,
    )
    photos_by_tag_to_save = [
        Photo(
            title=photo.title,
            flickr_id=photo.id,
            url_m=photo.url_m,
            url_o=photo.url_o,
        ) for photo in photos_by_tag
    ]
    # merge two unsaved lists into one
    all_photos_to_save = photos_by_tag_to_save + photos_from_photoset_to_save

    # save to db preventing duplicates
    # we will need to wait for Django 2.2 to use bulk_create ignore_conflicts
    all_photos_to_save_flickr_ids = {photo.flickr_id for photo in all_photos_to_save}
    photos_already_exists_flickr_ids = set(
        Photo.objects.filter(
            flickr_id__in=list(all_photos_to_save_flickr_ids)
        ).values_list(
            'flickr_id', flat=True,
        )
    )
    # Note: we save flickr_id as integer in db
    new_photos_to_save = [
        photo for photo in all_photos_to_save if int(photo.flickr_id) not in photos_already_exists_flickr_ids
    ]
    Photo.objects.bulk_create(new_photos_to_save)

    return f'added: {len(new_photos_to_save)} Photos'


@app.task(bind=True)
def detect_emotions(self):
    # we will analyze them batched in order to be able to kill task via timeout
    photos = Photo.objects.filter(is_analyzed=False)[:5]

    for photo in photos:
        result = requests.post(
            'https://api-us.faceplusplus.com/facepp/v3/detect',
            data={
                'api_key': settings.FACE_API_KEY,
                'api_secret': settings.FACE_API_SECRET,
                'image_url': photo.url_m,
                'return_attributes': 'emotion',
            },
        )
        time.sleep(2)   # avoid rate limiting
        for face in result.json()['faces']:
            if 'attributes' in face and 'emotion' in face['attributes']:
                face_emotions = face['attributes']['emotion']
                # process emotions
                for emotion, value in face_emotions.items():
                    # get or save emotion
                    emotion_obj, created = Emotion.objects.get_or_create(
                        name=emotion,
                    )
                    # associate emotion with photo
                    PhotoEmotion.objects.create(
                        photo=photo,
                        emotion=emotion_obj,
                        value=value,
                    )
        photo.is_analyzed = True
        photo.save(update_fields=['is_analyzed'])

    return f'analyzed: {len(photos)} Photos'
