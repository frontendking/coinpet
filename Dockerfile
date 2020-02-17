FROM node:12.14.1-slim
COPY . .
RUN npm install
CMD ["node", "src/api-server"]
