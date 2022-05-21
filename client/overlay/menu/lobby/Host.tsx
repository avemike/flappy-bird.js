import React, { useContext } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { Back } from "~client/overlay/components/Back";
import { ControlPanel } from "~client/overlay/components/ControlPanel";
import { ShareLink } from "~client/overlay/components/ShareLink";
import { MenuContext } from "~client/overlay/context/MenuContext";

import * as S from "~client/styled";

import { EVENTS } from "~configs/events";
import { MENU_STATE } from "~configs/game";

import { socket } from "~client/utils/socketSetup";

const Host = () => {
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  function handleLeave() {
    setMenu(MENU_STATE.MULTI_DETAILS);
    socket.emit(EVENTS.LOBBY_ABORT);
  }

  return (
    <S.FlexWrapper direction="column">
      <S.Nav>
        <Back onClick={handleLeave} />
        <ShareLink>
          <AiOutlineShareAlt />
        </ShareLink>
      </S.Nav>
      <div>you are host</div>
      <ControlPanel />
    </S.FlexWrapper>
  );
};

export { Host };
