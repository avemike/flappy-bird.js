import React, { useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";

import { CANVAS_SIZE } from "../../configs/canvas";
import { EVENTS } from "../../configs/events";
import { GAME_MODE, LOBBY_MODE, MENU_STATE } from "../../configs/game";
import * as S from "../styled";
import { LobbyContext, MenuContext } from "../utils/context";
import { socket } from "../utils/socketSetup";
import Death from "../view/menu/Death";
import { Details } from "../view/menu/details";
import MainMenu from "../view/menu/MainMenu";
import Lobby from "./LobbyController";

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

  function startGame(gameMode: GAME_MODE) {
    setMenuState(MENU_STATE.DISABLED);

    switch (gameMode) {
      case GAME_MODE.SINGLE:
        socket.emit(EVENTS.GAME_START);
        break;
      case GAME_MODE.MULTI:
        socket.emit(EVENTS.MULTI_START_GAME);
        break;
    }
  }

  function restartGame() {
    setMenuState(MENU_STATE.MAIN);

    const [gameMode, setGameMode] = gameModeHook;
    gameMode === GAME_MODE.MULTI && socket.emit(EVENTS.MULTI_LEAVE);

    setGameMode(GAME_MODE.NOT_SET);

    socket.emit(EVENTS.GAME_RESTART);
  }

  function switchRender(menuState: MENU_STATE): JSX.Element {
    switch (menuState) {
      case MENU_STATE.MAIN:
        return <MainMenu />;
      case MENU_STATE.MULTI_DETAILS:
        return (
          <LobbyContext.Provider value={{ lobbyModeRef }}>
            <Details />
          </LobbyContext.Provider>
        );
      case MENU_STATE.DEATH:
        return <Death />;
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
