import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import MainControls from "./controls/MainControls";
import MultiDetails from "./controls/MultiDetails";
import DeathControls from "./controls/DeathControls";
import Lobby from "./controls/Lobby";

import MenuContext from "../../utils/MenuContext";
import LobbyContext from "../../utils/LobbyContext";
import { socket } from "../../utils/socketSetup";

import { MenuState, GameMode, LobbyMode } from "../../../configs/game";
import { CANVAS_SIZE } from "../../../configs/canvas";

const MenuStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  width: ${CANVAS_SIZE.WIDTH}px;
  height: ${CANVAS_SIZE.HEIGHT}px;
  background: tomato;
  opacity: 0.5;
  z-index: 1;
`;

const Title = styled.h1`
  position: fixed;
`;

const Menu = (): JSX.Element => {
  const lobbyModeRef = useRef(LobbyMode.NORMAL);
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
    const [, setGameMode] = gameModeHook;
    setGameMode(GameMode.NOT_SET);
    socket.emit("restart");
  }

  function switchRender(menuState: MenuState): JSX.Element {
    switch (menuState) {
      case MenuState.MAIN:
        return <MainControls />;
      case MenuState.MULTI_DETAILS:
        return (
          <LobbyContext.Provider value={{ lobbyModeRef }}>
            <MultiDetails />
          </LobbyContext.Provider>
        );
      case MenuState.DEATH:
        return <DeathControls />;
      case MenuState.LOBBY:
        return <Lobby type={lobbyModeRef.current} />;
      case MenuState.DISABLED:
        return <></>;
    }
  }

  return (
    <>
      {menuState !== MenuState.DISABLED && (
        <MenuStyled>
          <Title>Flappy Bird</Title>
          <MenuContext.Provider
            value={{
              startGame,
              restartGame,
              menuStateHook,
              gameModeHook,
            }}
          >
            {switchRender(menuState)}
          </MenuContext.Provider>
        </MenuStyled>
      )}
    </>
  );
};

export default Menu;
