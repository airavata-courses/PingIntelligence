from kafka import KafkaConsumer
import io
import base64
from time import sleep
import json
from kafka import KafkaProducer
import requests

consumer1 = KafkaConsumer('test2', bootstrap_servers=['kafka:9092'])


def deletefiles(albumname):
    res = requests.delete("http://django-google:9000/google/upload/images/" + albumname)
    res1 = requests.delete("http://metadata-search:8000/search/images/" + albumname)

def main():
    while True:
        for message in consumer1:
            y = json.loads(message.value)
            deletefiles(y["albumname"])

if __name__ == "__main__":
    main()