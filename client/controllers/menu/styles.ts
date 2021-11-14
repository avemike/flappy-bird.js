import styled from "styled-components";

import { CANVAS_SIZE } from "~configs/canvas";

export const MenuStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  width: ${CANVAS_SIZE.WIDTH}px;
  height: ${CANVAS_SIZE.HEIGHT}px;
  opacity: 0.5;
  z-index: 1;
  overflow: hidden;
`;

export const Title = styled.h1`
  position: fixed;
  font-size: 2em;
  left: 50%;
  transform: translateX(-50%);
`;
