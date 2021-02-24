from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from apiclient.http import MediaFileUpload, MediaIoBaseDownload

import os
import requests
import io
import json



class MyDrive:
    def __init__(self):

        # If modifying these scopes, delete the file token.pickle.
        SCOPES = ['https://www.googleapis.com/auth/drive']
        """Shows basic usage of the Drive v3 API.
        Prints the names and ids of the first 10 files the user has access to.
        """
        creds = None
        # The file token.pickle stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        if os.path.exists('token.pickle'):
            with open('token.pickle', 'rb') as token:
                creds = pickle.load(token)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.pickle', 'wb') as token:
                pickle.dump(creds, token)

        self.service = build('drive', 'v3', credentials=creds)



    def list_files(self, page_size = 10):
        # Call the Drive v3 API
        results = self.service.files().list(
            pageSize=10, fields="nextPageToken, files(id, name)").execute()
        items = results.get('files', [])

        if not items:
            print('No files found.')
        else:
            print('Files:')
            for item in items:
                print(u'{0} ({1})'.format(item['name'], item['id']))


    def upload_files(self):
        # URL = "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable"
        # initialResponse = requests.post(URL)

        file_metadata = {"name": "nature6.jpg", "user_id": 1, "category": 'city'}
        media = MediaFileUpload(r"D:\Semester-IV\Images\Nature\nature6.jpg", mimetype = 'image/jpeg')
        file_upload = self.service.files().create(body = file_metadata, media_body = media, fields = 'id').execute()

        print("FILE ID:", file_upload.get('id'))


    def multiple_files(self):
        files = ['D:\Semester-IV\Images\Cartoons\cartoon3.jpg', 'D:\Semester-IV\Images\Cartoons\cartoon4.jpg']
        mime_type = 'image/jpeg'
        file_metadata = [{"name": "cartoon3.jpg", "user_id": 1, "category": 'cartoon'}, 
                         {"name": "cartoon4.jpg", "user_id": 1, "category": 'cartoon'}]

        file_uploads = []

        for i in range(len(files)):
            media = MediaFileUpload(files[i], mimetype = mime_type)
            file_uploads.append(self.service.files().create(body = file_metadata[i], media_body = media, fields = 'id').execute())

        file_id = []
        for i in range(len(file_uploads)):
            file_id.append(file_uploads[i].get('id'))

        print(file_id)

    def get_file_metadata(self):
        file_id = '1WgtmLUXjKBTNIsbQBCdR1pCBF1i3k3rw'
        meta_data = self.service.files().get(fileId = file_id).execute()
        print(meta_data)


    def download_files(self):
        user_id = 1
        file_ids = ['1FqzIaPqpnLZiXxpzqD82vdxmRYybTSn5', '1O8B0qM-yNOJuSp89i8KKdAXPKU_yrOBB']

        for file_id in file_ids:
            request = self.service.files().get_media(fileId = file_id)

            fh = io.BytesIO()
            downloader = MediaIoBaseDownload(fd = fh, request = request)
            done = False

            while not done:
                status, done = downloader.next_chunk()

            fh.seek(0)

            with open(os.path.join('./'+ str(user_id) + file_id + ".jpg"), 'wb') as f:
                f.write(fh.read())
                f.close()

            

# curl \
#   'https://www.googleapis.com/drive/v2/files/1WgtmLUXjKBTNIsbQBCdR1pCBF1i3k3rw?key=[YOUR_API_KEY]' \
#   --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
#   --header 'Accept: application/json' \
#   --compressed





def main():
    mydrive = MyDrive()
    #mydrive.list_files()
    #mydrive.upload_files()
    mydrive.multiple_files()
    #mydrive.download_files()
    #mydrive.get_file_metadata()
    

    

if __name__ == '__main__':
    main()