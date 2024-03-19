FROM node:20-alpine as node

FROM node as development
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV PORT=4000
EXPOSE $PORT
CMD ["npm", "run", "start:dev"]

FROM node as build
WORKDIR /app
COPY . .
RUN npm install -g \
   @nestjs/cli@$(node -pe "require('./package-lock.json').packages[''].devDependencies['@nestjs/cli']")
RUN npm ci --omit=dev
RUN npm run build

FROM node as production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
ENV PORT=4000
EXPOSE $PORT
CMD ["npm", "run", "start:prod"]
