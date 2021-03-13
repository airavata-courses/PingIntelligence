from kafka import KafkaConsumer
import io
import base64
from time import sleep
from json import dumps
from kafka import KafkaProducer
import requests

consumer1 = KafkaConsumer('test2', bootstrap_servers=['kafka:9092'])


def deletefiles(albumname):
    print(albumname)
    # dict2['albumname'] = albumname
    # url = 
    res = requests.delete("http://django-google:9000/google/upload/images/" + albumname)
    print(res.status_code)
    # url1 = 
    # res1 = requests.delete("http://127.0.0.1:9000/search/images/" + albumname)
    # print(res1.status_code)



def main():
    while True:
        for message in consumer1:
            y = json.loads(message.value)
            deletefiles(y["albumname"])

if __name__ == "__main__":
    main()