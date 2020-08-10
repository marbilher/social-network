import io from 'socket.io-client';
const port = process.env.PORT || 'http://localhost:8080';

export const socket = io(port);