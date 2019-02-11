from django.conf.urls import url

from .views import PhotoList, EmotionsList

app_name = 'core'

urlpatterns = [
    url(r'^core/photos/$', PhotoList.as_view(), name='photo_list'),
    url(r'^core/emotions/$', EmotionsList.as_view(), name='emotion_list'),
]
