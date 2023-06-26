# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /backend
COPY . .
RUN npm install --production
CMD ["node", "./index.js"]
EXPOSE 8000