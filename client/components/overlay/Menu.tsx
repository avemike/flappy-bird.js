import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { CANVAS_SIZE } from "../../../configs/canvas";

import Controls from "./controls/Controls";
import ControlsContext from "../../utils/ControlsContext";

const MenuStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  width: ${CANVAS_SIZE.WIDTH}px;
  height: ${CANVAS_SIZE.HEIGHT}px;
  background: tomato;
  opacity: 0.5;
  z-index: 999;
`;

interface MenuProps {
  controls: ControlsPack;
}

const Menu: FC<MenuProps> = ({ controls }) => (
  <MenuStyled>
    <h1>flappy bird</h1>
    <ControlsContext.Provider value={controls}>
      <Controls></Controls>
    </ControlsContext.Provider>
  </MenuStyled>
);

export default Menu;
