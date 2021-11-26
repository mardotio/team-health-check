# Team Health Check

## Backend config

Before starting the server you will need to configure the environment by
creating `./backend/team-health-check/.env`. In here, you can declare additional
environment variables that are not already declared in
[`docker-compose.yml`](./docker-compose.yml). Currently, your `.env` file needs
to include the following:

```dotenv
JWT_SECRET="whatever secret you want"
QUESTIONS_URL="URL to JSON file containing survey questions"
```

For `QUESTIONS_URL` you can set it to the GitHub raw content URL for
[`questions.json`](./questions.json).

## Getting started

You can build the app by running `docker-compose build` (you should only need to
do this if you updated the package.json dependencies or if this is the first
time starting the app).

To run the entire application you can run `docker-compose up`.

If you want to run and build the app at the same time you can do it all at once
with `docker-compose up --build`.

## API server

The API should be accessible at `http://localhost:3000/api`.

## Developing

Before starting, you will need to run `npm i` for the backend and frontend
packages. While not technically needed for local development (all the
dependencies are installed in the containers for the frontend and backend), this
will get rid of any IDE warnings/errors.

Both, the backend and frontend support hot reloading. Editing files in
`./backend/team-health-check/src` will restart the backend and apply your
changes, and changes in `./frontend/team-health-check/src` will hot reload your
browser.
