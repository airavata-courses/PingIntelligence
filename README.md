<p align="center">
  <img width="280" height="200"
  src="https://github.com/airavata-courses/PingIntelligence/blob/main/Design_Documents/Logo/logo.JPG">
</p>

## Dependencies

1. <a href="https://docs.docker.com/get-docker/">Docker</a>

## Steps to run

> docker build -f Dockerfile -t upload-mgmt-image .

> docker run -p 8090:8090 upload-mgmt-image

> docker-compose up -d
