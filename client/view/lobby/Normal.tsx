import React, { useCallback, useContext, useEffect, useState } from "react";

import { EVENTS } from "../../../configs/events";
import { MENU_STATE } from "../../../configs/game";
import { Back } from "../../components/Back";
import * as S from "../../styles";
import MenuContext from "../../utils/context/MenuContext";
import { socket } from "../../utils/socketSetup";

function Normal(): JSX.Element {
  const [ready, setReady] = useState(false);

  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  const handleLeave = useCallback(() => {
    setMenu(MENU_STATE.MULTI_DETAILS);
  }, [setMenu]);

  useEffect(() => {
    socket.on(EVENTS.LBOBY_LEAVE, handleLeave);
    return () => {
      socket.off(EVENTS.LBOBY_LEAVE);
    };
  }, [handleLeave]);

  function toggleReady() {
    setReady((ready) => !ready);
    if (!ready) {
      socket.emit(EVENTS.READY_ACTION, true);
    } else {
      socket.emit(EVENTS.READY_ACTION, false);
    }
  }

  return (
    <S.FlexWrapper dir={"column"} animated>
      <S.Nav>
        <Back onClick={handleLeave}></Back>
      </S.Nav>
      <S.Button onClick={toggleReady}>{ready ? "turn off" : "set ready"}</S.Button>
      <S.Button onClick={() => setMenu(MENU_STATE.MULTI_DETAILS)}>leave</S.Button>
    </S.FlexWrapper>
  );
}

export default Normal;
