# Base image: Node.js 22 with TypeScript
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Install system dependencies for Playwright
RUN apt-get update && apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    libatspi2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install Atlas (atlasgo.io) - Database schema migration tool
RUN curl -sSf https://atlasgo.sh | sh

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /workspaces/hono-takibi

# Default command
CMD ["sleep", "infinity"]
