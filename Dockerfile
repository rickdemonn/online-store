#FROM postgres:12-alpine
##RUN apt-get update
##RUN apt-get -qq -y install curl
#WORKDIR src/main
#COPY target/*.jar src/main/
#EXPOSE 8080
#ENTRYPOINT exec java -server \
#-noverify \
#-XX:TieredStopAtLevel=1 \
#-Dspring.jmx.enabled=false \
#$JAVA_OPTS \
#-jar demo-online-store-0.0.1-SNAPSHOT.jar