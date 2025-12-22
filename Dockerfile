# Use official Node image
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy dependency files + prisma schema first (for caching)
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the app
COPY . .

# --- Build-time dummy environment variables ---
ENV DATABASE_URL="file:./dev.db"
ENV REDIS_URL="http://dummy"
ENV REDIS_TOKEN="dummy"

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN pnpm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]