import React, { createContext } from "react";
import { GameMode, MenuState } from "../../configs/game";

interface MenuStateType {
  startGame: () => void;
  restartGame: () => void;
  menuStateHook: [MenuState, React.Dispatch<React.SetStateAction<MenuState>>];
  gameModeHook: [GameMode, React.Dispatch<React.SetStateAction<GameMode>>];
}

const MenuContext = createContext<MenuStateType>({
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
