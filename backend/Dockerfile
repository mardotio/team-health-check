FROM node:15
WORKDIR /app
COPY team-health-check/package.json .
COPY team-health-check/package-lock.json .
RUN npm install
COPY team-health-check/src src
COPY team-health-check/webpack.config.ts .
COPY team-health-check/tsconfig.json .
CMD ["npm", "run", "start"]
