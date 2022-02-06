import React, { useContext } from "react";

import * as S from "~client/styled";

import { LOBBY_MODE, MENU_STATE } from "~configs/game";

import { LobbyContext } from "~client/utils/context/LobbyContext";
import { MenuContext } from "~client/utils/context/MenuContext";

const Multi = (): JSX.Element => {
  const {
    backToMenu,
    menuStateHook: [, setMenuState],
  } = useContext(MenuContext);

  const {
    lobbyModeRef: { current },
  } = useContext(LobbyContext);

  function handleRestart(): void {
    setMenuState(MENU_STATE.LOBBY);
  }

  function backToLobby(): void {
    // TODO check if host has started the lobby again, if not show message that going back to lobby is not possible
    // setMenuState(MENU_STATE.LOBBY);
  }

  return (
    <>
      <S.ExtendedButton>leaderboard</S.ExtendedButton>
      {current === LOBBY_MODE.HOST ? (
        <S.Button onClick={handleRestart}>restart</S.Button>
      ) : (
        <S.Button onClick={backToLobby}>back to lobby</S.Button>
      )}
      <S.Button onClick={backToMenu}>main menu</S.Button>
    </>
  );
};

export { Multi };
