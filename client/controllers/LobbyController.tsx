import React from "react";

import { LOBBY_MODE } from "~configs/game";

import { Normal } from "~client/view/lobby/Normal";

import { Host } from "../view/lobby/Host";

interface Props {
  type: LOBBY_MODE;
}

function Lobby({ type }: Props): JSX.Element {
  return type === LOBBY_MODE.HOST ? <Host /> : <Normal />;
}

export { Lobby };
