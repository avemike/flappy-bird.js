import React, { useContext } from "react";
import { LobbyContext } from "~client/overlay/context/LobbyContext";
import { MenuContext } from "~client/overlay/context/MenuContext";

import { Button } from "~client/styled";

import { EVENTS } from "~configs/events";
import { LOBBY_MODE, MENU_STATE } from "~configs/game";

import { socket } from "~client/utils/socketSetup";

const CreateLobby = (): JSX.Element => {
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  const { lobbyModeRef } = useContext(LobbyContext);

  function handleClick() {
    setMenu(MENU_STATE.LOBBY);
    lobbyModeRef.current = LOBBY_MODE.HOST;

    socket.emit(EVENTS.LOBBY_CREATE);
  }

  return (
    <>
      <Button onClick={handleClick}>create lobby</Button>
    </>
  );
};

export { CreateLobby };
