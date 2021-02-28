import { Server } from "socket.io";

import { PipesControls } from "./components/PipesControls";
import { BirdControls } from "./components/BirdControls";
import { FrameHandler } from "./utils/FrameHandler";
import { checkCollisions } from "./utils/checkCollisions";

const frameControl = new FrameHandler();

export const initGame = (socketio: Server): void => {
  const pipesControl = new PipesControls();

  frameControl.addCallback(pipesControl.run.bind(pipesControl));

  // user has connected
  socketio.on("connection", (socket) => {
    const bird = new BirdControls(socket.id);

    frameControl.addCallback(bird.gravity.bind(bird));
    frameControl.addCallback(() =>
      checkCollisions(bird.data, pipesControl.data)
    );

    socket.emit("bird", bird.data);
    socket.broadcast.emit("otherBird", bird.data);

    // every frame sends needed data to client
    socket.on("frame", () => {
      socket.emit("pipes", pipesControl.data);
      socket.emit("bird", bird.data);
      socket.broadcast.emit("otherBird", bird.data);
    });

    // player disconnection event
    socket.on("disconnect", () => {
      socket.broadcast.emit("otherBirdDc", bird.data.id);
    });

    // bird's jump event
    socket.on("jump", () => {
      bird.jump();
      socket.emit("bird", bird.data);
      socket.broadcast.emit("otherBird", bird.data);
    });
  });
};
