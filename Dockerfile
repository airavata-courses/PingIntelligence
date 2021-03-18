FROM python:3
WORKDIR /usr/src/app
COPY . .
RUN pip install -r requirements.txt
CMD ["deletealbum.py"]
ENTRYPOINT ["python3"]
#CMD python -u uploadtodrive/uploadgoogle.py


# ENTRYPOINT ["python","manage.py","makemigrations"]
# ENTRYPOINT ["python","manage.py",",migrate"]
# ENTRYPOINT ["python","manage.py","runserver"]

# python /project/uploadtodrive/uploadgoogle.py"

# && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
# CMD python /project/uploadtodrive/deletealbum.py && python /project/uploadtodrive/uploadgoogle.py 
# RUN pip uninstall django
# VOLUME /drf_src
# COPY requirements.txt /project/
# RUN mkdir /project
# WORKDIR /project
