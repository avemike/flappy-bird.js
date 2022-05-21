import React, { useContext } from "react";
import { Back } from "~client/overlay/components/Back";
import { MenuContext } from "~client/overlay/context/MenuContext";

import * as S from "~client/styled";

import { CreateLobby } from "./CreateLobby";
import { JoinLobby } from "./JoinLobby";

function Details() {
  const { backToMenu } = useContext(MenuContext);

  return (
    <S.FlexWrapper>
      <S.Nav>
        <Back onClick={backToMenu} />
      </S.Nav>
      <S.FlexWrapper h="50%">
        <CreateLobby />
        <JoinLobby />
      </S.FlexWrapper>
    </S.FlexWrapper>
  );
}

export { Details };
