import { Server, Socket } from "socket.io";

import { EVENTS } from "../configs/events";
import { onDisconnect, onDomLoaded, onFrame, onJump } from "./handlers/general";
import { onJoinMulti } from "./handlers/mutli";
import { logger } from "./utils/logger";

export const initGame = (socketio: Server): void => {
  // user has connected
  socketio.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`Player "${socket.id}" has connected`);

    // const game = GameControls.initialize(socket);

    // const { bird } = game.attributes;

    socket.on(EVENTS.DOM_LOADED, onDomLoaded);

    socket.on(EVENTS.MULTI_JOIN, onJoinMulti);

    // socket.emit(EVENTS.BIRD, bird.attributes);

    socket.on(EVENTS.FRAME, onFrame);

    socket.on(EVENTS.DISCONNECT, onDisconnect);

    socket.on(EVENTS.JUMP, onJump);
  });
};
