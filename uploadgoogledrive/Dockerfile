FROM python:3

WORKDIR /uploadgoogledrive
COPY . /uploadgoogledrive

RUN pip install -r requirements.txt

EXPOSE 9095
CMD ["python3", "./uploadphtotostodrive.py"]