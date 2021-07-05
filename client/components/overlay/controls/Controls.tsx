import React, { useContext } from "react";
import styled from "styled-components";

import ControlsContext from "../../../utils/ControlsContext";
import DeathControls from "./DeathControls";
import MainControls from "./MainControls";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: inherit;
`;

function Controls(): JSX.Element {
  const { isDeathScreenOn } = useContext(ControlsContext);

  return (
    <>
      {/* <Wrapper> */}
      {isDeathScreenOn ? <DeathControls></DeathControls> : <MainControls></MainControls>}
      {/* </Wrapper> */}
    </>
  );
}

export default Controls;
