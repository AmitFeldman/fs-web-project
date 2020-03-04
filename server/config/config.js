import secrets from './secrets';

const express = {
  serverPort: 8080,
  socketPort: 80,
};

// TODO: Add Mongo Password
const mongo = {
  user: 'alon',
  host: 'alon.documents.azure.com',
  port: '10255',
  database: 'fs-project',
  password: secrets.mongoPassword,
};

const {user, password, host, port, database} = mongo;
mongo.mongoURI = `mongodb://${user}:${password}@${host}:${port}/${database}?ssl=true`;

export {express, mongo};
