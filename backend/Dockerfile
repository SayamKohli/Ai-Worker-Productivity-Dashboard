FROM node:18

WORKDIR /app

# install build tools (IMPORTANT)
RUN apt-get update && apt-get install -y python3 make g++

COPY package*.json ./

# force build from source (CRITICAL FIX)
RUN npm install sqlite3 --build-from-source

COPY . .

CMD ["node", "server.js"]