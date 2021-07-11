import { createContext, MutableRefObject } from "react";
import { LobbyMode } from "../../configs/game";

interface LobbyModeType {
  lobbyModeRef: MutableRefObject<LobbyMode>;
}

const LobbyContext = createContext<LobbyModeType>({
  lobbyModeRef: { current: LobbyMode.NORMAL },
});

export default LobbyContext;
