const socket = require('socket.io-client')(process.env.NODE_ENV === 'production' ?
  `${window.location.hostname}:${window.location.port}` : `${window.location.hostname}:3001`);

export default socket;

