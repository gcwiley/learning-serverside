# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.0.0

FROM node:${NODE_VERSION}

# use production mode environment by default
ENV NODE_ENV production

# set the working directory in the container
WORKDIR /usr/src/app

# copy package.json and package-lock.json 
COPY package*.json ./

# install the application dependencies
# creates a 'node_modules' directory within the container, containing all of the required dependencies. 
RUN npm install

# run the application as a non-root user
USER node

# copy the application code
COPY . . 

# expose the port the application listens on.
EXPOSE 3000

# run the application - the container will run this command when it starts
CMD node src/app.js