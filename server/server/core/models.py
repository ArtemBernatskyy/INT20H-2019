import uuid
from django.db import models


class Photo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    flickr_id = models.BigIntegerField(unique=True)
    url_m = models.URLField()
    url_o = models.URLField()
    is_analyzed = models.BooleanField(default=False)

    modified_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_date',)

    def __str__(self):
        return self.title


class Emotion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    photos = models.ManyToManyField(Photo, through='PhotoEmotion')

    def __str__(self):
        return self.name


class PhotoEmotion(models.Model):
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    emotion = models.ForeignKey(Emotion, on_delete=models.CASCADE)
    value = models.FloatField()

    def __str__(self):
        return str(self.id)
