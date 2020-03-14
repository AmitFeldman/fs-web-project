import secrets from './secrets';

const express = {
  serverPort: 8080,
  socketPort: 80,
};

const mongo = {
  user: 'admin',
  host: 'cluster0-wrwyj.mongodb.net',
  database: 'fs-project',
  password: secrets.mongoPassword,
};

const {user, password, host, database} = mongo;
mongo.mongoURI = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`;

export {express, mongo};
