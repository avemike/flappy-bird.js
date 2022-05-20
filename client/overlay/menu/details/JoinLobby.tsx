import React, { FormEvent, useContext, useRef } from "react";
import styled from "styled-components";
import { LobbyContext } from "~client/overlay/context/LobbyContext";
import { MenuContext } from "~client/overlay/context/MenuContext";
import { Fade } from "~client/overlay/transitions";

import { Button } from "~client/styled";

import { EVENTS } from "~configs/events";
import { LOBBY_MODE, MENU_STATE } from "~configs/game";

import { socket } from "~client/utils/socketSetup";

import { useToggle } from "../../hooks/useToggle";

const FormStyled = styled.form`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

const StyledLabel = styled.label`
  font-size: 12px;
  margin-bottom: 2px;
`;

const StyledInput = styled.input`
  background: transparent;
  width: 100%;
  font-size: 8px;
  letter-spacing: -1px;
  color: black;
  padding: 4px;
  border: "1px solid black";
  outline: none;
  text-shadow: none;
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

    if (inputRef.current?.value !== "") socket.emit(EVENTS.LOBBY_JOIN, inputRef.current?.value);
    else return;

    // TODO check input value and send it to server
    // TODO forbid connecting to yourself
    lobbyModeRef.current = LOBBY_MODE.NORMAL;
    setMenu(MENU_STATE.LOBBY);
  }

  return (
    <div>
      <Button onClick={toggleOpen}>join lobby</Button>
      <Fade primary={`${isOpen}`}>
        {isOpen ? (
          <FormStyled onSubmit={handleFormSubmit}>
            <StyledLabel>paste link to join</StyledLabel>
            <StyledInput ref={inputRef} type="text"></StyledInput>
            <Button type="submit" sm>
              go
            </Button>
          </FormStyled>
        ) : (
          <></>
        )}
      </Fade>
    </div>
  );
};

export { JoinLobby };
