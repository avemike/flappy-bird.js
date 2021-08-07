import React, { useContext } from "react";

import { GAME_MODE, MENU_STATE } from "../../../configs/game";
import MenuContext from "../../utils/MenuContext";
import * as S from "../styles";

function MainMenu(): JSX.Element {
  const {
    startGame,
    menuStateHook: [menuState, setMenuState],
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  function handleSingle() {
    setGameMode(GAME_MODE.SINGLE);
    startGame();
  }

  function handleMulti() {
    setGameMode(GAME_MODE.MULTI);
    setMenuState(MENU_STATE.MULTI_DETAILS);
  }

  const SingleControls = () => <S.Button onClick={handleSingle}>single</S.Button>;

  const MultiControls = () => <S.Button onClick={handleMulti}>multi</S.Button>;

  return (
    <S.FlexWrapper dir={"column"} animated>
      <SingleControls></SingleControls>
      <MultiControls></MultiControls>
    </S.FlexWrapper>
  );
}

export default MainMenu;
