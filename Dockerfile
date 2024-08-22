FROM node:20.16-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

RUN npm install -g prisma

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN prisma generate

RUN prisma db seed

RUN pnpm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs" ]
