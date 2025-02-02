# Use Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for faster caching
COPY package*.json ./

# Install dependencies, including webpack
RUN npm install --production

# Copy the app source code
COPY . .

# Build the app using webpack
RUN npm run build

# Expose the app port (e.g., 8080)
EXPOSE 8080

# Start the app using pm2 or any process manager
CMD ["pm2", "serve", "build", "--port", "8080", "--spa"]