import React, { useContext } from "react";

import { GAME_MODE } from "../../../../configs/game";
import { Back } from "../../../components/Back";
import * as S from "../../../styled";
import MenuContext from "../../../utils/context/MenuContext";
import CreateLink from "./CreateLobby";
import JoinMenu from "./JoinLobby";

function Details(): JSX.Element {
  const {
    restartGame,
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  function handleBackToMenu() {
    setGameMode(GAME_MODE.NOT_SET);
    restartGame();
  }

  return (
    <S.FlexWrapper dir={"column"} animated>
      <S.Nav>
        <Back onClick={handleBackToMenu} />
      </S.Nav>
      <CreateLink />
      <JoinMenu />
    </S.FlexWrapper>
  );
}

export default Details;
