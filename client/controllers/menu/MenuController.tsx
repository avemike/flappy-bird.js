import React, { useEffect, useState } from "react";

import { EVENTS } from "../../../configs/events";
import { GAME_MODE, MENU_STATE } from "../../../configs/game";
import { MenuContext } from "../../utils/context";
import { socket } from "../../utils/socketSetup";
import { Fade } from "../../utils/transitions";
import Menu from "./Menu";
import { MenuStyled, Title } from "./styles";

const MenuController = (): JSX.Element => {
  const [gameMode, setGameMode] = useState(GAME_MODE.NOT_SET);
  const [menuState, setMenuState] = useState(MENU_STATE.MAIN);

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

    socket.emit(EVENTS.GAME_RESTART);

    if (gameMode === GAME_MODE.SINGLE) socket.emit(EVENTS.GAME_START);
    else if (gameMode === GAME_MODE.MULTI) socket.emit(EVENTS.MULTI_START_GAME);
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

  return (
    <MenuStyled>
      <Title>{menuState}</Title>
      <MenuContext.Provider
        value={{
          startGame,
          handleMulti,
          backToMenu,
          menuStateHook: [menuState, setMenuState],
          gameModeHook: [gameMode, setGameMode],
        }}
      >
        <Fade key={menuState}>{renderedMenu}</Fade>
      </MenuContext.Provider>
    </MenuStyled>
  );
};

export default MenuController;
