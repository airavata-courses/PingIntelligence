<p align="center">
  <img width="280" height="200"
  src="https://github.com/airavata-courses/PingIntelligence/blob/main/Design_Documents/Logo/logo.JPG">
</p>

## Dependencies

1. <a href="https://docs.docker.com/get-docker/">Docker</a>

## Steps to run

> docker build -f .\gateway\apigateway\Dockerfile -t gateway-image .

> docker build -f .\ui\ui\Dockerfile -t ui-image .

> docker build -f .\user_management\user_management\Dockerfile -t user-mgmt-image .

> docker-compose up -d
