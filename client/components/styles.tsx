import styled from "styled-components";

import { CANVAS_SIZE } from "../../configs/canvas";
import { ANIMATION_DURATION } from "../../configs/game";

export const Button = styled.button`
  width: ${CANVAS_SIZE.WIDTH * 0.4}px;
  height: ${CANVAS_SIZE.HEIGHT * 0.1}px;
`;

export const FlexWrapper = styled.div<{ dir: string; state?: string }>`
  transform: translateX(${({ state }) => (state === "entering" || state === "entered" ? 0 : 400)}px);
  transition: transform ${ANIMATION_DURATION.seconds}s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: ${({ dir }) => dir};
  justify-content: space-around;
  align-items: center;
  height: inherit;
`;

// const Wrapper = styled.div<{ state: string }>`
//   transform: translateX(${({ state }) => (state === "entering" || state === "entered" ? 0 : -400)}px);
//   transition: transform ${duration.seconds}s ease-in-out;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   height: ${CANVAS_SIZE.HEIGHT}px;
// `;

export const TopButton = styled.button<{ position: "left" | "right" }>`
  margin: ${({ position }) => (position === "left" && `5px 0 5px 5px`) || (position === "right" && `5px 5px 5px 0`)};
  padding: 5px 10px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0%;
  width: 100%;
`;
