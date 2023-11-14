FROM node:18.18-alpine

RUN npm i -g pnpm


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk add --update --no-cache openssl

RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/
RUN pnpm dlx prisma generate

COPY . .

RUN pnpm run build
EXPOSE 80
EXPOSE 8080


CMD ["pnpm", "start"]