from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend


class SearchViewSet(viewsets.ModelViewSet):
    queryset = models.Metadata.objects.all()
    serializer_class = serializers.MetadataSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['photoname','height','width','formats','annotationtags','description','created_on','description']

    # def date_list(self, request):
    #     queryset = models.Metadata.objects.all()
    #     serializer_class = serializers.MetadataSerializer
        


# height = models.IntegerField(default='0')
#     width = models.IntegerField(default='0')
#     mode = models.CharField(max_length=100,default='')
#     formats = models.CharField(max_length=100,default='')
#     image = models.BinaryField(blank = True, null = True, editable = True)
#     annotationtags  = models.CharField(max_length=100,default='')
#     created_on = models.TextField(null=True)
#     description = models.CharField(max_length=300,default='')
#     photoname = models.CharField(max_length=300,default='')