import React, { useContext } from "react";

import ButtonStyled from "../../shared/ButtonStyled";
import { FlexWrapper } from "../../shared/Wrapper";

import MenuContext from "../../../utils/MenuContext";
import { GameMode, MenuState } from "../../../../configs/game";

function SingleControls(): JSX.Element {
  const {
    restartGame,
    menuStateHook: [, setMenuState],
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  return (
    <>
      <ButtonStyled onClick={restartGame}>restart</ButtonStyled>
      <ButtonStyled
        onClick={() => {
          setGameMode(GameMode.MULTI);
          setMenuState(MenuState.MULTI_DETAILS);
        }}
      >
        multi
      </ButtonStyled>
    </>
  );
}

function MultiControls(): JSX.Element {
  const { restartGame } = useContext(MenuContext);
  return (
    <>
      <ButtonStyled>go to single</ButtonStyled>
      <ButtonStyled>create new link</ButtonStyled>
      <ButtonStyled onClick={restartGame}>main menu</ButtonStyled>
    </>
  );
}

function switchRender(gameMode: GameMode): JSX.Element {
  switch (gameMode) {
    case GameMode.SINGLE:
      return <SingleControls></SingleControls>;
    case GameMode.MULTI:
      return <MultiControls></MultiControls>;
    default:
      return <></>;
  }
}

function DeathControls(): JSX.Element {
  const {
    gameModeHook: [gameMode],
  } = useContext(MenuContext);

  return <FlexWrapper dir={"column"}>{switchRender(gameMode)}</FlexWrapper>;
}

export default DeathControls;
