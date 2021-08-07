import React from "react";

import { LOBBY_MODE } from "../../../../configs/game";
import { socket } from "../../../utils/socketSetup";
import Host from "./Host";
import Normal from "./Normal";

interface Props {
  type: LOBBY_MODE;
}

function Lobby({ type }: Props): JSX.Element {
  function handleReadyClick() {
    socket.emit("ready");
  }

  function render(type: LOBBY_MODE): JSX.Element {
    switch (type) {
      case LOBBY_MODE.HOST:
        return <Host />;
      default:
        return <Normal readyClick={handleReadyClick} />;
    }
  }

  return <>{render(type)}</>;
}

export default Lobby;
