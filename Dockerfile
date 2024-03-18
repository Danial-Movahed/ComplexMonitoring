FROM alpine:20240315
MAINTAINER Seyed Danial Movahed
LABEL env=production
EXPOSE 80
RUN apk add --update nodejs npm
COPY ./ ./app
WORKDIR /app
RUN ls app
RUN npm i
RUN mkdir -p /app/build
RUN node ace build
WORKDIR /app/build
RUN npm ci --omit="dev"
CMD ["node","bin/server.js"]
