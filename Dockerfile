FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies
RUN npm ci

# Copy source code
COPY . .

# Build for Node.js server (not Vercel)
ENV NITRO_PRESET=node-server
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=8080
ENV NODE_ENV=production

COPY --from=builder /app/.output /app/.output

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]