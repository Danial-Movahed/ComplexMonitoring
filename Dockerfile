FROM apquinit/adonisjs
MAINTAINER Seyed Danial Movahed
LABEL env=production
ENV NODE_ENV=development
EXPOSE 80
RUN mkdir -p /build
RUN node ace build
WORKDIR /build
RUN npm ci --omit="dev"
CMD ["node","bin/server.js"]
