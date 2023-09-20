# Fetching the latest node image on apline linux
FROM node:18-alpine AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /my-story-reactjs-app

# Installing dependencies
COPY package.json package-lock.json yarn.lock ./
RUN yarn install

# Copying all the files in our project to working dir
COPY . .

RUN yarn run build