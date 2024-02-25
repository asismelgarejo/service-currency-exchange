# Stage 1: Build stage
FROM node:18-alpine as builder

RUN apk --no-cache add git python3 make g++
WORKDIR /app
RUN npm install -g typescript
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine as production
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.*.env .
COPY --from=builder /app/package.json ./package.json
ENV NODE_ENV=production

CMD ["npm", "start"]
