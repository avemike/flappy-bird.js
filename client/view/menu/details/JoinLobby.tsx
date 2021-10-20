import React, { FormEvent, useContext, useRef } from "react";
import styled from "styled-components";

import { Button } from "~client/styled";

import { EVENTS } from "~configs/events";
import { LOBBY_MODE, MENU_STATE } from "~configs/game";

import { useToggle } from "~client/hooks/useToggle";

import { LobbyContext } from "~client/utils/context/LobbyContext";
import { MenuContext } from "~client/utils/context/MenuContext";
import { socket } from "~client/utils/socketSetup";

const FormStyled = styled.form`
  position: absolute;
  transform: translate(0, 50%);
`;

const JoinLobby = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, toggleOpen] = useToggle();

  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  const { lobbyModeRef } = useContext(LobbyContext);

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    if (inputRef.current?.value != "") socket.emit(EVENTS.LOBBY_JOIN, inputRef.current?.value);
    else return;

    // TODO don't set LOBBY_MODE until server accepts link!!!
    // TODO check input value and send it to server
    // TODO forbid connecting to yourself
    lobbyModeRef.current = LOBBY_MODE.NORMAL;
    setMenu(MENU_STATE.LOBBY);
  }

  return (
    <div>
      <Button onClick={toggleOpen}>join lobby</Button>
      {isOpen && (
        <FormStyled onSubmit={handleFormSubmit}>
          <label>paste link to join</label>
          <input ref={inputRef} type="text"></input>
          <button type="submit">go</button>
        </FormStyled>
      )}
    </div>
  );
};

export { JoinLobby };
