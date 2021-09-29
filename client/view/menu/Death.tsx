import React, { useContext, useState } from "react";

import { GAME_MODE, MENU_STATE } from "../../../configs/game";
import * as S from "../../styled";
import MenuContext from "../../utils/context/MenuContext";

function Single(): JSX.Element {
  const {
    restartGame,
    menuStateHook: [, setMenuState],
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  return (
    <>
      <S.Button onClick={restartGame}>restart</S.Button>
      <S.Button
        onClick={() => {
          setGameMode(GAME_MODE.MULTI);
          setMenuState(MENU_STATE.MULTI_DETAILS);
        }}
      >
        multi
      </S.Button>
    </>
  );
}

function Multi(): JSX.Element {
  const { restartGame } = useContext(MenuContext);
  return (
    <>
      <S.Button>go to single</S.Button>
      <S.Button>create new link</S.Button>
      <S.Button onClick={restartGame}>main menu</S.Button>
    </>
  );
}

function switchRender(gameMode: GAME_MODE): JSX.Element {
  switch (gameMode) {
    case GAME_MODE.SINGLE:
      return <Single />;
    case GAME_MODE.MULTI:
      return <Multi />;
    default:
      return <></>;
  }
}

function DeathControls(): JSX.Element {
  const {
    gameModeHook: [gameMode],
  } = useContext(MenuContext);

  const [lastGameMode] = useState(gameMode);

  return (
    <S.FlexWrapper dir={"column"} animated>
      {switchRender(lastGameMode)}
    </S.FlexWrapper>
  );
}

export default DeathControls;
