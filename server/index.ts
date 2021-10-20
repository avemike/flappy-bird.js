import express from "express";
import http from "http";
import socketio from "socket.io";

import { initGame } from "./initGame";
import { logger } from "./utils/logger";

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new socketio(server, {});

http.createServer(app);

app.use(express.static("dist"));

app.get("/join", (req, res, next) => {
  const { hostID, key } = req.query || {};
  logger.info(`${hostID}`);
  next();
  // TODO check if key is valid, if yes route to "/" and pass the hostID
});

app.use("/join", express.static("dist"));

initGame(io);

server.listen(PORT, () => {
  logger.info(`listening on *:${PORT}`);
});
