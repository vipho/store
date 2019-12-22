FROM node:12-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --silent

COPY . .

ARG API_URL
ENV API_URL $API_URL

RUN yarn build

EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "start"]
