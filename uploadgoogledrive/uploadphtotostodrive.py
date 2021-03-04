from pydrive.drive import GoogleDrive
from kafka import KafkaConsumer
import json
from pydrive.auth import GoogleAuth
from PIL import Image
from PIL.ExifTags import TAGS
import io
import base64
from time import sleep
from json import dumps
from kafka import KafkaProducer
import requests

consumer = KafkaConsumer('album', bootstrap_servers=['localhost:9092'])


gauth = GoogleAuth()
gauth.LoadCredentialsFile("mycreds.txt")
if gauth.credentials is None:
    # Authenticate if they're not there
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

def createalbum(albumname):
    folder = drive.CreateFile({'title': albumname, "mimeType": "application/vnd.google-apps.folder"})
    folder.Upload()


def uploadfiles(albumname,photos):
    folder = drive.CreateFile({'title': albumname, "mimeType": "application/vnd.google-apps.folder"})
    folder.Upload()
    for i in photos:
        f = open('hello_level.jpeg', 'wb') 
        f.write(base64.b64decode(i["data"]))
        f.close()
        # file = drive.CreateFile({'title': i["photoname"],'mimeType':"image/jpeg", 'parents': [{'id': folder['id']}]})
        # file.SetContentString((str(i["data"])))
        # file.Upload()
        imgdata = base64.b64decode(str(i["data"]))
        image = Image.open(io.BytesIO(imgdata))
        f = open('hello_level.jpeg', encoding="utf8",errors='ignore') 
        image = Image.open("hello_level.jpeg")
        print(image.info)
        dict = {}
        dict["height"] = image.height
        dict["width"] = image.width
        dict["mode"] = image.mode
        dict["annotationtags"] = i["annotationtags"]
        dict["created_on"] = i["createdAt"]
        dict["description"] = i["description"]
        dict["photoname"] = i["photoname"]
        # dict["size"] = image.size
        dict["formats"] = image.format
        # dict["info"] = image.info
        dict["image"] = base64.b64encode(i["data"].encode('utf-8'))
        print(dict)
        r = requests.post("http://127.0.0.1:8000/search/images/", data = dict)
        print(r.status_code)
        # producer = KafkaProducer(bootstrap_servers=['localhost:9092'],
        #                  value_serializer=lambda x: 
        #                  dumps(x).encode('utf-8'))
        # producer.send("metadata", dict)


def main():
    import time 
    while True:
        for message in consumer:
            y = json.loads(message.value)
            upload_file_list = y["photos"]
            uploads = []
            for i in upload_file_list:
                uploads.append(i)
            uploadfiles(y["albumname"], uploads)
            time.sleep(1)

if __name__ == "__main__":
    main()