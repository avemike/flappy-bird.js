import * as core from "express-serve-static-core";
import { Server, Socket } from "socket.io";

import { EVENTS } from "~configs/events";

import { getDestination, onDisconnect, onDomLoaded, onFrame, onJump } from "./handlers/general";
import { onJoinMulti } from "./handlers/mutli";
import { logger } from "./utils/logger";

export const initGame = (socketio: Server, app: core.Express) => {
  // user has connected
  socketio.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`Player "${socket.id}" has connected`);

    socket.on(EVENTS.DOM_LOADED, onDomLoaded);
    socket.on(EVENTS.DOM_LOADED, () => {
      if (app.get("want_to_join")?.destination) {
        getDestination(app).call(socket);
      }
    });

    socket.on(EVENTS.MULTI_JOIN, onJoinMulti);

    socket.on(EVENTS.FRAME, onFrame);

    socket.on(EVENTS.DISCONNECT, onDisconnect);

    socket.on(EVENTS.JUMP, onJump);
  });
};
