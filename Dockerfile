FROM node:12.16.1-slim
WORKDIR /usr/src/app
COPY package*.json ./
ENV API_URL=http://coinpet.ga:5000
RUN npm install --only=production
COPY . ./
CMD [ "npm", "start" ]
