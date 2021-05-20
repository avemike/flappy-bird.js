import { createContext } from "react";

const ControlsContext = createContext<ControlsPack>({
  startGame: () => {
    /* placeholder for TS */
  },
  restartGame: () => {
    /* placeholder for TS */
  },
  isDeathScreenOn: false,
  gameTypeHook: [
    "default",
    () => {
      /* placeholder for TS */
    },
  ],
});

export default ControlsContext;
