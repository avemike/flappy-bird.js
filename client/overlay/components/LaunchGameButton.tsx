import React from "react";

import { ButtonSuper } from "../../styled";

interface Props {
  onClick(): void;
  readyCount: number;
  maxPlayers: number;
}

const LaunchGameButton = ({ onClick, readyCount, maxPlayers }: Props): JSX.Element => (
  <ButtonSuper onClick={onClick} ready={readyCount === maxPlayers}>
    {readyCount === maxPlayers ? "start" : `${readyCount}/${maxPlayers} ready`}
  </ButtonSuper>
);

export { LaunchGameButton };
