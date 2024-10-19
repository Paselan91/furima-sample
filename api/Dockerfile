###################
# DEVELOPMENT
###################
FROM node:22-alpine3.19 AS development

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache \
    tzdata \
    tini

ENV NODE_ENV development

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

RUN npx prisma generate

USER node


###################
# PRODUCTION BUILD
###################
FROM node:22-alpine3.19 AS build

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn build
RUN yarn install --production --frozen-lockfile && yarn cache clean

RUN npx prisma generate

USER node


###################
# PRODUCTION
###################
FROM node:22-alpine3.19

WORKDIR /usr/src/app

ENV NODE_ENV production

RUN apk update && apk add --no-cache \
    tzdata \
    tini

COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 3000

USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]