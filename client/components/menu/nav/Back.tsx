import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { TopButton } from "../../styles";

interface Props {
  onClick: () => void;
}

function Back({ onClick }: Props): JSX.Element {
  return (
    <>
      <TopButton position="left" onClick={onClick}>
        <AiOutlineArrowLeft />
      </TopButton>
    </>
  );
}

export default Back;
