import { Server, Socket } from "socket.io";

import { logger } from "./utils/logger";
import { EVENTS, onDisconnect, onFrame, onJump } from "./handlers";
import { GameControls } from "./game/GameControls";

export const initGame = (socketio: Server): void => {
  // user has connected
  socketio.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`Player "${socket.id}" has connected`);

    const game = GameControls.initialize(socket);

    const { bird } = game.attributes;

    // inform client and other clients about newly connected bird
    socket.emit(EVENTS.BIRD, bird.attributes);
    socket.broadcast.emit(EVENTS.OTHER_BIRD, bird.attributes);

    socket.on(EVENTS.FRAME, onFrame(socket.id));

    socket.on(EVENTS.DISCONNECT, onDisconnect(socket.id));

    socket.on(EVENTS.JUMP, onJump(socket.id));
  });
};
