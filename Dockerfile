###################
# DEVELOPMENT
###################
FROM node:22-alpine3.19 AS development

WORKDIR /usr/src/app

# 正しいapk updateとaddの形式に修正
RUN apk update && apk add --no-cache \
    tzdata \
    tini

ENV NODE_ENV development

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node


###################
# PRODUCTION BUILD
###################

FROM node:22-alpine3.19 As build

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

RUN npm ci --omit=dev && npm cache clean --force

USER node


###################
# PRODUCTION
###################

FROM node:22-alpine3.19

WORKDIR /usr/src/app

ENV NODE_ENV production

# 正しいapk updateとaddの形式に修正
RUN apk update && apk add --no-cache \
    tzdata \
    tini

COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 3000

USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "node", "dist/main.js" ]