# Travel Note | Client

Front-end for Travel Note App.

## Technologies & Tools

- React
- Reach Router
- Tailwind CSS
- React-map-gl (for Mapbox API)

## Setup

1. [Register a Mapbox account](https://www.mapbox.com/)

2. Install dependencies

```bash
yarn
```

3. Create an `.env` file in the root of the project based on `.env.sample`

```md
DISABLE_ESLINT_PLUGIN=true
REACT_APP_MAPBOX_ACCESS_TOKEN=XXXXX
REACT_APP_SERVER_URL='url for your custom server'
```

4. Build css styles using `postcss` and watch styles change

```bash
yarn watch:css
```

5. Fire up the server for React app

```bash
yarn start
```

6. Deploy to Netlify

```bash
yarn build:css
yarn build
```
