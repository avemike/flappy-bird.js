import React, { useContext } from "react";
import styled from "styled-components";

import ButtonStyled from "./ButtonStyled";

import MenuContext from "../../../utils/MenuContext";
import { GameMode } from "../../../../configs/game";
import { CANVAS_SIZE } from "../../../../configs/canvas";

function SingleControls(): JSX.Element {
  const { restartGame } = useContext(MenuContext);

  return (
    <>
      <ButtonStyled onClick={restartGame}>restart</ButtonStyled>
      <ButtonStyled>multi</ButtonStyled>
    </>
  );
}

function MultiControls(): JSX.Element {
  const { restartGame } = useContext(MenuContext);
  return (
    <>
      <ButtonStyled>go to single</ButtonStyled>
      <ButtonStyled>create new link</ButtonStyled>
      <ButtonStyled onClick={restartGame}>main menu</ButtonStyled>
    </>
  );
}

function switchRender(gameMode: GameMode): JSX.Element {
  switch (gameMode) {
    case GameMode.SINGLE:
      return <SingleControls></SingleControls>;
    case GameMode.MULTI:
      return <MultiControls></MultiControls>;
    default:
      return <></>;
  }
}

const Wrapper = styled.div`
  /* position: absolute; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${CANVAS_SIZE.WIDTH}px;
  /* height: ${CANVAS_SIZE.HEIGHT}px; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: inherit;
`;

function DeathControls(): JSX.Element {
  const {
    gameModeHook: [gameMode],
  } = useContext(MenuContext);

  return <Wrapper>{switchRender(gameMode)}</Wrapper>;

  // switch (gameMode) {
  //   case GameMode.SINGLE:
  //     return <SingleControls></SingleControls>;
  //   case GameMode.MULTI:
  //     return <MultiControls></MultiControls>;
  //   default:
  //     return <></>;
  // }
}

export default DeathControls;
