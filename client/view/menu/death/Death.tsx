import React, { useContext, useState } from "react";

import * as S from "~client/styled";

import { GAME_MODE } from "~configs/game";

import { MenuContext } from "~client/utils/context/MenuContext";

import { Multi } from "./Multi";
import { Single } from "./Single";

const Death = (): JSX.Element => {
  const {
    gameModeHook: [gameMode],
  } = useContext(MenuContext);

  const [lastGameMode] = useState(gameMode);

  return (
    <S.FlexWrapper direction="column" animated>
      {lastGameMode === GAME_MODE.SINGLE ? <Single /> : <Multi />}
    </S.FlexWrapper>
  );
};

export { Death };
