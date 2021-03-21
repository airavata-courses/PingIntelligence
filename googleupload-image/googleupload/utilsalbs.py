# from pydrive.drive import GoogleDrive
# from kafka import KafkaConsumer
# import json
# from pydrive.auth import GoogleAuth
# from PIL import Image
# from PIL.ExifTags import TAGS
# import io
# import base64
# from time import sleep
# from json import dumps
# from kafka import KafkaProducer
# import requests

# consumer1 = KafkaConsumer('test2', bootstrap_servers=['localhost:9092'])


# def deletefiles(albumname):
#     # dict2['albumname'] = albumname
#     # url = 
#     res = requests.delete("http://127.0.0.1:8000/google/upload/images/" + albumname)
#     # print(res.status_code)
#     # url1 = 
#     res1 = requests.delete("http://127.0.0.1:9000/search/images/" + albumname)
#     # print(res1.status_code)



# def main1():
#     while True:
#         for message in consumer1:
#             y = json.loads(message.value)
#             deletefiles(y["albumname"])

# if __name__ == "__main__":
#     main1()