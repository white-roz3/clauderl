FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Install dependencies based on the lockfile
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source
COPY . ./

# Build the Next.js app
RUN npm run build

# Expose default Next.js port
EXPOSE 3000

# Start in production
ENV NODE_ENV=production
CMD ["npm", "start"]
