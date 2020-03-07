# Full Stack Course Project
Application using the MERN stack. This repo contains both the front and back-end for the project and connects to a MongoDB server. 
Front-end is a client written in Typescript and React. 
Back-end is an express node server that maintains an HTTP (Rest API) and Socket.IO endpoint.  

In order to run the server create the file `secrets.js` in `server/config`. It should look like this:<br />
```
export default {
  mongoPassword: 'YOUR_MONGO_PASSWORD'
};
```
We use a [news api](https://newsapi.org/) to shows users popular articles and the [google maps api](https://developers.google.com/maps/documentation) to show maps.<br />
To use these apis create the file `secrets.ts` in `src/config`. It should look like this:<br />
```
export default {
  newsApiKey: 'YOUR_NEWS_API_KEY',
  googleApiKey: 'YOUR_GOOGLE_API_KEY',
};
```
***REMINDER: Do not push your mongo password or other sensitive data to the repo.***

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs both the client and server concurrently<br />
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.<br />
The server listens on port 8080.<br />
The socket listens on port 80.

The page will reload if you make edits in the client.<br />
You will also see any lint errors in the console.<br />
`npm start:dev` - Server will also reload on edits.

### `npm run client`

Run only the client.<br />

### `npm run server`

Run only the server.<br />
`npm run server:dev` - Server reloads on edits.<br />
`npm run server:debug` - Server listens for a debugging client. Open [chrome://inspect](chrome://inspect) to view the debug in the server.<br />
`npm run server:debug-brk` - Server listens for a debugging client but doesn't run user code starts until inspect. Open [chrome://inspect](chrome://inspect) to debug the server.<br />

This project was bootstrapped using [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) so it also includes the react-scripts.
