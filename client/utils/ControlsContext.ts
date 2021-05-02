import { createContext } from "react";

const ControlsContext = createContext<ControlsPack>({
  startGame: () => {},
  restartGame: () => {},
  isDeathScreenOn: false,
  gameTypeHook: ["default", () => {}],
});

export default ControlsContext;
