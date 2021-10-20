import React from "react";

import { LOBBY_MODE } from "../../configs/game";
import { Host } from "../view/lobby/Host";
import { Normal } from "../view/lobby/Normal";

interface Props {
  type: LOBBY_MODE;
}

function Lobby({ type }: Props): JSX.Element {
  return type === LOBBY_MODE.HOST ? <Host /> : <Normal />;
}

export { Lobby };
