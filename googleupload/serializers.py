from rest_framework import serializers
from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

    # def update(self, instance, validated_data):
    #     print(self.cleaned_data['title'])