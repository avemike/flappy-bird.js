import React, { ReactElement, useContext } from "react";

import * as S from "~client/styled";

import { MENU_STATE } from "~configs/game";

import { LobbyContext } from "~client/utils/context/LobbyContext";

import { MainMenu } from "~client/view/menu/MainMenu";
import { Death } from "~client/view/menu/death/Death";
import { Details } from "~client/view/menu/details/Details";

import { Lobby } from "../LobbyController";

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
  <S.Container>
    <Menu state={state} />
  </S.Container>
);

export { MenuWrapper };
