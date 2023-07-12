# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy the package.json and package-lock.json files to the container
COPY package.json .
COPY package-lock.json .

# Install the dependencies
RUN npm install

# Copy the entire frontend directory to the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 8080 for the application
EXPOSE 80

# Set the command to start the server
CMD ["npm", "start"]
