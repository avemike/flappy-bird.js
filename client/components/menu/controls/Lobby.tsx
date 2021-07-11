import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MenuState, LobbyMode } from "../../../../configs/game";
import MenuContext from "../../../utils/MenuContext";
import { socket } from "../../../utils/socketSetup";

import ButtonStyled from "../../shared/ButtonStyled";
import { FlexWrapper } from "../../shared/Wrapper";

interface Props {
  type: LobbyMode;
}

const ReadyCounter = styled.span``;

function Lobby({ type }: Props): JSX.Element {
  const [ready, setReady] = useState(false);
  const [activePlayers, setActivePlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(2);

  useEffect(() => {
    // socket.on("max players data", ({ max }) => {
    // setMaxPlayers(max);
    // });
    // socket.on("active players data", ({ active }) => {
    // setActivePlayers(active);
    // });
  }, []);

  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  function handleReadyClick() {
    setReady((ready) => !ready);
    socket.emit("ready");
  }

  return (
    <FlexWrapper dir={"column"}>
      <ReadyCounter>
        ready: {activePlayers}/{maxPlayers}
      </ReadyCounter>
      {type === LobbyMode.HOST && (
        <>
          <div>you are host</div>
          <ButtonStyled onClick={handleReadyClick}>set ready</ButtonStyled>
        </>
      )}
      {type === LobbyMode.HOST && activePlayers === maxPlayers && (
        <ButtonStyled>start game</ButtonStyled>
      )}
      <ButtonStyled onClick={() => setMenu(MenuState.MULTI_DETAILS)}>leave</ButtonStyled>
    </FlexWrapper>
  );
}

export default Lobby;
