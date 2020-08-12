FROM openjdk:11-jre-slim
#RUN apt-get update
#RUN apt-get -qq -y install curl
WORKDIR /service
COPY target/*.jar service.jar
EXPOSE 8080
ENTRYPOINT exec java -server \
-noverify \
-XX:TieredStopAtLevel=1 \
-Dspring.jmx.enabled=false \
$JAVA_OPTS \
-jar service.jar