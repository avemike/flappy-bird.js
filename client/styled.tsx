import styled, { createGlobalStyle, css } from "styled-components";

import { CANVAS_SIZE } from "~configs/canvas";

const FadeAnimation = css`
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

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  
    font-family: 'Retro';
    color: white;
    text-shadow: 2px 2px 0 black;
  }
          

  html,
  body {
    height: 100%;
    width: 100%;
    background-color: black;
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

  ${FadeAnimation}
`;

export const Button = styled.button<{ sm?: boolean }>`
  width: ${({ sm }) => (sm ? CANVAS_SIZE.WIDTH * 0.25 : CANVAS_SIZE.WIDTH * 0.4)}px;
  height: ${({ sm }) => (sm ? CANVAS_SIZE.HEIGHT * 0.07 : CANVAS_SIZE.HEIGHT * 0.1)}px;
  cursor: pointer;
  background: #989898;
  border: 2px solid #000;
  box-shadow: 2px 2px 0 0 #111;
`;

export const ExtendedButton = styled.button`
  min-width: ${CANVAS_SIZE.WIDTH * 0.4}px;
  height: ${CANVAS_SIZE.HEIGHT * 0.1}px;
  cursor: pointer;
  background: #989898;
  border: 2px solid #000;
  box-shadow: 2px 2px 0 0 #111;
`;

export const FlexWrapper = styled.div<{
  direction?: string;
  dontInheritSize?: boolean;
  animated?: boolean;
  alignItems?: string;
  justifyContent?: string;
  w?: string;
  h?: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "column"};
  justify-content: ${({ justifyContent }) => justifyContent ?? "space-around"};
  align-items: ${({ alignItems }) => alignItems ?? "center"};
  height: inherit;
  width: inherit;

  ${({ dontInheritSize }) =>
    dontInheritSize &&
    `
      height: unset;
      width: unset;
    `}

  ${({ animated }) => animated && `${FadeAnimation}`}
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
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

  ${FadeAnimation}
`;

export const TopButton = styled.button<{ position: "left" | "right" }>`
  margin: ${({ position }) =>
    (position === "left" && `5px 0 5px 5px`) || (position === "right" && `5px 5px 5px 0`)};
  padding: 5px 10px;
  background: transparent;
  border: none;
  position: relative;
  cursor: pointer;
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
