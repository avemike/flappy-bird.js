import React, { useContext, useState } from "react";

import { GameMode, MenuState } from "../../../configs/game";
import MenuContext from "../../utils/MenuContext";
import * as S from "../styles";

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
          setGameMode(GameMode.MULTI);
          setMenuState(MenuState.MULTI_DETAILS);
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

function switchRender(gameMode: GameMode): JSX.Element {
  switch (gameMode) {
    case GameMode.SINGLE:
      return <Single></Single>;
    case GameMode.MULTI:
      return <Multi></Multi>;
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
