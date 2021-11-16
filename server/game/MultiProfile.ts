import { Socket } from "socket.io";
import { generateKey } from "~server/scripts/authenticate";

import { EVENTS } from "~configs/events";
import { Link } from "~configs/types";

import { GameControls } from "./GameControls";

interface Attributes {
  id: Socket["id"];
  hostID: Socket["id"];
  guests: Socket["id"][];
  ready: boolean;
  lobbyActive: boolean;
}

interface Hidden {
  link: Link;
  key: string;
}

const initialState: Attributes = {
  id: "",
  hostID: "",
  guests: [],
  ready: false,
  lobbyActive: false,
};

export class MultiProfile {
  private id: Attributes["id"];
  private hostID: Attributes["hostID"] = initialState.hostID;
  private guests: Attributes["guests"] = initialState.guests;
  private ready: Attributes["ready"] = initialState.ready;
  private lobbyActive: Attributes["lobbyActive"] = initialState.lobbyActive;

  private link: Hidden["link"] = "";
  private key: Hidden["key"] = "";

  constructor(id: Socket["id"]) {
    this.id = id;
  }

  public generateLink(): Hidden["link"] {
    this.key = generateKey();
    this.link = `http://localhost:3000/join?hostID=${this.id}&key=${this.key}`;

    return this.link;
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
    this.guests = this.guests.filter((guestID) => guestID != id);
  }

  public createLobby(): void {
    this.lobbyActive = true;
  }

  public deleteLobby(): void {
    this.lobbyActive = false;
  }

  public leaveLobby(): void {
    const { socket } = GameControls.getInstance(this.id).attributes;
    socket.leave(this.hostID);
    socket.broadcast.emit(EVENTS.OTHER_BIRD_DC, this.id);

    this.ready = initialState.ready;
    this.hostID = initialState.hostID;
  }

  get attributes(): Attributes {
    return {
      id: this.id,
      hostID: this.hostID,
      guests: this.guests,
      ready: this.ready,
      lobbyActive: this.lobbyActive,
    };
  }
}
