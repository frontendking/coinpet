FROM node:12.16.1-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV API_URL=http://coinpet:5000
RUN npm run build
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080
CMD [ "npm", "start" ]
