import React, { useContext } from "react";

import * as S from "~client/styled";

import { Back } from "~client/components/Back";

import { MenuContext } from "~client/utils/context/MenuContext";

import { CreateLobby } from "./CreateLobby";
import { JoinLobby } from "./JoinLobby";

function Details(): JSX.Element {
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
