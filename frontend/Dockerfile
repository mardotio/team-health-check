FROM node:15
WORKDIR /app
COPY team-health-check/package.json .
COPY team-health-check/package-lock.json .
RUN npm install
COPY team-health-check/src src
COPY team-health-check/public public
COPY team-health-check/tsconfig.json .
COPY team-health-check/.eslintrc.json .
COPY team-health-check/.prettierignore .
COPY team-health-check/.prettierrc.json .
CMD ["npm", "start"]
