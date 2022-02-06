import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BackgroundBlur } from "~client/styled-components/BackgroundBlur";

import { FlexWrapper } from "~client/styled";

import { EVENTS } from "~configs/events";
import { GAME_MODE, LOBBY_MODE, MENU_STATE } from "~configs/game";

import { LobbyContext } from "~client/utils/context/LobbyContext";
import { MenuContext, MenuContextType } from "~client/utils/context/MenuContext";
import { socket } from "~client/utils/socketSetup";
import { Fade } from "~client/utils/transitions";

import { MenuWrapper as Menu } from "./Menu";
import { MenuStyled, Title } from "./styles";

const PaddingWrapper = styled.div`
  padding: 1rem 0;
  width: inherit;
  height: inherit;
`;

const MenuController = (): JSX.Element => {
  const [gameMode, setGameMode] = useState(GAME_MODE.NOT_SET);
  const [menuState, setMenuState] = useState(MENU_STATE.MAIN);
  const lobbyModeRef = useRef(LOBBY_MODE.NORMAL);

  useEffect(() => {
    socket.on(EVENTS.GAME_OVER, () => {
      setMenuState(MENU_STATE.DEATH);
    });

    socket.on(EVENTS.LOBBY_SET, () => {
      lobbyModeRef.current = LOBBY_MODE.NORMAL;
      setMenuState(MENU_STATE.LOBBY);
    });

    return () => {
      socket.off(EVENTS.GAME_OVER);
      socket.off(EVENTS.LOBBY_SET);
    };
  }, [setMenuState]);

  function startGame(gameMode: GAME_MODE) {
    setMenuState(MENU_STATE.DISABLED);

    setTimeout(() => {
      socket.emit(EVENTS.GAME_RESTART);

      if (gameMode === GAME_MODE.SINGLE) socket.emit(EVENTS.GAME_START);
      else if (gameMode === GAME_MODE.MULTI) socket.emit(EVENTS.MULTI_START_GAME);
    }, 1000);
  }

  function handleMulti(): void {
    setGameMode(GAME_MODE.MULTI);
    setMenuState(MENU_STATE.MULTI_DETAILS);

    socket.emit(EVENTS.MULTI_JOIN);
  }

  function backToMenu() {
    setMenuState(MENU_STATE.MAIN);

    gameMode === GAME_MODE.MULTI && socket.emit(EVENTS.MULTI_LEAVE);

    setGameMode(GAME_MODE.NOT_SET);

    socket.emit(EVENTS.GAME_RESTART);
  }

  const renderedMenu = menuState !== MENU_STATE.DISABLED ? <Menu state={menuState} /> : <></>;

  const context: MenuContextType = {
    startGame,
    handleMulti,
    backToMenu,
    menuStateHook: [menuState, setMenuState],
    gameModeHook: [gameMode, setGameMode],
  };

  return (
    <MenuStyled>
      <MenuContext.Provider value={context}>
        <LobbyContext.Provider value={{ lobbyModeRef }}>
          <BackgroundBlur active={menuState !== MENU_STATE.DISABLED}>
            <Fade primary={menuState}>
              <PaddingWrapper>
                <FlexWrapper>
                  <Title>{menuState}</Title>
                  {renderedMenu}
                </FlexWrapper>
              </PaddingWrapper>
            </Fade>
          </BackgroundBlur>
        </LobbyContext.Provider>
      </MenuContext.Provider>
    </MenuStyled>
  );
};

export { MenuController };
