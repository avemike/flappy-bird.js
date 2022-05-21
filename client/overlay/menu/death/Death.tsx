import React, { useContext, useState } from "react";
import { MenuContext } from "~client/overlay/context/MenuContext";

import * as S from "~client/styled";

import { GAME_MODE } from "~configs/game";

import { Multi } from "./Multi";
import { Single } from "./Single";

const Death = () => {
  const {
    gameModeHook: [gameMode],
  } = useContext(MenuContext);

  const [lastGameMode] = useState(gameMode);

  return (
    <S.FlexWrapper direction="column" h="100%" justifyContent="space-evenly">
      <S.FlexWrapper h="50%">
        {lastGameMode === GAME_MODE.SINGLE ? <Single /> : <Multi />}
      </S.FlexWrapper>
    </S.FlexWrapper>
  );
};

export { Death };
