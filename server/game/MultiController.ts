import { Socket } from "socket.io";
import { logger } from "~server/utils/logger";

import { EVENTS } from "~configs/events";

import { onBirdColorChange } from "../handlers/general";
import * as M from "../handlers/mutli";
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

    socket.removeListener(EVENTS.LOBBY_CREATE, M.onCreateLobby);
    socket.removeListener(EVENTS.LOBBY_JOIN, M.onJoinLobby);
    socket.removeListener(EVENTS.LOBBY_ABORT, M.onAbortLobby);
    socket.removeListener(EVENTS.LOBBY_LEAVE, M.onLeaveLobby);

    socket.removeListener(EVENTS.MULTI_START_GAME, M.onStartGameMulti);
    socket.removeListener(EVENTS.MULTI_LEAVE, M.onLeaveMulti);

    socket.removeListener(EVENTS.LINK_REQ, M.onLinkRequest);

    logger.info(`removed: ${id}\n listerers reamining: ${socket.eventNames()}`);

    delete this.players[id];
  }

  public registerPlayer(id: Socket["id"]): void {
    this.players[id] = new MultiProfile(id);

    const { socket } = GameControls.getInstance(id).attributes;
    socket.on(EVENTS.READY_ACTION, M.onReadyAction);

    socket.on(EVENTS.LOBBY_CREATE, M.onCreateLobby);
    socket.on(EVENTS.LOBBY_JOIN, M.onJoinLobby);
    socket.on(EVENTS.LOBBY_ABORT, M.onAbortLobby);
    socket.on(EVENTS.LOBBY_LEAVE, M.onLeaveLobby);

    socket.on(EVENTS.MULTI_START_GAME, M.onStartGameMulti);
    socket.on(EVENTS.MULTI_LEAVE, M.onLeaveMulti);

    socket.on(EVENTS.LINK_REQ, M.onLinkRequest);
  }

  public countActivePlayers(hostID: Socket["id"]): number {
    const host = this.getPlayer(hostID);
    const reducer = (acc: number, curr: Socket["id"]) =>
      acc + Number(this.getPlayer(curr).attributes.ready);
    const readyGuestsCount = host.attributes.guests.reduce(reducer, 0);
    const readyPlayersCount = readyGuestsCount + (host.attributes.ready ? 1 : 0);

    return readyPlayersCount;
  }

  public setReady(readyID: Socket["id"], value: boolean): void {
    this.getPlayer(readyID).setReady(value);

    const hostID = this.getPlayer(readyID).attributes.hostID || readyID;

    const readyPlayersCount = this.countActivePlayers(hostID);

    const { socket: hostSocket } = GameControls.getInstance(hostID).attributes;
    hostSocket.emit(EVENTS.READY_COUNT, readyPlayersCount);
  }

  public createLobby(hostID: Socket["id"]): void {
    this.getPlayer(hostID).createLobby();
  }
}
