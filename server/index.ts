import express from "express";
import socketio from "socket.io";
import http from "http";
import { initGame } from "./initGame";

const PORT = 3000;

const app = express();

const server = new http.Server(app);

const io = socketio(server);

http.createServer(app);

app.use(express.static("dist"));

initGame(io);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on *:${PORT}`);
});
