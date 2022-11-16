ARG VERSION

FROM node:16 as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS branch-version-1
RUN rm -rf database.sqlite && touch database.sqlite
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all

FROM base AS branch-version-2
RUN echo "Keep database"

FROM branch-version-${VERSION} AS final
EXPOSE 3001
CMD [ "npm", "start" ]
