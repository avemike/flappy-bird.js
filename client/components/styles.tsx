import styled from "styled-components";

import { CANVAS_SIZE } from "../../configs/canvas";

export const Button = styled.button`
  width: ${CANVAS_SIZE.WIDTH * 0.4}px;
  height: ${CANVAS_SIZE.HEIGHT * 0.1}px;
`;

export const FlexWrapper = styled.div<{ dir: string; state?: string }>`
  position: relative;
  display: flex;
  flex-direction: ${({ dir }) => dir};
  justify-content: space-around;
  align-items: center;
  height: inherit;
  width: inherit;

  .fade-appear &,
  .fade-enter & {
    opacity: 0;
    transform: translateX(-100%);
  }

  .fade-appear-active &,
  .fade-enter-active & {
    opacity: 1;
    transform: translateX(0%);
  }

  .fade-exit & {
    opacity: 1;
    transform: translateX(0%);
  }

  .fade-exit-active & {
    opacity: 0;
    transform: translateX(100%);
  }

  .fade-appear-active &,
  .fade-enter-active &,
  .fade-exit-active & {
    transition: opacity 500ms, transform 500ms;
  }
`;

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

export const Container = styled.div`
  height: inherit;
  width: inherit;
`;

export const ButtonSuper = styled(Button)<{ ready: boolean }>`
  background-color: ${({ ready }) => ready && "green"};
`;

export const ReadyCounter = styled.span``;
