import * as express from "express";
import * as socketio from "socket.io";
import * as http from "http";

const PORT = process.env.PORT || 3000;

const app = express();
app.set("port", PORT);

const server = new http.Server(app);

const io = socketio(server);

const { initGame } = require("./initGame");

http.createServer(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
}

initGame(io);

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
