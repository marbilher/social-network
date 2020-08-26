import io from 'socket.io-client';
const port = process.env.PORT || 'https://gt3-social.herokuapp.com/';

export const socket = io(port);
