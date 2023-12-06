FROM node:18-alpine3.18 AS base

ENV DIR /project
WORKDIR $DIR

#=====================================================#

FROM base AS build

RUN apk update && apk add --no-cache dumb-init

COPY package*.json $DIR

RUN npm i

COPY tsconfig*.json $DIR
COPY src $DIR/src

RUN npm run build

#=====================================================#

FROM base AS development

ENV NODE_ENV=development

COPY package*.json $DIR

RUN npm i

COPY tsconfig*.json $DIR
COPY src $DIR/src


EXPOSE $PORT
CMD ["npm", "run", "dev"]


#=====================================================#

FROM base AS production

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

ENV NODE_ENV=production
EXPOSE $PORT
CMD ["dumb-init", "node", "dist/app.js"]