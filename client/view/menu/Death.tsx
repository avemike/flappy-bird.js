import React, { useContext, useState } from "react";

import { GAME_MODE } from "../../../configs/game";
import * as S from "../../styled";
import MenuContext from "../../utils/context/MenuContext";

function Single(): JSX.Element {
  const { handleMulti, backToMenu } = useContext(MenuContext);

  return (
    <>
      <S.Button onClick={backToMenu}>back to menu</S.Button>
      <S.Button onClick={handleMulti}>multi</S.Button>
    </>
  );
}

function Multi(): JSX.Element {
  const { backToMenu } = useContext(MenuContext);
  return (
    <>
      <S.Button>leaderboard</S.Button>
      <S.Button>restart</S.Button>
      <S.Button onClick={backToMenu}>main menu</S.Button>
    </>
  );
}

function DeathControls(): JSX.Element {
  const {
    gameModeHook: [gameMode],
  } = useContext(MenuContext);

  const [lastGameMode] = useState(gameMode);

  return (
    <S.FlexWrapper direction={"column"} animated>
      {lastGameMode === GAME_MODE.SINGLE ? <Single /> : <Multi />}
    </S.FlexWrapper>
  );
}

export default DeathControls;
