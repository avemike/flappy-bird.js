import React, { useContext, useState } from "react";
import { Transition } from "react-transition-group";

import { GameMode, MenuState, ANIMATION_DURATION as duration } from "../../../configs/game";
import MenuContext from "../../utils/MenuContext";
import * as S from "../styles";

function MainMenu(): JSX.Element {
  const [inProp, setInProp] = useState(true);

  const {
    startGame,
    menuStateHook: [, setMenuState],
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  function handleSingle() {
    setInProp(false);
    setTimeout(() => {
      setGameMode(GameMode.SINGLE);
      startGame();
    }, duration.miliseconds);
  }

  function handleMulti() {
    setInProp(false);
    setTimeout(() => {
      setGameMode(GameMode.MULTI);
      setMenuState(MenuState.MULTI_DETAILS);
    }, duration.miliseconds);
  }

  const SingleControls = () => <S.Button onClick={handleSingle}>single</S.Button>;

  const MultiControls = () => <S.Button onClick={handleMulti}>multi</S.Button>;

  return (
    <Transition
      in={inProp}
      appear={true}
      timeout={duration.miliseconds}
      onEntering={(node, isAppearing: boolean) => {
        console.log("main, appear:", isAppearing);
      }}
    >
      {(state) => (
        <S.FlexWrapper dir={"column"} state={state}>
          <SingleControls></SingleControls>
          <MultiControls></MultiControls>
        </S.FlexWrapper>
      )}
    </Transition>
  );
}

export default MainMenu;
