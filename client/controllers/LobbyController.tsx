import React from "react";

import { LOBBY_MODE } from "../../configs/game";
import { Host } from "../view/lobby";
import Normal from "../view/lobby/Normal";

interface Props {
  type: LOBBY_MODE;
}

function Lobby({ type }: Props): JSX.Element {
  function render(type: LOBBY_MODE): JSX.Element {
    switch (type) {
      case LOBBY_MODE.HOST:
        return <Host />;
      default:
        return <Normal />;
    }
  }

  return <>{render(type)}</>;
}

export default Lobby;
