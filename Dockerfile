# syntax=docker/dockerfile:1

# use an official node.js runtime as a parent image
# starts with a clean node.js base image
FROM node:20

# set the working directory in the container
WORKDIR /usr/src/app

# copy package.json and package-lock.json 
COPY package*.json ./

# install the application dependencies
# creates a 'node_modules' directory within the container, containing all of the required dependencies. 
RUN npm install

# copy the application code
COPY . . 

# expose the port the application listens on.
EXPOSE 3000

# run the application - the container will run this command when it starts
CMD node src/app.js