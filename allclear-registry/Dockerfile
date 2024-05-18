FROM openjdk:17

WORKDIR /app

COPY build/libs/*.jar application.jar

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

EXPOSE 3020

CMD ["java", "-jar", "application.jar"]