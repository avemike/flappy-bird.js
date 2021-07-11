import React, { useContext } from "react";
import CreateLink from "./CreateLink";
import JoinMenu from "./JoinMenu";
import ButtonStyled from "../../shared/ButtonStyled";

import MenuContext from "../../../utils/MenuContext";
import { GameMode, MenuState } from "../../../../configs/game";

import { FlexWrapper } from "../../shared/Wrapper";

// const Wrapper = styled.div`
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: ${CANVAS_SIZE.WIDTH}px;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   height: inherit;
// `;

function MultiDetails(): JSX.Element {
  const {
    restartGame,
    gameModeHook: [, setGameMode],
    menuStateHook: [, setMenuState],
  } = useContext(MenuContext);

  function handleBackToMenu() {
    setGameMode(GameMode.NOT_SET);
    restartGame();
    setMenuState(MenuState.MAIN);
  }

  return (
    <FlexWrapper dir={"column"}>
      {/* <InputMenu content={"create link"}></InputMenu> */}
      {/* <CreateLobby></CreateLobby> */}
      <CreateLink></CreateLink>
      <JoinMenu></JoinMenu>
      {/* <InputMenu content={"join link"}> </InputMenu> */}
      <ButtonStyled onClick={handleBackToMenu}>back to menu</ButtonStyled>
    </FlexWrapper>
  );
}

export default MultiDetails;
