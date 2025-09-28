FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN SKIP_ENV_VALIDATION=true npm run build

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]