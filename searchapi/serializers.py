from rest_framework import serializers
from .models import Metadata

class MetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metadata
        fields = '__all__'



# {"height": 397, "width": 719, "mode": "RGB", "size": [719, 397], "format": "PNG", "info": {}}
