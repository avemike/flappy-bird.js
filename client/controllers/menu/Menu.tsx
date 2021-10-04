import React, { ReactElement, useRef } from "react";

import { LOBBY_MODE, MENU_STATE } from "../../../configs/game";
import * as S from "../../styled";
import { LobbyContext } from "../../utils/context";
import Death from "../../view/menu/Death";
import { Details } from "../../view/menu/details";
import MainMenu from "../../view/menu/MainMenu";
import Lobby from "../LobbyController";

interface Props {
  state: MENU_STATE;
}

const Menu = ({ state }: Props): JSX.Element => {
  const lobbyModeRef = useRef(LOBBY_MODE.NORMAL);

  switch (state) {
    case MENU_STATE.MAIN:
      return <MainMenu />;
    case MENU_STATE.MULTI_DETAILS:
      return (
        <LobbyContext.Provider value={{ lobbyModeRef }}>
          <Details />
        </LobbyContext.Provider>
      );
    case MENU_STATE.DEATH:
      return <Death />;
    case MENU_STATE.LOBBY:
      return <Lobby type={lobbyModeRef.current} />;
    case MENU_STATE.DISABLED:
      return <></>; // TODO delete whole case
  }
};

const MenuWrapper = ({ state }: Props): ReactElement => (
  <S.Container>
    <Menu state={state} />
  </S.Container>
);

export default MenuWrapper;
