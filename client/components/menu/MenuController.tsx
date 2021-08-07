import React, { useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";

import { CANVAS_SIZE } from "../../../configs/canvas";
import { GAME_MODE, LOBBY_MODE, MENU_STATE } from "../../../configs/game";
import { EVENTS } from "../../../server/handlers";
import LobbyContext from "../../utils/LobbyContext";
import MenuContext from "../../utils/MenuContext";
import { socket } from "../../utils/socketSetup";
import * as S from "../styles";
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
  /* background: tomato; */
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
  const lobbyModeRef = useRef(LOBBY_MODE.NORMAL);
  const gameModeHook = useState(GAME_MODE.NOT_SET);
  const menuStateHook = useState(MENU_STATE.MAIN);
  const [menuState, setMenuState] = menuStateHook;

  useEffect(() => {
    socket.on(EVENTS.GAME_OVER, () => {
      setMenuState(MENU_STATE.DEATH);
    });

    return () => {
      socket.off(EVENTS.GAME_OVER);
    };
  }, [setMenuState]);

  function startGame() {
    setMenuState(MENU_STATE.DISABLED);
    socket.emit(EVENTS.START_GAME);
  }

  function restartGame() {
    setMenuState(MENU_STATE.MAIN);
    const [, setGameMode] = gameModeHook;
    setGameMode(GAME_MODE.NOT_SET);
    socket.emit(EVENTS.RESTART);
  }

  function switchRender(menuState: MENU_STATE): JSX.Element {
    switch (menuState) {
      case MENU_STATE.MAIN:
        return <MainMenu />;
      case MENU_STATE.MULTI_DETAILS:
        return (
          <LobbyContext.Provider value={{ lobbyModeRef }}>
            <MultiDetails />
          </LobbyContext.Provider>
        );
      case MENU_STATE.DEATH:
        return <DeathControls />;
      case MENU_STATE.LOBBY:
        return <Lobby type={lobbyModeRef.current} />;
      case MENU_STATE.DISABLED:
        return <></>;
    }
  }

  return (
    <>
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
          <SwitchTransition>
            <CSSTransition
              key={menuState}
              appear={true}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              {menuState !== MENU_STATE.DISABLED ? <S.Container>{switchRender(menuState)}</S.Container> : <></>}
            </CSSTransition>
          </SwitchTransition>
        </MenuContext.Provider>
      </MenuStyled>
    </>
  );
};

export default MenuController;
