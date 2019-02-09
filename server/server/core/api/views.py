from rest_framework import filters
from rest_framework.generics import ListAPIView

from ..models import Picture
from .serializers import PictureSerializer


class PicturesList(ListAPIView):
    serializer_class = PictureSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)
    queryset = Picture.objects.all()
