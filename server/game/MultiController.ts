import { Socket } from "socket.io";

import { EVENTS } from "../../configs/events";
import { onAbortLobby, onJoinLobby, onLeaveLobby, onLeaveMulti, onReadyAction, onStartGameMulti } from "../handlers";
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

    socket.removeListener(EVENTS.READY_ACTION, onReadyAction);

    socket.removeListener(EVENTS.LOBBY_JOIN, onJoinLobby);
    socket.removeListener(EVENTS.LOBBY_ABORT, onAbortLobby);
    socket.removeListener(EVENTS.LBOBY_LEAVE, onLeaveLobby);

    socket.removeListener(EVENTS.MULTI_START_GAME, onStartGameMulti);
    socket.removeListener(EVENTS.MULTI_LEAVE, onLeaveMulti);

    logger.info(`removed: ${id}\n listerers reamining: ${socket.eventNames()}`);

    delete this.players[id];
  }

  public registerPlayer(id: Socket["id"]): void {
    this.players[id] = new MultiProfile(id);

    const { socket } = GameControls.getInstance(id).attributes;
    socket.on(EVENTS.READY_ACTION, onReadyAction);

    socket.on(EVENTS.LOBBY_JOIN, onJoinLobby);
    socket.on(EVENTS.LOBBY_ABORT, onAbortLobby);
    socket.on(EVENTS.LBOBY_LEAVE, onLeaveLobby);

    socket.on(EVENTS.MULTI_START_GAME, onStartGameMulti);
    socket.on(EVENTS.MULTI_LEAVE, onLeaveMulti);
  }

  public setReady(readyID: Socket["id"], ready: boolean): void {
    this.getPlayer(readyID).setReady(ready);

    const reducer = (acc: number, curr: Socket["id"]) => acc + Number(this.getPlayer(curr).attributes.ready);

    const hostID = this.getPlayer(readyID).attributes.hostID || readyID;

    const readyGuestsCount = this.getPlayer(hostID).attributes.guests.reduce(reducer, 0);
    const readyPlayersCount = readyGuestsCount + (this.getPlayer(hostID).attributes.ready ? 1 : 0);

    const { socket } = GameControls.getInstance(hostID).attributes;
    socket.emit(EVENTS.READY_COUNT, readyPlayersCount);
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
