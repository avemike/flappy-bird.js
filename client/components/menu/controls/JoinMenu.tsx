import React, { FormEvent, useContext, useState } from "react";
import styled from "styled-components";
import { LobbyMode, MenuState } from "../../../../configs/game";
import LobbyContext from "../../../utils/LobbyContext";
import MenuContext from "../../../utils/MenuContext";
import ButtonStyled from "../../shared/ButtonStyled";

const FormStyled = styled.form`
  position: absolute;
  transform: translate(0, 50%);
`;

const JoinMenu = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);
  const { lobbyModeRef } = useContext(LobbyContext);

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setMenu(MenuState.LOBBY);
  }

  function handleClick() {
    setOpen((open) => !open);
    setUrl("url");
    lobbyModeRef.current = LobbyMode.NORMAL;
    // generate link
  }

  return (
    <div>
      <ButtonStyled onClick={handleClick}>join lobby</ButtonStyled>
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

export default JoinMenu;
