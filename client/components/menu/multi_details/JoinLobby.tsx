import React, { FormEvent, useContext, useState } from "react";
import styled from "styled-components";

import { LOBBY_MODE, MENU_STATE } from "../../../../configs/game";
import LobbyContext from "../../../utils/LobbyContext";
import MenuContext from "../../../utils/MenuContext";
import { Button } from "../../styles";

const FormStyled = styled.form`
  position: absolute;
  transform: translate(0, 50%);
`;

const JoinLobby = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);
  const { lobbyModeRef } = useContext(LobbyContext);

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setMenu(MENU_STATE.LOBBY);
  }

  function handleClick() {
    setOpen((open) => !open);
    setUrl("url");
    lobbyModeRef.current = LOBBY_MODE.NORMAL;
    // TODO generate link
  }

  return (
    <div>
      <Button onClick={handleClick}>join lobby</Button>
      {open && (
        <FormStyled onSubmit={handleFormSubmit}>
          <label>paste link to join</label>
          <input type="text"></input>
          <button type="submit">go</button>
        </FormStyled>
      )}
    </div>
  );
};

export default JoinLobby;
