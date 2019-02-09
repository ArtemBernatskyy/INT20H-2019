from django.conf.urls import url

from .views import PicturesList

app_name = 'core'

urlpatterns = [
    url(r'^core/pictures/$', PicturesList.as_view(), name='picture_list'),
]
