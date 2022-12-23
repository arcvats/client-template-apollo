FROM node:18.12.1-alpine3.15 AS deps

RUN apk update && apk add bash && apk add --no-cache libc6-compat

WORKDIR /mnt/client

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM node:18.12.1-alpine3.15 AS builder

ENV NODE_ENV=development

WORKDIR /mnt/client

COPY . .

COPY --from=deps /mnt/client/node_modules ./node_modules

CMD ["npm", "run", "dev"]
