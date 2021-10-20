import { Socket } from "socket.io";
import { GameControls } from "~server/game/GameControls";
import { MultiController } from "~server/game/MultiController";

import { EVENTS } from "~configs/events";

import { onStartGame } from "./general";

export function onLeaveMulti(this: Socket): void {
  const { id } = this;
  MultiController.getInstance().deletePlayer(id);
}

export function onJoinMulti(this: Socket): void {
  const { id } = this;
  MultiController.getInstance().registerPlayer(id);
}

export function onStartGameMulti(this: Socket): void {
  const { id } = this;
  onStartGame.call(this);

  const { guests } = MultiController.getInstance().getPlayer(id).attributes;

  guests.forEach((guestID) => {
    const { socket } = GameControls.getInstance(guestID).attributes;
    onStartGame.call(socket);
  });
}

export function onLinkRequest(this: Socket): void {
  const { id } = this;

  const player = MultiController.getInstance().getPlayer(id);
  const inviteLink = player.generateLink();

  this.emit(EVENTS.LINK_RES, inviteLink);
}

export function onCreateLobby(this: Socket): void {
  const { id } = this;
  MultiController.getInstance().createLobby(id);
}

export function onAbortLobby(this: Socket): void {
  const { id } = this;
  MultiController.getInstance().deleteLobby(id);

  const host = MultiController.getInstance().getPlayer(id);
  const { guests } = host.attributes;

  guests.forEach((guestID) => {
    host.removeGuest(guestID);
  });
}

export function onLeaveLobby(this: Socket): void {
  const { id } = this;
  MultiController.getInstance().getPlayer(id).leaveLobby();
}

export function onReadyAction(this: Socket, ready: boolean): void {
  const { id } = this;
  const multiController = MultiController.getInstance();

  multiController.setReady(id, ready);
}

export function onJoinLobby(this: Socket, hostID: Socket["id"]): void {
  // TODO check if lobby exists
  // TODO create function that checks the link (hostID param), then either add user to lobby or return

  const { lobbyActive } = MultiController.getInstance().getPlayer(hostID).attributes;
  if (!lobbyActive) return;

  const { id } = this;

  const multiController = MultiController.getInstance();

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
