import {connect} from 'socket.io-client';

const SOCKET_URI = 'http://localhost';
const socket = connect(SOCKET_URI);

export type SocketEvent = 'NEW_POST';
export type EventCallback<D> = (data: D) => void;

// Adds a listener for socket event
const onSocketEvent = <D>(event: SocketEvent, callback: EventCallback<D>) => {
  socket.addEventListener(event, callback);

  return () => socket.removeEventListener(event, callback);
};

// Emit event to server
const emitEvent = <D>(event: string, ...args: D[]) => {
  socket.emit(event, ...args);
};

export {onSocketEvent, emitEvent};
