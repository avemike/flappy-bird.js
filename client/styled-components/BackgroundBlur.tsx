import styled from "styled-components";

export const BackgroundBlur = styled.div<{ active: boolean }>`
  width: 100%;
  height: 100%;

  ${({ active }) =>
    active &&
    `&::before {
    content: "";
    width: 100%;
    height: 100%;
    background: transparent;
    backdrop-filter: blur(2px);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 30;
    box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  }

  & > * {
    position: relative;
    z-index: 50;
  }`}
`;
