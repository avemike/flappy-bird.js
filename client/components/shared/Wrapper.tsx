import styled from "styled-components";
// import { CANVAS_SIZE } from "../../../configs/canvas";

export const FlexWrapper = styled.div<{ dir: string }>`
  position: relative;
  display: flex;
  flex-direction: ${({ dir }) => dir};
  justify-content: space-around;
  align-items: center;
  height: inherit;
`;

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

// const Wrapper = styled.div<{ isActive: boolean }>`
//   transform: ${({ isActive }) =>
//     isActive ? "translateX(0)" : "translateX(-100%)"};
//   position: relative;
//   height: ${CANVAS_SIZE.HEIGHT}px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   transition: transform 0.1s ease-in-out;
// `;
