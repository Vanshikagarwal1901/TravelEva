from django.urls import path
from .views import translate_text

urlpatterns = [
    path('translate-text/', translate_text),
]
