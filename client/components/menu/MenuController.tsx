import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { CANVAS_SIZE } from "../../../configs/canvas";
import { GameMode, LobbyMode, MenuState } from "../../../configs/game";
import LobbyContext from "../../utils/LobbyContext";
import MenuContext from "../../utils/MenuContext";
import { socket } from "../../utils/socketSetup";
import DeathControls from "./DeathControls";
import Lobby from "./lobby/Lobby";
import MainMenu from "./MainMenu";
import MultiDetails from "./multi_details/MultiDetails";

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
  overflow: hidden;
`;

const Title = styled.h1`
  position: fixed;
  font-size: 2em;
  left: 50%;
  transform: translateX(-50%);
`;

const MenuController = (): JSX.Element => {
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
  }, [setMenuState]);

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
        return <MainMenu />;
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
          <Title>{menuState}</Title>
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

export default MenuController;
