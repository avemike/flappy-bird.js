const express = require('express');

const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io')(http);
const { initGame } = require('./initGame');

app.use(express.static('dist'));

initGame(socketio);

const PORT = 3000;
http.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on *:${PORT}`);
});
