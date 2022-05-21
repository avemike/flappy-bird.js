import { Socket } from "socket.io";
import { GameControls } from "~server/game/GameControls";
import { MultiController } from "~server/game/MultiController";
import { logger } from "~server/utils/logger";

import { EVENTS } from "~configs/events";

import { onStartGame } from "./general";

export function onLeaveMulti(this: Socket) {
  const { id } = this;

  MultiController.getInstance().deletePlayer(id);
}

export function onJoinMulti(this: Socket) {
  const { id } = this;

  MultiController.getInstance().registerPlayer(id);
}

export function onStartGameMulti(this: Socket) {
  const { id } = this;

  onStartGame.call(this);

  const { guests } = MultiController.getInstance().getPlayer(id).attributes;

  guests.forEach((guestID) => {
    const { socket } = GameControls.getInstance(guestID).attributes;

    onStartGame.call(socket);
  });
}

export function onLinkRequest(this: Socket) {
  const { id } = this;

  const player = MultiController.getInstance().getPlayer(id);
  const inviteLink = player.generateLink();

  this.emit(EVENTS.LINK_RES, inviteLink);
}

export function onCreateLobby(this: Socket) {
  const { id } = this;

  MultiController.getInstance().createLobby(id);
}

export function onAbortLobby(this: Socket) {
  const { id } = this;

  const host = MultiController.getInstance().getPlayer(id);
  const { guests } = host.attributes;

  guests.forEach((guestID: Socket["id"]) => {
    MultiController.getInstance().getPlayer(guestID).leaveLobby();
    host.removeGuest(guestID);

    const { socket } = GameControls.getInstance(guestID).attributes;

    socket.emit(EVENTS.LOBBY_KICK_OUT);
  });

  logger.info(`${JSON.stringify(host.attributes)}`);
  host.deleteLobby();
}

export function onLeaveLobby(this: Socket) {
  const { id } = this;
  const player = MultiController.getInstance().getPlayer(id);
  const { hostID } = player.attributes;
  const host = MultiController.getInstance().getPlayer(hostID);

  player.leaveLobby();

  const readyPlayersCount = MultiController.getInstance().countActivePlayers(hostID);

  this.to(hostID).emit(EVENTS.READY_COUNT, readyPlayersCount);
  host.removeGuest(id);
}

export function onReadyAction(this: Socket, ready: boolean) {
  const { id } = this;
  const multiController = MultiController.getInstance();

  multiController.setReady(id, ready);
}

export function onJoinLobby(this: Socket, hostID: Socket["id"]) {
  // TODO check if lobby exists
  // TODO create function that checks the link (hostID param), then either add user to lobby or return

  const multiController = MultiController.getInstance();
  const { lobbyActive } = multiController.getPlayer(hostID).attributes;

  if (!lobbyActive) return;

  const { id } = this;

  multiController.getPlayer(id).joinLobby(hostID);
  multiController.getPlayer(hostID).addGuest(id);

  const { pipes: hostPipes } = GameControls.getInstance(hostID).attributes;

  multiController.getPlayer(hostID).attributes.guests.forEach((guestID) => {
    const { pipes } = GameControls.getInstance(guestID).attributes;

    pipes.syncWith(hostPipes);
  });

  const { bird } = GameControls.getInstance(id).attributes;
  const { socket: hostSocket } = GameControls.getInstance(hostID).attributes;

  this.to(hostSocket.id).emit(EVENTS.BIRD_JOINED, id);

  this.to(hostSocket.id).emit(EVENTS.OTHER_BIRD, bird.attributes);
}
