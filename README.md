# Travel Note
Personal Travel Note to store & browse places you have traveled.

## Technologies & Tools

- React
- Reach Router
- Tailwind CSS
- React-map-gl (for Mapbox API)
- Netlify
- Express.js
- MongoDB
- JSON web tokens (JWT)
- Jest (for testing)
- Heroku

## Features

- User authentication with JSON web tokens (JWT)
- Access token and Refresh token implementation
- Mongoose `User` & `LogEntry` data models
- List all log entries on the map
- Interactive custom markers on the map
- CRUD operations on DB
- Sorting log entry cards
- Marker with reactive form and log entry details
- Custom API routes

## Getting Started

1. Install dependencies both for client and server

```bash
yarn
```

2. [Register a Mapbox account](https://www.mapbox.com/)

3. Create an `.env` file in the root of the project based on `.env.sample`

4. Fire up the server for React app

```bash
cd client
yarn start
```

4. Build CSS styles

```bash
cd client
yarn build:css
```

5. Start a development server

```bash
cd server
yarn dev
```
