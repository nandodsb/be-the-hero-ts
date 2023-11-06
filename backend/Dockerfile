FROM node:18.18-alpine

RUN npm i -g pnpm
RUN pnpm install pm2 -g

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

COPY package.json pm2.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/
RUN pnpm dlx prisma generate

COPY . .


RUN pnpm run build

EXPOSE 8080


CMD ["pm2-runtime", "start", "pm2.json"]