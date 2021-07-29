import React, { useContext } from "react";

import { GameMode, MenuState } from "../../../configs/game";
import MenuContext from "../../utils/MenuContext";
import * as S from "../styles";

function MainMenu(): JSX.Element {
  const {
    startGame,
    menuStateHook: [menuState, setMenuState],
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  function handleSingle() {
    setGameMode(GameMode.SINGLE);
    startGame();
  }

  function handleMulti() {
    setGameMode(GameMode.MULTI);
    setMenuState(MenuState.MULTI_DETAILS);
  }

  const SingleControls = () => <S.Button onClick={handleSingle}>single</S.Button>;

  const MultiControls = () => <S.Button onClick={handleMulti}>multi</S.Button>;

  return (
    <S.FlexWrapper dir={"column"}>
      <SingleControls></SingleControls>
      <MultiControls></MultiControls>
    </S.FlexWrapper>
  );
}

export default MainMenu;
