FROM mhart/alpine-node:10

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

CMD ["node", "index.js"]
