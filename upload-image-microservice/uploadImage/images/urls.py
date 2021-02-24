from django.urls import path
from .views import ImagesViewSet, AlbumsViewSets

urlpatterns = [
    path('images', ImagesViewSet.as_view({
        'post': 'upload'
    })),
    path('images/<str:image_id_user>', ImagesViewSet.as_view({
        'put': 'update'
    })),
]