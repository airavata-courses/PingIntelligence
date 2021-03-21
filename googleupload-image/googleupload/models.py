from django.db import models

from django_filters.rest_framework import DjangoFilterBackend
from pydrive.drive import GoogleDrive
# from kafka import KafkaConsumer
import json
from pydrive.auth import GoogleAuth
from PIL import Image
from PIL.ExifTags import TAGS
import io
import base64
from time import sleep
from json import dumps
# from kafka import KafkaProducer
import requests
from rest_framework.decorators import action


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

# Create your models here.
class Photo(models.Model):
    # id=models.TextField(null=True)
    google_photo_id = models.TextField(null=True)
    title = models.CharField(max_length=300,default='',unique=True)
    photodata = models.BinaryField(blank = True, null = True, editable = True)
    albumname = models.CharField(max_length=300,default='')
    link = models.TextField(null=True)
    annotationtags = models.CharField(max_length=300,default='')
    createdAt = models.CharField(max_length=300,default='')
    description = models.CharField(max_length=300,default='')
    photoname = models.CharField(max_length=300,default='')


    def save(self,*args, **kwargs):
            metadata = self.photodata
            # print(metadata)
            f = open('hello_level.jpeg', 'wb') 
            f.write((base64.b64decode(self.photodata)))
            f.close()
            file_list = drive.ListFile({'q': "'root' in parents and trashed=false"}).GetList()
            folder_id = ""
            for file in file_list:
                if(file['title'] == self.albumname):
                    folder_id = file['id']
            if not folder_id:
                folder = drive.CreateFile({'title': self.albumname, "mimeType": "application/vnd.google-apps.folder"})
                folder.Upload()
                folder_id = folder['id']  
            file = drive.CreateFile({'title': self.title +".jpeg",'mimeType':"image/jpeg", 'parents': [{'id': folder_id}]})
            f = open('hello_level.jpeg', encoding="utf8",errors='ignore') 
            image = Image.open("hello_level.jpeg")
            f.close()
            file.SetContentFile("hello_level.jpeg")
            file.Upload()
            self.link = file['alternateLink']
            self.google_photo_id = file['id']
            dict = {}
            dict["height"] = image.height
            dict["width"] = image.width
            dict["mode"] = image.mode
            dict["annotationtags"] = self.annotationtags
            dict["created_on"] = self.createdAt
            dict["description"] = self.description
            dict["photoname"] = self.photoname
            dict["size"] = image.size
            dict["formats"] = image.format
            dict["image"] = base64.b64encode(metadata)
            dict["albumname"] = self.albumname
            dict["title"] = self.photoname
            r = requests.post("http://metadata-search:8000/search/images/", data = dict)
            print(r.status_code)
            return super(Photo, self).save(*args, **kwargs)
