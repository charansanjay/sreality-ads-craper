# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /backend

# Copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the entire backend directory to the container
COPY . .

# Expose port 5000 for the application
EXPOSE 5000

# Set the command to start the server
CMD ["node", "index.js"]
