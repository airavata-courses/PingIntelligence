# PingIntelligence

<p align="center">
  <img width="280" height="200"
  src="Design_Documents/Logo/logo.JPG">
</p>

## Project Overview

<div style="text-align: justify"> This project provides a user interface to upload photos to the archive on remote storage servers. It provides pipelines for extracting additional picture metadata using open-source image parsing libraries & Image tags using ML/DL algorithms. The application also enables browsing the photos organized into collections and metadata & tag based searches. It makes use of distributed systems architecture along with Micro-services & Micro-Frontends, and Cloud-Native Architecture principles.</div></br>

<b>Languages Used:</b>
1. Front-End: <i> React.JS </i>
2. Back-End: <i> Java, Python, Node.js </i>


## Napkin Diagram
Ping Intelligence is a personal photo sharing and backup application which will enable to users and its groups to store memories.

<div style="text-align: justify"> Ping Intelligence is a personal photo sharing and backup application which will enable to users and its groups to store memories.

User has the ability to organize their photos into albums.
The user can upload photos and store it in personalized albums. User can also share these albums with other users.
The user can keep albums as private as a personal backup option.
The user has the ability to browse all photos uploaded by him/her and also browse albums shared with the users by other users.
The filter feature enables the user just view images which meet a certain criteria like pictures taken on a specific date or pictures above or below a certain resolution.</div></br>

![Napkin](Design_Documents/napkin_diagram.PNG)


## Architecture Diagram
![Architecture](Design_Documents/architecture.png)

## How to use?
> git clone --recurse-submodules git@github.com:airavata-courses/PingIntelligence.git

### Front-End (React JS)
> cd front-end/

> npm install

> npm start

> Note: Current configuration does not work for registering new user. Login can be made using username: user & password: abcd.


### Gateway API Service & User Management Service (Spring Boot)
> cd restful-web-services/

> Import As "Existing Maven Project" into the IDE.

> Update the Maven project.

> Go to pom.xml > right-click > run > maven Build> Enter Goals: clean install > run

> Once Build is Successful go to "RestfulWebServicesApplication.java" > right-click > Run > Run as Spring Boot Application.


### Metadata Extraction API Service (Spring Boot)
> cd metadata_extraction_microservice/

> Import As "Existing Maven Project" into the IDE.

> Update the Maven project.

> Go to pom.xml > right-click > run > maven Build> Enter Goals: clean install > run

> Once Build is Successful go to "App.java" > right-click > Run > Run as Spring Boot Application.



### Upload Image Microservice (Django)
> cd upload-image-microservice

> Open Command prompt in this directory and create virtual environment
> python -m venv venv
> .\venv\Scripts\activate

> Install required libraries from requirements.txt
> pip install -r requirements.txt

> Create your Google Drive API credentials.json file (https://developers.google.com/drive/api/v3/quickstart/python)
> save the credentials.json file in upload-image-microservice\uploadImage\google-drive-upload folder

> Start the microservice
> go to uploadImage folder
> python manage.py runserver

Note: First time when you run the drive-upload file, Google account will need to be verified in browser






## Team Introduction

- [Sudip Padhye](https://www.linkedin.com/in/sudippadhye/)
- [Meet Valia](https://www.linkedin.com/in/meet-valia)
- [Srikanth Velpuri](https://in.linkedin.com/in/srikanth-velpuri-706314100)
