FROM node:20.16-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

RUN npm install -g prisma

COPY package.json pnpm-lock.yaml ./

COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile

COPY . .

RUN prisma generate && pnpm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs" ]
