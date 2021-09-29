import styled, { createGlobalStyle, css } from "styled-components";

import { CANVAS_SIZE } from "../configs/canvas";

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }


  canvas {
    display: block;
    border: 1px solid black;
    background-color: lightskyblue;
    -webkit-transform: scale(1.5);
            transform: scale(1.5);
  }
`;

export const Button = styled.button`
  width: ${CANVAS_SIZE.WIDTH * 0.4}px;
  height: ${CANVAS_SIZE.HEIGHT * 0.1}px;
`;

export const ColorSelect = styled(Button)``;

const menuAnimation = css`
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

const shareAnimation = css`
  .share-dropdown-appear &,
  .share-dropdown-enter & {
    opacity: 0;
    transform: translateX(-50%);
  }

  .share-dropdown-appear-active &,
  .share-dropdown-enter-active & {
    opacity: 1;
    transform: translateX(0%);
  }

  .share-dropdown-exit & {
    opacity: 1;
    transform: translateX(0%);
  }

  .share-dropdown-exit-active & {
    opacity: 0;
    transform: translateX(50%);
  }

  .share-dropdown-appear-active &,
  .share-dropdown-enter-active &,
  .share-dropdown-exit-active & {
    transition: opacity 200ms, transform 200ms;
  }
`;

export const FlexWrapper = styled.div<{ dir: string; animated?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: ${({ dir }) => dir};
  justify-content: space-around;
  align-items: center;
  height: inherit;
  width: inherit;

  ${({ animated }) => animated && `${menuAnimation}`}
`;

export const ShareDropdown = styled.span`
  display: inline-block;
  height: 4.5em;
  width: 10em;
  background-color: khaki;
  border-radius: 10px;
  position: absolute;
  top: 100%;
  right: 1%;

  ${shareAnimation}
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
