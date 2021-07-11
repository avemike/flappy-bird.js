import React, { useState, useContext, useLayoutEffect } from "react";
import ButtonStyled from "../../shared/ButtonStyled";

import MenuContext from "../../../utils/MenuContext";
import styled from "styled-components";

import { CANVAS_SIZE } from "../../../../configs/canvas";
import { GameMode, MenuState } from "../../../../configs/game";

const Wrapper = styled.div<{ isActive: boolean }>`
  transform: ${({ isActive }) => (isActive ? "translateX(0)" : "translateX(-100%)")};
  position: relative;
  height: ${CANVAS_SIZE.HEIGHT}px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transition: transform 0.1s ease-in-out;
`;

function MainControls(): JSX.Element {
  const [active, setActive] = useState(true);
  const {
    startGame,
    menuStateHook: [, setMenuState],
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  useLayoutEffect(() => {
    return () => {
      setActive((active) => !active);
    };
  });

  function handleSingle() {
    setGameMode(GameMode.SINGLE);
    startGame();
  }

  function handleMulti() {
    setGameMode(GameMode.MULTI);
    setMenuState(MenuState.MULTI_DETAILS);
  }

  const SingleControls = () => <ButtonStyled onClick={handleSingle}>single</ButtonStyled>;

  const MultiControls = () => <ButtonStyled onClick={handleMulti}>multi</ButtonStyled>;

  return (
    <Wrapper isActive={active}>
      <SingleControls></SingleControls>
      <MultiControls></MultiControls>
    </Wrapper>
  );
}

export default MainControls;
