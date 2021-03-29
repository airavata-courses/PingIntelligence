FROM python:latest
ENV PYTHONUNBUFFERED 1
RUN mkdir /project
WORKDIR /project
ADD . /project/
RUN pip install -r requirements.txt
EXPOSE 8000
CMD python manage.py runserver 0.0.0.0:8000
# EXPOSE 8080

# && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
# CMD python /project/uploadtodrive/deletealbum.py && python /project/uploadtodrive/uploadgoogle.py 
