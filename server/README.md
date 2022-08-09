# Travel Note | Server

Back-end for Travel Note App.

## Technologies & Tools

- MongoDB (as a database)
- Express
- JsonWebToken (JWT)
- Jest (for testing)

## Folder Structure

```md
.
├── controllers/
│ ├── auth.js
│ └── logs.js
├── helpers/
├── middlewares/
│ └── verifyUserAuth.js
├── models/
├── routes/
├── services/
├── tests/
├── app.js
├── server.js
└── ...
```

We'll have two base models `User.js` (for user auth and tokens) and `LogEnry.js` (for logs collections), for each of them there're helper functions in the `services` folder. Use `verifyUserAuth.js` middleware for protected routes.

## Setup

1. Install dependencies:

```bash
yarn
```

2. Create an `.env` file in the root of the project based on `.env.sample`

```md
MONGO_DB_CONNECT=XXXXX
JWT_TOKEN_SECRET=XXXXX
JWT_TOKEN_EXPIRES_IN=number of minutes
CORS_ORIGIN=http://localhost:3000 or react app url
PORT=8080
```

3. Use mongoDB as a database

4. Run server on the localhost

```bash
yarn dev
```

6. (Optional) Run tests:

```bash
yarn run test
```

## Deploy to Heroku

1. Heroku setup

```bash
yarn add -global heroku
heroku login
```

2. Set Heroku environment variables (use `.env`)

3. Push subtree to Heroku (from the root of the app)

```bash
cd ..
git subtree push --prefix server heroku master
```
