import { MutableRefObject, createContext } from "react";

import { LOBBY_MODE } from "../../configs/game";

interface LobbyModeType {
  lobbyModeRef: MutableRefObject<LOBBY_MODE>;
}

const LobbyContext = createContext<LobbyModeType>({
  lobbyModeRef: { current: LOBBY_MODE.NORMAL },
});

export default LobbyContext;
