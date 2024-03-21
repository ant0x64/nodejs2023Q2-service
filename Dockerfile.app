FROM node:20-alpine as node

FROM node as development
WORKDIR /app
COPY . .
RUN npm install && \
    npm cache clean --force
CMD ["npm", "run", "start:dev"]

FROM development as build
RUN npm install -g \
   @nestjs/cli@$(node -pe "require('./package-lock.json').packages[''].devDependencies['@nestjs/cli']") && \
   npm ci --omit=dev --omit=optional && \
   npm run build && \
   mkdir /build && mv package*.json node_modules dist /build

FROM node as production
WORKDIR /app
COPY --from=build /build ./
CMD ["npm", "run", "start:prod"]
