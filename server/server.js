import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/config';
import users from './routes/api/users';

const PORT = config.express.serverPort;
const MONGO_URI = config.mongo.mongoURI;

const app = express();

// Routes
app.use("/api/users", users);

// Use body-parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('successfully connected to MongoDB...'))
  .catch(err => console.log(err));

// Start server
// eslint-disable-next-line no-unused-vars
const server = app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
});
