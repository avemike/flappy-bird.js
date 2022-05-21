import React from "react";

import { ButtonSuper } from "../../styled";

interface Props {
  onClick();
  readyCount: number;
  maxPlayers: number;
}

const LaunchGameButton = ({ onClick, readyCount, maxPlayers }: Props) => (
  <ButtonSuper ready={readyCount === maxPlayers} onClick={onClick}>
    {readyCount === maxPlayers ? "start" : `${readyCount}/${maxPlayers} ready`}
  </ButtonSuper>
);

export { LaunchGameButton };
