FROM openjdk:8
FROM maven:alpine
WORKDIR /usermgmt
COPY . /usermgmt
RUN mvn clean install -DskipTests
RUN mvn package -DskipTests
EXPOSE 8080
EXPOSE 8081
ENTRYPOINT ["java","-jar","/usermgmt/target/pingintelligence_usermanagement-0.0.1-SNAPSHOT.jar"]