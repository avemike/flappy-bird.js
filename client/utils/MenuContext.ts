import React, { createContext } from "react";

import { GameMode, MenuState } from "../../configs/game";

interface MenuContextType {
  startGame: () => void;
  restartGame: () => void;
  // menuStateHook: [MenuState, React.Dispatch<React.SetStateAction<MenuState>>];
  menuStateHook: [MenuState, React.Dispatch<React.SetStateAction<MenuState>>];
  gameModeHook: [GameMode, React.Dispatch<React.SetStateAction<GameMode>>];
}

const MenuContext = createContext<MenuContextType>({
  startGame: () => {
    // placeholder
  },
  restartGame: () => {
    // placeholder
  },
  menuStateHook: [
    MenuState.MAIN,
    () => {
      // placeholder
    },
  ],
  gameModeHook: [
    GameMode.NOT_SET,
    () => {
      // placeholder
    },
  ],
});

export default MenuContext;
