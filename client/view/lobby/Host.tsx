import React, { useContext } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";

import * as S from "~client/styled";

import { EVENTS } from "~configs/events";
import { MENU_STATE } from "~configs/game";

import { Back } from "~client/components/Back";
import { ControlPanel } from "~client/components/ControlPanel";
import { ShareLink } from "~client/components/ShareLink";

import { MenuContext } from "~client/utils/context/MenuContext";
import { socket } from "~client/utils/socketSetup";

const Host = (): JSX.Element => {
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  function handleLeave() {
    setMenu(MENU_STATE.MULTI_DETAILS);
    socket.emit(EVENTS.LOBBY_ABORT);
  }

  return (
    <S.FlexWrapper direction="column" animated>
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
