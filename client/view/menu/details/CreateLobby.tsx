import React, { useContext } from "react";

import { LOBBY_MODE, MENU_STATE } from "../../../../configs/game";
import { Button } from "../../../styles";
import LobbyContext from "../../../utils/context/LobbyContext";
import MenuContext from "../../../utils/context/MenuContext";

const CreateLobby = (): JSX.Element => {
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);
  const { lobbyModeRef } = useContext(LobbyContext);

  function handleClick() {
    setMenu(MENU_STATE.LOBBY);
    lobbyModeRef.current = LOBBY_MODE.HOST;
  }

  return (
    <>
      <Button onClick={handleClick}>create lobby</Button>
    </>
  );
};

export default CreateLobby;
