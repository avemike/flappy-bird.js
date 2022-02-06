import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styled from "styled-components";

import { TopButton } from "../styled";

interface Props {
  onClick: () => void;
}

const WhiteArrow = styled(AiOutlineArrowLeft)`
  fill: white;
  font-size: 18px;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  z-index: 40;
`;
const BlackArrow = styled(AiOutlineArrowLeft)`
  fill: black;
  font-size: 20px;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  z-index: 30;
`;

function Back({ onClick }: Props): JSX.Element {
  return (
    <TopButton position="left" onClick={onClick}>
      <WhiteArrow />
      <BlackArrow />
    </TopButton>
  );
}

export { Back };
