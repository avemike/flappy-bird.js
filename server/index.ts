import express from "express";
import http from "http";
import socketio from "socket.io";

import { joinGame } from "./api";
import { initGame } from "./initGame";
import { logger } from "./utils/logger";

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new socketio(server, {});

http.createServer(app);

app.use(express.static("dist"));

app.get("/join", joinGame);

app.use("/join", express.static("dist"));

initGame(io, app);

server.listen(PORT, () => {
  logger.info(`listening on *:${PORT}`);
});
