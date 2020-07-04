FROM node:12.18.1-alpine

RUN mkdir -p /app/reports

WORKDIR /app

#RUN npm install -g yarn
RUN npm install -g mongoose-data-seed

COPY package.json /app

RUN npm install

# Bundle app source
COPY . /app


EXPOSE 3000


CMD ["/bin/sh", "entrypoint.sh"]
