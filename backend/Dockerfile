FROM node:12
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
VOLUME .:/usr/src/app
EXPOSE ${PORT}
CMD ["npm", "run", "dev"]