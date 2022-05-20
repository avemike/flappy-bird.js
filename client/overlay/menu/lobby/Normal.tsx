import React, { useCallback, useContext, useEffect, useState } from "react";
import { Back } from "~client/overlay/components/Back";
import { MenuContext } from "~client/overlay/context/MenuContext";

import * as S from "~client/styled";

import { EVENTS } from "~configs/events";
import { MENU_STATE } from "~configs/game";
import { Callback } from "~configs/types";

import { socket } from "~client/utils/socketSetup";

function Normal(): JSX.Element {
  const [ready, setReady] = useState(false);

  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  const handleLeave = useCallback(() => {
    setMenu(MENU_STATE.MULTI_DETAILS);
    socket.emit(EVENTS.LOBBY_LEAVE);
  }, [setMenu]);

  const handleKickedOut = useCallback(() => {
    setMenu(MENU_STATE.MULTI_DETAILS);
  }, [setMenu]);

  useEffect(handleSockets, [handleLeave, handleKickedOut]);

  function handleSockets(): Callback {
    socket.on(EVENTS.LOBBY_LEAVE, handleLeave);
    socket.on(EVENTS.LOBBY_KICK_OUT, handleKickedOut);

    return () => {
      socket.off(EVENTS.LOBBY_LEAVE);
      socket.off(EVENTS.LOBBY_KICK_OUT);
    };
  }

  function toggleReady() {
    setReady((ready) => !ready);
    socket.emit(EVENTS.READY_ACTION, ready ? false : true); // ready is not updated yet, so values are reversed
  }

  return (
    <S.FlexWrapper direction="column">
      <S.Nav>
        <Back onClick={handleLeave} />
      </S.Nav>
      <S.Button onClick={toggleReady}>{ready ? "turn off" : "set ready"}</S.Button>
      <S.Button onClick={handleLeave}>leave</S.Button>
    </S.FlexWrapper>
  );
}

export { Normal };
