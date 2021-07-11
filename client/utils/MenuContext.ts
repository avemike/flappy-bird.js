import React, { createContext } from "react";
import { GameMode, MenuState, MenuStateType } from "../../configs/game";

interface MenuContextType {
  startGame: () => void;
  restartGame: () => void;
  // menuStateHook: [MenuState, React.Dispatch<React.SetStateAction<MenuState>>];
  menuStateHook: [
    MenuStateType,
    React.Dispatch<React.SetStateAction<MenuStateType>>
  ];
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
    {
      current: MenuState.MAIN,
      prev: null,
    },
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
