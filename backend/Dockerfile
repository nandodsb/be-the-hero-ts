FROM node:18.18-alpine

RUN npm i -g pnpm

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/
RUN pnpm dlx prisma generate

COPY . .

RUN pnpm run build
RUN pnpm install pm2 -g

# EXPOSE 80
EXPOSE 3000

# CMD ["pnpm", "start"]
CMD ["pm2-runtime", "process.yml"]