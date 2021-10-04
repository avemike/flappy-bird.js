import { Socket } from "socket.io";

import { EVENTS } from "../../configs/events";
import { onBirdColorChange } from "../handlers/general";
import * as M from "../handlers/mutli";
import { logger } from "../utils/logger";
import { GameControls } from "./GameControls";
import { MultiProfile } from "./MultiProfile";

export class MultiController {
  private static instance: MultiController;
  private players: { [key: string]: MultiProfile } = {};

  private constructor() {
    // do nothing
  }

  public static getInstance(): MultiController {
    if (!MultiController.instance) {
      MultiController.instance = new MultiController();
    }

    return MultiController.instance;
  }

  public startGame(hostID: Socket["id"]): void {
    this.getPlayer(hostID).attributes.guests.forEach((guestID) => {
      const { socket } = GameControls.getInstance(guestID).attributes;
      socket.emit(EVENTS.GAME_START);
    });
  }

  public getPlayer(id: Socket["id"]): MultiProfile {
    return this.players[id];
  }

  public deletePlayer(id: Socket["id"]): void {
    const { socket } = GameControls.getInstance(id).attributes;

    socket.removeListener(EVENTS.BIRD_COLOR_CHANGE, onBirdColorChange);
    socket.removeListener(EVENTS.READY_ACTION, M.onReadyAction);

    socket.removeListener(EVENTS.LOBBY_JOIN, M.onJoinLobby);
    socket.removeListener(EVENTS.LOBBY_ABORT, M.onAbortLobby);
    socket.removeListener(EVENTS.LBOBY_LEAVE, M.onLeaveLobby);

    socket.removeListener(EVENTS.MULTI_START_GAME, M.onStartGameMulti);
    socket.removeListener(EVENTS.MULTI_LEAVE, M.onLeaveMulti);

    logger.info(`removed: ${id}\n listerers reamining: ${socket.eventNames()}`);

    delete this.players[id];
  }

  public registerPlayer(id: Socket["id"]): void {
    this.players[id] = new MultiProfile(id);

    const { socket } = GameControls.getInstance(id).attributes;
    socket.on(EVENTS.READY_ACTION, M.onReadyAction);

    socket.on(EVENTS.LOBBY_JOIN, M.onJoinLobby);
    socket.on(EVENTS.LOBBY_ABORT, M.onAbortLobby);
    socket.on(EVENTS.LBOBY_LEAVE, M.onLeaveLobby);

    socket.on(EVENTS.MULTI_START_GAME, M.onStartGameMulti);
    socket.on(EVENTS.MULTI_LEAVE, M.onLeaveMulti);
  }

  public setReady(readyID: Socket["id"], value: boolean): void {
    this.getPlayer(readyID).setReady(value);

    const reducer = (acc: number, curr: Socket["id"]) => acc + Number(this.getPlayer(curr).attributes.ready);

    const hostID = this.getPlayer(readyID).attributes.hostID || readyID;

    const readyGuestsCount = this.getPlayer(hostID).attributes.guests.reduce(reducer, 0);
    const readyPlayersCount = readyGuestsCount + (this.getPlayer(hostID).attributes.ready ? 1 : 0);

    const { socket: hostSocket } = GameControls.getInstance(hostID).attributes;
    hostSocket.emit(EVENTS.READY_COUNT, readyPlayersCount);
  }

  public createLobby(hostID: Socket["id"]): void {
    this.registerPlayer(hostID);
  }

  public deleteLobby(hostID: Socket["id"]): void {
    this.getPlayer(hostID).attributes.guests.forEach((guestID: Socket["id"]) => {
      this.getPlayer(guestID).leaveLobby();
    });
  }
}
