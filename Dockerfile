# Step 1: Build React client
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# This will build React app and move build into server/
RUN npm run build

# Step 2: Production image for server
FROM node:18
WORKDIR /app
# Copy only server code and package files
COPY --from=build /app/server ./server
COPY --from=build /app/package*.json ./
# Install only production dependencies
RUN npm install --only=production

EXPOSE 3000

# Start Express server
CMD ["node", "server/index.js"]
