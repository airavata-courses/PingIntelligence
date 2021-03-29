from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth

gauth = GoogleAuth()

# Try to load saved client credentials
gauth.LoadCredentialsFile("mycreds.txt")

if gauth.credentials is None:
    # Authenticate if they're not there

    # This is what solved the issues:
    gauth.GetFlow()
    gauth.flow.params.update({'access_type': 'offline'})
    gauth.flow.params.update({'approval_prompt': 'force'})

    gauth.LocalWebserverAuth()

elif gauth.access_token_expired:

    # Refresh them if expired

    gauth.Refresh()
else:

    # Initialize the saved creds

    gauth.Authorize()

# Save the current credentials to a file
gauth.SaveCredentialsFile("mycreds.txt")  

drive = GoogleDrive(gauth)


class SearchViewSet(viewsets.ModelViewSet):
    queryset = models.Photo.objects.all()
    serializer_class = serializers.PhotoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['albumname','title']

    def destroy(self, request, *args, **kwargs):
        print("I am here", kwargs.get('pk'))
        

        if(kwargs.get('pk').find("|") == -1):
            search = kwargs.get('pk')
            file_list = drive.ListFile({'q': "'root' in parents and trashed=false"}).GetList()
            for file in file_list:
                if(file['title'] == search):
                    file.Trash()  # Move file to trash.
                    file.UnTrash()  # Move file out of trash.
                    file.Delete()
            models.Photo.objects.filter(albumname=search).delete()
        else:
            ind = kwargs.get('pk').index('|')
            albumname = kwargs.get('pk')[:ind]
            # print("folder_id" , folder_id)
            search = kwargs.get('pk')[ind+1:]
            file_list = drive.ListFile({'q': "'root' in parents and trashed=false"}).GetList()
            for file in file_list:
                if(file['title'] == albumname):
                    folder_id = file['id']
            file_list1 = drive.ListFile({'q': '"' + folder_id + '" in parents'}).GetList()
            print(search)
            for file in file_list1:
                if(file['title'] == search + ".jpeg"):
                    file.Trash()  # Move file to trash.
                    file.UnTrash()  # Move file out of trash.
                    file.Delete()
                    print("file deleted")
            models.Photo.objects.filter(title=search).delete()
            # # print(search)
            # print("search", search)
        # print(search)
        

        # if(kwargs.get('pk').find("|") == - 1):
        #     models.Photo.objects.filter(albumname=search).delete()
        # else:
        #     models.Photo.objects.filter(title=search).delete()
        return super(SearchViewSet, self).destroy(request, *args, **kwargs)
        

        