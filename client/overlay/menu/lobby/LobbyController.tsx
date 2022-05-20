import React from "react";
import { Normal } from "~client/overlay/menu/lobby/Normal";

import { LOBBY_MODE } from "~configs/game";

import { Host } from "./Host";

interface Props {
  type: LOBBY_MODE;
}

function Lobby({ type }: Props): JSX.Element {
  return type === LOBBY_MODE.HOST ? <Host /> : <Normal />;
}

export { Lobby };
