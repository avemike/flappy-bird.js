import React, { useContext } from "react";

import { GameMode, MenuState } from "../../../../configs/game";
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
    setGameMode(GameMode.NOT_SET);
    restartGame();
    setMenuState(MenuState.MAIN);
  }

  return (
    <S.FlexWrapper dir={"column"}>
      <S.Nav>
        <Leave onClick={handleBackToMenu}></Leave>
      </S.Nav>
      <CreateLink></CreateLink>
      <JoinMenu></JoinMenu>
    </S.FlexWrapper>
  );
}

export default MultiDetails;
