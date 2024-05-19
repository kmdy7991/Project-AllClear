FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar /app

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

EXPOSE 3020

CMD ["java", "-jar", "/app/*.jar"]