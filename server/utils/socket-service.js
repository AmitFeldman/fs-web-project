import EventEmitter from 'eventemitter3';

let io;
class IoEventEmitter extends EventEmitter {}

const ioEventEmitter = new IoEventEmitter();
const connectEvent = 'connection';
const disconnectEvent = 'disconnect';

const initSocketIO = newSocketIO => {
  io = newSocketIO;

  io.on(connectEvent, socket => {
    console.log(`Socket connected: ${socket.id}`);

    ioEventEmitter.emit(connectEvent, socket);

    socket.on(disconnectEvent, () => {
      ioEventEmitter.emit(disconnectEvent, socket);
      console.log(`Socket disconnected ${socket.id}`);
    });
  });
};

// The callbacks passed to onSocketConnnect and onSocketDisconnect
// receive the socket as an argument and can use it like this:

// - Emit data to socket
// socket.emit('event', { hello: 'world' });

// - Run logic on event emitted from socket
// socket.on('event', (data) => {
//   console.log(data);
// });

// Adds a listener for a socket connection, receives socket as argument
const onSocketConnect = (callback) => {
  ioEventEmitter.on(connectEvent, callback);

  return () => ioEventEmitter.off(connectEvent, callback);
};

// Adds a listener for a socket disconnection, receives socket as argument
const onSocketDisconnect = (callback) => {
  ioEventEmitter.on(disconnectEvent, callback);

  return () => ioEventEmitter.off(disconnectEvent, callback);
};

// Emit an event to all connected sockets, same API as io.emit
const emitEvent = (event, ...args) => {
  io.emit(event, ...args);
};

export {initSocketIO, emitEvent, onSocketConnect, onSocketDisconnect};
