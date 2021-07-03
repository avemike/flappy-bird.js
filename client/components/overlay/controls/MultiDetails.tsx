import React, { useContext } from "react";
import styled from "styled-components";
import InputMenu from "./InputMenu";
import ButtonStyled from "./ButtonStyled";

import MenuContext from "../../../utils/MenuContext";
import { MenuState } from "../../../../configs/game";

import { CANVAS_SIZE } from "../../../../configs/canvas";

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

function MultiDetails(): JSX.Element {
  const {
    menuStateHook: [menuState, setMenu],
  } = useContext(MenuContext);

  function handleBackToMenu() {
    setMenu(MenuState.MAIN);
  }

  return (
    <Wrapper>
      <InputMenu content={"create link"}>
        <label>share this link with friend</label>
        <input type="text"></input>
        {/* <ButtonStyled>create link</ButtonStyled> */}
      </InputMenu>
      <InputMenu content={"join link"}>
        <label>paste link to join</label>
        <input type="text"></input>
        {/* <ButtonStyled>im here</ButtonStyled> */}
      </InputMenu>
      <ButtonStyled onClick={handleBackToMenu}>go back</ButtonStyled>
    </Wrapper>
  );
}

export default MultiDetails;
