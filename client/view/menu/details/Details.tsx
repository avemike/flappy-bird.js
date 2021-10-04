import React, { useContext } from "react";

import { Back } from "../../../components/Back";
import * as S from "../../../styled";
import MenuContext from "../../../utils/context/MenuContext";
import CreateLink from "./CreateLobby";
import JoinLobby from "./JoinLobby";

function Details(): JSX.Element {
  const { backToMenu } = useContext(MenuContext);

  return (
    <S.FlexWrapper direction={"column"} animated>
      <S.Nav>
        <Back onClick={backToMenu} />
      </S.Nav>
      <CreateLink />
      <JoinLobby />
    </S.FlexWrapper>
  );
}

export default Details;
