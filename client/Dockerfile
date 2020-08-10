#prepare deps-only pkg.json
FROM alpine as pkg-deps-only
RUN apk add --no-cache jq
COPY ./package.json ./package_org.json
RUN cat package_org.json | jq '{dependencies, devDependencies}' > package.json

#actual application
FROM node:12.8.0-alpine as run-client
WORKDIR /usr/src/app
COPY  --from=pkg-deps-only /package.json ./

RUN npm install
COPY . .
COPY /package.json ./
# Copy should skip node_modules

CMD npm run docker:deploy
