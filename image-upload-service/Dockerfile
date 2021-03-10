FROM openjdk:8
FROM maven:alpine

WORKDIR /uploadmgmt
COPY . /uploadmgmt

RUN mvn clean install -DskipTests
RUN mvn package -DskipTests

EXPOSE 8092
ENTRYPOINT ["java","-jar","/uploadmgmt/target/mainuploadmgmt-0.0.1-SNAPSHOT.jar"]