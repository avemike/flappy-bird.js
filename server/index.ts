import http from "http";

import express from "express";
import socketio from "socket.io";

import { initGame } from "./initGame";
import { logger } from "./utils/logger";

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new socketio(server, {});

http.createServer(app);

app.use(express.static("dist"));

initGame(io);

server.listen(PORT, () => {
  logger.info(`listening on *:${PORT}`);
});
