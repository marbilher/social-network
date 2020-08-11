import io from 'socket.io-client';
const port = process.env.PORT || 8080;

export const socket = io(port);