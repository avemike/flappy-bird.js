import React, { FormEvent, useContext, useRef, useState } from "react";
import styled from "styled-components";

import { EVENTS } from "../../../../configs/events";
import { LOBBY_MODE, MENU_STATE } from "../../../../configs/game";
import { Button } from "../../../styled";
import LobbyContext from "../../../utils/context/LobbyContext";
import MenuContext from "../../../utils/context/MenuContext";
import { socket } from "../../../utils/socketSetup";

const FormStyled = styled.form`
  position: absolute;
  transform: translate(0, 50%);
`;

const JoinLobby = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);
  const { lobbyModeRef } = useContext(LobbyContext);

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (inputRef.current?.value != "") {
      socket.emit(EVENTS.LOBBY_JOIN, inputRef.current?.value);
    } else {
      return;
    }
    setMenu(MENU_STATE.LOBBY);
  }

  function handleClick() {
    setOpen((open) => !open);
    lobbyModeRef.current = LOBBY_MODE.NORMAL;
    // TODO generate link
  }

  return (
    <div>
      <Button onClick={handleClick}>join lobby</Button>
      {open && (
        <FormStyled onSubmit={handleFormSubmit}>
          <label>paste link to join</label>
          <input ref={inputRef} type="text"></input>
          <button type="submit">go</button>
        </FormStyled>
      )}
    </div>
  );
};

export default JoinLobby;
