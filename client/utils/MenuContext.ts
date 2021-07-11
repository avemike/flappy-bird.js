import React, { createContext } from "react";
<<<<<<< HEAD
import { GameMode, MenuState, MenuStateType } from "../../configs/game";
=======

import { GameMode, MenuState } from "../../configs/game";
>>>>>>> a7bec960accca1ad67e11e906406749e24d1d7aa

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
