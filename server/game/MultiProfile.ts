import { Socket } from "socket.io";

import { EVENTS } from "../../configs/events";
import { GameControls } from "./GameControls";

interface Attributes {
  id: Socket["id"];
  hostID: Socket["id"];
  guests: Socket["id"][];
  ready: boolean;
}

export class MultiProfile {
  private id: Attributes["id"];
  private hostID: Attributes["hostID"] = "";
  private guests: Attributes["guests"] = [];
  private ready: Attributes["ready"] = false;

  constructor(id: Socket["id"]) {
    this.id = id;
  }

  public setReady(value: boolean): void {
    this.ready = value;
  }

  public joinLobby(hostID: Socket["id"]): void {
    const { socket } = GameControls.getInstance(this.id).attributes;
    socket.join(hostID);
    this.hostID = hostID;
  }

  public addGuest(id: Socket["id"]): void {
    this.guests.push(id);
  }

  public removeGuest(id: Socket["id"]): void {
    this.guests.filter((guestID) => guestID !== id);
  }

  public leaveLobby(): void {
    this.hostID = "";

    const { socket } = GameControls.getInstance(this.id).attributes;

    socket.leave(this.hostID);
    socket.broadcast.emit(EVENTS.OTHER_BIRD_DC, this.id);

    socket.emit(EVENTS.LBOBY_LEAVE);
  }

  get attributes(): Attributes {
    return {
      id: this.id,
      hostID: this.hostID,
      guests: this.guests,
      ready: this.ready,
    };
  }
}
