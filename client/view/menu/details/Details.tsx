import React, { useContext } from "react";

import * as S from "~client/styled";

import { Back } from "~client/components/Back";

import { MenuContext } from "~client/utils/context/MenuContext";

import { CreateLobby } from "./CreateLobby";
import { JoinLobby } from "./JoinLobby";

function Details(): JSX.Element {
  const { backToMenu } = useContext(MenuContext);

  return (
    <S.FlexWrapper direction={"column"} animated>
      <S.Nav>
        <Back onClick={backToMenu} />
      </S.Nav>
      <CreateLobby />
      <JoinLobby />
    </S.FlexWrapper>
  );
}

export { Details };
