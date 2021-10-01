import React, { useContext } from "react";

import { Back } from "../../../components/Back";
import * as S from "../../../styled";
import MenuContext from "../../../utils/context/MenuContext";
import CreateLink from "./CreateLobby";
import JoinMenu from "./JoinLobby";

function Details(): JSX.Element {
  const { backToMenu } = useContext(MenuContext);

  return (
    <S.FlexWrapper dir={"column"} animated>
      <S.Nav>
        <Back onClick={backToMenu} />
      </S.Nav>
      <CreateLink />
      <JoinMenu />
    </S.FlexWrapper>
  );
}

export default Details;
