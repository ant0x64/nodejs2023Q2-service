FROM node:20-alpine as node

FROM node as development
WORKDIR /app
COPY . .
RUN npm install --omit=optional && \
    npm cache clean --force
VOLUME [ "/app/src" ]
CMD ["npm", "run", "start:dev"]

FROM node as build
COPY . .
RUN npm install -g \
    @nestjs/cli@$(node -pe "require('./package-lock.json').packages[''].devDependencies['@nestjs/cli']") && \
    npm ci --omit=dev --omit=optional && \
    npm run build && \
    mkdir /build && mv package*.json node_modules dist /build

FROM node as production
WORKDIR /app
COPY --from=build /build ./
RUN mkdir logs
CMD ["npm", "run", "start:prod"]
