import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {express as expressConfig, mongo} from './config/config';
import socketIO from 'socket.io';
import http from 'http';
import cors from 'cors';
import {initSocketIO} from './utils/socket-service';
import users from './routes/api/users';
import posts from './routes/api/posts';
import comments from './routes/api/comments';
import locations from './routes/api/locations';
import {parseToken} from './middlewares/auth';
import {initChangesListener} from './utils/changes-listener';

const app = express();

// Enabling CORS
app.use(cors());

// Body-parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Token parsing middleware
app.use(parseToken);

// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use('/api/locations', locations);

// Connect to MongoDB
console.log(`connecting to MongoDB through uri ${mongo.mongoURI}...`);
mongoose
  .connect(mongo.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('successfully connected to MongoDB...'))
  .catch(err => console.log(err));

// Express config variables
const {serverPort, socketPort} = expressConfig;

// Express server listening
// eslint-disable-next-line no-unused-vars
const server = app.listen(serverPort, () => {
  console.log(`server listening on port ${serverPort}...`);
});

const socketServer = http.Server(app);
const io = socketIO(socketServer);

// Socket server listening
socketServer.listen(socketPort);
console.log(`socket listening on port ${socketPort}...`);

initSocketIO(io);

// Init mongo watchers
initChangesListener();
