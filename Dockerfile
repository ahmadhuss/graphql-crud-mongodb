FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]

# For the developnment
# CMD ["npm", "run", "dev"]
