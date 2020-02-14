const express = {
  serverPort: 8080,
  socketPort: 80,
};

// TODO: Add
const mongo = {
  user: 'alon',
  host: 'alon.documents.azure.com',
  port: '10255',
  database: 'fs-project',
  password: '',
};

const {user, password, host, port, database} = mongo;
mongo.mongoURI = `mongodb://${user}:${password}@${host}:${port}/${database}?ssl=true`;

export {express, mongo};
