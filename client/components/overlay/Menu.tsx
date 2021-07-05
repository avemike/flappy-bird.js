import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { CANVAS_SIZE } from "../../../configs/canvas";
import { GameMode, MenuState } from "../../../configs/game";
import MenuContext from "../../utils/MenuContext";
import { socket } from "../../utils/socketSetup";
import DeathControls from "./controls/DeathControls";
import MainControls from "./controls/MainControls";
import MultiDetails from "./controls/MultiDetails";

const MenuStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  width: ${CANVAS_SIZE.WIDTH}px;
  height: ${CANVAS_SIZE.HEIGHT}px;
  background: tomato;
  opacity: 0.5;
  z-index: 999;
`;

const Title = styled.h1`
  position: fixed;
`;

const Menu = (): JSX.Element => {
  const gameModeHook = useState(GameMode.NOT_SET);
  const menuStateHook = useState(MenuState.MAIN);
  const [menuState, setMenuState] = menuStateHook;

  useEffect(() => {
    socket.on("game over", () => {
      setMenuState(MenuState.DEATH);
    });

    return () => {
      socket.off("game over");
    };
  }, []);

  function startGame() {
    setMenuState(MenuState.DISABLED);
    socket.emit("start game");
  }

  function restartGame() {
    setMenuState(MenuState.MAIN);
    socket.emit("restart");
  }

  const { MAIN: MAIN, MULTI_DETAILS: MULTI_DETAILS, DEATH: DEATH, DISABLED: DISABLED } = MenuState;

  function switchRender(menuState: MenuState): JSX.Element {
    switch (menuState) {
      case MAIN:
        return <MainControls />;
      case MULTI_DETAILS:
        return <MultiDetails />;
      case DEATH:
        return <DeathControls />;
      case DISABLED:
        return <></>;
    }
  }

  return (
    <>
      {menuState !== MenuState.DISABLED && (
        <MenuStyled>
          <Title>Flappy Bird</Title>
          <MenuContext.Provider value={{ startGame, restartGame, menuStateHook, gameModeHook }}>
            {switchRender(menuStateHook[0])}
          </MenuContext.Provider>
        </MenuStyled>
      )}
    </>
  );
};

export default Menu;
