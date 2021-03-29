from kafka import KafkaConsumer
import io
import base64
from time import sleep
import json
from kafka import KafkaProducer
import requests

consumer = KafkaConsumer('test1', bootstrap_servers=['kafka:9092'])

def uploadfiles(albumname,photos):
    for i in photos:
        dict2 = {}
        dict2['title'] = i["photoname"]
        dict2['photodata'] = i["data"]
        dict2['albumname'] = albumname
        dict2["annotationtags"] = i["annotationtags"]
        dict2["created_on"] = i["createdAt"]
        dict2["description"] = i["description"]
        dict2["photoname"] = i["photoname"]
        dict2["photo_id"] = i["id"]
        r = requests.post("http://django-google:9000/google/upload/images/", data = dict2)
        print(r.status_code)

def main():
    # import time 
    while True:
        for message in consumer:
            y = json.loads(message.value)
            upload_file_list = y["photos"]
            uploads = []
            for i in upload_file_list:
                uploads.append(i)
            uploadfiles(y["albumname"], uploads)
            # time.sleep(1)

if __name__ == "__main__":
    main()