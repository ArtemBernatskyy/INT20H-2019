from django.conf import settings
from rest_framework import filters
from rest_framework.generics import ListAPIView

from ..models import Photo, Emotion
from .serializers import PhotoSerializer, EmotionSerializer


class PhotoList(ListAPIView):
    serializer_class = PhotoSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)

    def get_queryset(self):
        queryset = Photo.objects.prefetch_related(
            'photoemotion_set', 'photoemotion_set__emotion',
        ).filter(is_analyzed=True)
        # quick&dirty method on how to filter Many To Many Through
        emotions_filter = self.request.query_params.get('emotions', None)
        if emotions_filter is not None and len(emotions_filter) > 2:
            emotions_filter_list = [x.strip() for x in emotions_filter.split(',')]
            queryset = queryset.filter(
                photoemotion__emotion__name__in=emotions_filter_list,
                photoemotion__value__gte=settings.FACE_SURENESS_IN_EMOTION,
            ).order_by('-id').distinct('id')
        return queryset


class EmotionsList(ListAPIView):
    queryset = Emotion.objects.all()
    serializer_class = EmotionSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)
