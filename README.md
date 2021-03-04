<p align="center">
  <img width="280" height="200"
  src="https://github.com/airavata-courses/PingIntelligence/blob/main/Design_Documents/Logo/logo.JPG">
</p>

## Dependencies

1. <a href="https://docs.docker.com/get-docker/">Docker</a>
2. <a href="https://www.npmjs.com/get-npm">npm</a>

## Steps to run

> docker build -f Dockerfile -t gateway-image .

> docker run -p 3001:3001 gateway-image
