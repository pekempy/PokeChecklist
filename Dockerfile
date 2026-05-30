FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the application port
EXPOSE 8876

# Set environment variables
ENV PORT=8876

# Run the server
CMD ["node", "server.js"]
