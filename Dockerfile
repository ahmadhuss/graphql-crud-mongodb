ARG REPO=831597937841.dkr.ecr.us-east-1.amazonaws.com/node-16-alpine:16-alpine

FROM ${REPO}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]

# For the developnment
# CMD ["npm", "run", "dev"]
