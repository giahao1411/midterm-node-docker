# use an official Node.js runtime as the base image
FROM node:16

# set the working directory in the container
WORKDIR /app

# copy the package.json and package-lock.json files to the container
COPY package*.json ./

# install Node.js dependencies
RUN npm install 

# copy the rest of the application code to the container
COPY . .

# expose a port if your application lsitens on a specific port
EXPOSE 3000

# define the command to run your application
CMD [ "node", "app.js" ]
