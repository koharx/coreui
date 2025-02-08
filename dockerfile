FROM node:18.0-alpine 

WORKDIR /app

COPY . .

# the issue: run yarn AFTER copying the outside node_modules
RUN rm -rf node_modules/ && yarn

ENV PORT 8080

EXPOSE $PORT