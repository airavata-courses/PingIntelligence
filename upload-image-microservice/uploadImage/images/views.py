from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Images, Albums
from .serializers import AlbumSerializer, ImageSerializer

# Create your views here.
class AlbumsViewSets(APIView):
    def get(self, _):
        albums = Albums.objects.all()



class ImagesViewSet(viewsets.ViewSet):
    def upload(self, request):
        serializer = ImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, image_id_user):
        image = Images.objects.get(image_id_user = image_id_user)
        print(image)
        serializer = ImageSerializer(instance = image, data = request.data)
        serializer.is_valid(raise_exception=True)