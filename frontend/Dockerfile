# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the entire frontend directory to the container
COPY . .

# Expose multiple ports 3000 and 8080 for the application
EXPOSE 3000 8080

# Set the command to start the server
CMD ["npm", "start"]
