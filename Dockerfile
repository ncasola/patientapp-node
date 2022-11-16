FROM node:16
ARG MIGRATE
ARG SEED
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN If ($MIGRATE -eq "true") { npx sequelize-cli db:migrate } Else { echo "Migration skipped" }
RUN If ($SEED -eq "true") { npx sequelize-cli db:seed:all } Else { echo "Seed skipped" }


EXPOSE 3001
CMD [ "npm", "start" ]
