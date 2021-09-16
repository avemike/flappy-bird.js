import React, { useContext } from "react";

import { EVENTS } from "../../../configs/events";
import { GAME_MODE, MENU_STATE } from "../../../configs/game";
import * as S from "../../styles";
import MenuContext from "../../utils/context/MenuContext";
import { socket } from "../../utils/socketSetup";

function MainMenu(): JSX.Element {
  const {
    startGame,
    menuStateHook: [, setMenuState],
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  function handleSingle() {
    setGameMode(GAME_MODE.SINGLE);
    startGame(GAME_MODE.SINGLE);
  }

  function handleMulti() {
    setGameMode(GAME_MODE.MULTI);
    setMenuState(MENU_STATE.MULTI_DETAILS);

    socket.emit(EVENTS.MULTI_JOIN);
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
