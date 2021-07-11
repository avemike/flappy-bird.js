import React, { useContext, useState } from "react";
// import styled from "styled-components";
import MenuContext from "../../../utils/MenuContext";
import ButtonStyled from "../../shared/ButtonStyled";

import { LobbyMode, MenuState } from "../../../../configs/game";
import LobbyContext from "../../../utils/LobbyContext";

const CreateLink = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);
  const { lobbyModeRef } = useContext(LobbyContext);

  function handleClick() {
    setOpen((open) => !open);
    setUrl("url");
    setMenu(MenuState.LOBBY);
    lobbyModeRef.current = LobbyMode.HOST;
    // generate link
  }

  return (
    <div>
      <ButtonStyled onClick={handleClick}>create lobby</ButtonStyled>
      {/* {open && (
        <FormStyled>
          <label>share this link with friend</label>
          <input type="text" value={url} readOnly></input>
        </FormStyled>
      )} */}
    </div>
  );
};

export default CreateLink;
