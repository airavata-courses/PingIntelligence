from rest_framework import serializers

from .models import Albums, Images

class ImageSerializer(serializers.ModelSerializer):
    #user_id = serializers.JSONField()

    class Meta:
        model = Images
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Albums
        fields = '__all__'