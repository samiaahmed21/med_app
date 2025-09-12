# ---------- Stage 1: Build React frontend ----------
FROM node:18 AS frontend-build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Stage 2: Setup Node backend ----------
FROM node:18

WORKDIR /app

# Copy backend files
COPY server ./server
COPY config.js ./
COPY Setauthtoken.js ./

# Copy React build folder
COPY --from=frontend-build /app/build ./build

# Install only backend dependencies
COPY package*.json ./
RUN npm install --only=production

EXPOSE 3000

CMD ["node", "server/index.js"]
