import { Socket } from "socket.io";

import { logger } from "./utils/logger";
import { EVENTS, onDisconnect, onFrame, onJump } from "./handlers";
import { io as socketio } from "./index";
import { InstanceContainer } from "./InstanceContainer";

export const initGame = (): void => {
  // user has connected
  socketio.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`Player "${socket.id}" has connected`);

    const instanceContainer = InstanceContainer.initialize(socket);

    const { bird } = instanceContainer.attributes;

    // inform client and other clients about newly connected bird
    socket.emit(EVENTS.BIRD, bird.attributes);
    socket.broadcast.emit(EVENTS.OTHER_BIRD, bird.attributes);

    socket.on(EVENTS.FRAME, onFrame(socket.id));

    socket.on(EVENTS.DISCONNECT, onDisconnect(socket.id));

    socket.on(EVENTS.JUMP, onJump(socket.id));
  });
};
