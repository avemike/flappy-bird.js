import React, { useContext, useState } from "react";

import { MENU_STATE } from "../../../../configs/game";
import MenuContext from "../../../utils/MenuContext";
import * as S from "../../styles";
import Back from "../nav/Back";

interface Props {
  readyClick: () => void;
}

function Normal({ readyClick: handleReadyClick }: Props): JSX.Element {
  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  function handleLeave() {
    setMenu(MENU_STATE.MULTI_DETAILS);
  }

  return (
    <S.FlexWrapper dir={"column"} animated>
      <S.Nav>
        <Back onClick={handleLeave}></Back>
      </S.Nav>
      <S.Button onClick={handleReadyClick}>set ready</S.Button>
      <S.Button onClick={() => setMenu(MENU_STATE.MULTI_DETAILS)}>leave</S.Button>
    </S.FlexWrapper>
  );
}

export default Normal;
