import React, { useContext, useState } from "react";

import { LOBBY_MODE, MENU_STATE } from "../../../../configs/game";
import LobbyContext from "../../../utils/LobbyContext";
import MenuContext from "../../../utils/MenuContext";
import { Button } from "../../styles";

const CreateLobby = (): JSX.Element => {
  const [url, setUrl] = useState("");
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);
  const { lobbyModeRef } = useContext(LobbyContext);

  function handleClick() {
    setUrl("url");
    setMenu(MENU_STATE.LOBBY);
    lobbyModeRef.current = LOBBY_MODE.HOST;
    // TODO generate link
  }

  return (
    <>
      <Button onClick={handleClick}>create lobby</Button>
    </>
  );
};

export default CreateLobby;
