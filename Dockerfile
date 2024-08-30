FROM node:18-alpine3.16

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile 

COPY . .

RUN npx prisma generate && pnpm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs" ]
