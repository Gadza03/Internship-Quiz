FROM node:20
 WORKDIR /app
 
 COPY ./package.json ./package.json
 COPY ./package-lock.json ./package-lock.json
 COPY ./backend/package.json ./backend/package.json
 COPY ./backend/package-lock.json ./backend/package-lock.json
 COPY ./frontend/package.json ./frontend/package.json
 COPY ./frontend/package-lock.json ./frontend/package-lock.json
 COPY ./backend/prisma ./backend/prisma
 
 RUN npm install
 
 COPY . .
 
 RUN npm run build
 
 CMD node backend/dist/src/main.js