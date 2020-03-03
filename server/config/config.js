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
  password: '4GCiae7Q0sKtC14CAssmliC4IOxiIp0RX4PfQvXh7ZD6sWArMUOZTcawUpAA9jRshn3ys8DrfihaFXqPSLkfEQ==',
};

const {user, password, host, port, database} = mongo;
mongo.mongoURI = `mongodb://${user}:${password}@${host}:${port}/${database}?ssl=true`;

export {express, mongo};
