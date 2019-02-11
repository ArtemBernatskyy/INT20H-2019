from django.contrib import admin

from .models import Photo, Emotion, PhotoEmotion


class PhotoEmotionInline(admin.TabularInline):
    model = PhotoEmotion
    extra = 0


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)
    list_filter = ('is_analyzed',)
    inlines = (PhotoEmotionInline,)


@admin.register(Emotion)
class EmotionAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    inlines = (PhotoEmotionInline,)
