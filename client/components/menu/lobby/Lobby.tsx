import React from "react";

import { LobbyMode } from "../../../../configs/game";
import { socket } from "../../../utils/socketSetup";
import Host from "./Host";
import Normal from "./Normal";

interface Props {
  type: LobbyMode;
}

function Lobby({ type }: Props): JSX.Element {
  function handleReadyClick() {
    socket.emit("ready");
  }

  function render(type: LobbyMode): JSX.Element {
    switch (type) {
      case LobbyMode.HOST:
        // return <Host readyClick={handleReadyClick} />;
        return <Host />;
      default:
        return <Normal readyClick={handleReadyClick} />;
      // return <Normal />;
    }
  }

  return <>{render(type)}</>;
}

export default Lobby;
