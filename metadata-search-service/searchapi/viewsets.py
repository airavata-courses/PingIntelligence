from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend


class SearchViewSet(viewsets.ModelViewSet):
    queryset = models.Metadata.objects.all()
    serializer_class = serializers.MetadataSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['title','height','width','formats','annotationtags','description','created_on','description','albumname']

    def destroy(self, request, *args, **kwargs):
        print(kwargs.get('pk'))
        if(kwargs.get('pk').find("|") == -1):
            models.Metadata.objects.filter(albumname=kwargs.get('pk')).delete()
        else:
            ind = kwargs.get('pk').index('|')
            albumname = kwargs.get('pk')[:ind]
            search = kwargs.get('pk')[ind+1:]
            models.Metadata.objects.filter(title=search).delete()
        return super(SearchViewSet, self).destroy(request, *args, **kwargs)

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