import React, { ReactElement, useContext } from "react";
import { LobbyContext } from "~client/overlay/context/LobbyContext";
import { Death } from "~client/overlay/menu/death/Death";

import { Container } from "~client/styled";

import { MENU_STATE } from "~configs/game";

import { MainMenu } from "./MainMenu";
import { Details } from "./details/Details";
import { Lobby } from "./lobby/LobbyController";

interface Props {
  state: MENU_STATE;
}

const Menu = ({ state }: Props): JSX.Element => {
  const { lobbyModeRef } = useContext(LobbyContext);

  switch (state) {
    case MENU_STATE.MAIN:
      return <MainMenu />;
    case MENU_STATE.MULTI_DETAILS:
      return <Details />;
    case MENU_STATE.DEATH:
      return <Death />;
    case MENU_STATE.LOBBY:
      return <Lobby type={lobbyModeRef.current} />;
    default:
      return <></>;
  }
};

const MenuWrapper = ({ state }: Props): ReactElement => (
  <Container>
    <Menu state={state} />
  </Container>
);

export { MenuWrapper };
