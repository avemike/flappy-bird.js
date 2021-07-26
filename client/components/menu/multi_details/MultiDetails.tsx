import React, { useContext, useState } from "react";
import { Transition } from "react-transition-group";

import { GameMode, MenuState, ANIMATION_DURATION as duration } from "../../../../configs/game";
import MenuContext from "../../../utils/MenuContext";
import * as S from "../../styles";
import Leave from "../nav/Back";
import CreateLink from "./CreateLobby";
import JoinMenu from "./JoinLobby";

function MultiDetails(): JSX.Element {
  const [inProp, setInProp] = useState(true);

  const {
    restartGame,
    gameModeHook: [, setGameMode],
    menuStateHook: [, setMenuState],
  } = useContext(MenuContext);

  function handleBackToMenu() {
    setInProp(false);
    setTimeout(() => {
      setGameMode(GameMode.NOT_SET);
      restartGame();
      setMenuState(MenuState.MAIN);
    }, duration.miliseconds);
  }

  return (
    <Transition
      in={inProp}
      appear={true}
      timeout={duration.miliseconds}
      onEntering={(node, isAppearing: boolean) => {
        console.log("details, appear:", isAppearing);
      }}
    >
      {(state) => (
        <S.FlexWrapper dir={"column"} state={state}>
          <S.Nav>
            <Leave onClick={handleBackToMenu}></Leave>
          </S.Nav>
          <CreateLink></CreateLink>
          <JoinMenu></JoinMenu>
        </S.FlexWrapper>
      )}
    </Transition>
  );
}

export default MultiDetails;
