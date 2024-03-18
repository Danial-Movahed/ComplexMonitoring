FROM alpine:20240315
MAINTAINER Seyed Danial Movahed
LABEL production
EXPOSE 80
RUN apk add --update nodejs npm
WORKDIR /
RUN npm i
RUN ls
RUN pwd
RUN mkdir -p /build
RUN node ace build
RUN npm ci --omit="dev"
CMD ["node","bin/server.js"]
