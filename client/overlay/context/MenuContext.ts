import React, { createContext } from "react";

import { GAME_MODE, MENU_STATE } from "~configs/game";

interface MenuContextType {
  startGame: (GAME_MODE: GAME_MODE) => void;
  handleMulti: () => void;
  backToMenu: () => void;
  menuStateHook: [MENU_STATE, React.Dispatch<React.SetStateAction<MENU_STATE>>];
  gameModeHook: [GAME_MODE, React.Dispatch<React.SetStateAction<GAME_MODE>>];
}

const MenuContext = createContext<MenuContextType>({
  startGame: () => {
    // placeholder
  },
  handleMulti: () => {
    // placeholder
  },
  backToMenu: () => {
    // placeholder
  },
  menuStateHook: [
    MENU_STATE.MAIN,
    () => {
      // placeholder
    },
  ],
  gameModeHook: [
    GAME_MODE.NOT_SET,
    () => {
      // placeholder
    },
  ],
});

export { MenuContext, MenuContextType };
