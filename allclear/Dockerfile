FROM node:20.11.1 as builder

WORKDIR /front

COPY package.json .

RUN npm install --silent

COPY . .
RUN npm run build
# RUN npm install react-scripts@3.4.1 -g --silent

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder front/build /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g" "daemon off;"]