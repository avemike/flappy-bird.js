import React, { useContext } from "react";

import { GAME_MODE, MENU_STATE } from "../../../../configs/game";
import MenuContext from "../../../utils/MenuContext";
import * as S from "../../styles";
import Leave from "../nav/Back";
import CreateLink from "./CreateLobby";
import JoinMenu from "./JoinLobby";

function MultiDetails(): JSX.Element {
  const {
    restartGame,
    menuStateHook: [menuState, setMenuState],
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  function handleBackToMenu() {
    setGameMode(GAME_MODE.NOT_SET);
    restartGame();
    setMenuState(MENU_STATE.MAIN);
  }

  return (
    <S.FlexWrapper dir={"column"} animated>
      <S.Nav>
        <Leave onClick={handleBackToMenu}></Leave>
      </S.Nav>
      <CreateLink></CreateLink>
      <JoinMenu></JoinMenu>
    </S.FlexWrapper>
  );
}

export default MultiDetails;
