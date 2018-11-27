FROM mhart/alpine-node

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

ENTRYPOINT ["node", "index.js"]
