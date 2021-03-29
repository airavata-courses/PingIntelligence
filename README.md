<p align="center">
  <img width="280" height="200"
  src="https://github.com/airavata-courses/PingIntelligence/blob/main/Design_Documents/Logo/logo.JPG">
</p>

## Dependencies

1. <a href="https://docs.docker.com/get-docker/">Docker</a>

## Steps to run

> cd gateway/apigateway/

> docker build -f Dockerfile -t pingintelligence/gateway-image .

> cd ../..

> cd ui/ui/

> docker build -f Dockerfile -t pingintelligence/ui-image .

> cd ../..

> cd user_management/user_management/

> docker build -f Dockerfile -t pingintelligence/user-mgmt-image .

> cd ../..

> cd mainuploadmgmt/

> docker build -f Dockerfile -t pingintelligence/upload-mgmt-image .

> cd ../

> cd uploadgoogledrive/

> docker build -f Dockerfile -t pingintelligence/upload-google-image .

> cd ../

> docker-compose up -d
