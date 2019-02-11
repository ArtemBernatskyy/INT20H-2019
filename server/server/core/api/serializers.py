from rest_framework import serializers

from ..models import Photo, Emotion


class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = (
            'id', 'flickr_id', 'title',
            'flickr_id', 'url_m', 'url_o', 'created_date',
        )


class EmotionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Emotion
        fields = (
            'id', 'name',
        )
