# from kafka import KafkaConsumer
# import json
# import base64
# from time import sleep
# from json import dumps
# from kafka import KafkaProducer

# consumer = KafkaConsumer('metadata', bootstrap_servers=['localhost:9092'])

# gauth = GoogleAuth()
# gauth.LoadCredentialsFile("mycreds.txt")
# if gauth.credentials is None:
#     # Authenticate if they're not there
#     gauth.LocalWebserverAuth()
# elif gauth.access_token_expired:
#     # Refresh them if expired
#     gauth.Refresh()
# else:
#     # Initialize the saved creds
#     gauth.Authorize()
# # Save the current credentials to a file
# gauth.SaveCredentialsFile("mycreds.txt")

# drive = GoogleDrive(gauth)

# def createalbum(albumname):
#     folder = drive.CreateFile({'title': albumname, "mimeType": "application/vnd.google-apps.folder"})
#     folder.Upload()


# def uploadfiles(mydict):
#     # folder = drive.CreateFile({'title': albumname, "mimeType": "application/vnd.google-apps.folder"})
#     # folder.Upload()
#     for i in mydict:
        


# def main():
#     import time 
#     while True:
#         for message in consumer:
#             y = json.loads(message.value)
#             upload_file_list = y["photos"]
#             uploads = []
#             for i in upload_file_list:
#                 uploads.append(i)
#             uploadfiles(y["albumname"], uploads)
#             time.sleep(1)

# if __name__ == "__main__":
#     main()