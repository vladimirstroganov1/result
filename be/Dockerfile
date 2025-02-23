# Dockerfile for fe-first and fe-second
FROM node:22.14

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

RUN pnpm prisma generate

RUN pnpm prisma migrate dev

RUN pnpm prisma db seed

# Expose the port the app runs on
EXPOSE 4001

# Start the application
CMD ["pnpm", "run", "be-docker"]