import React, { useContext } from "react";

import DeathControls from "./DeathControls";
import MainControls from "./MainControls";
import ControlsContext from "../../../utils/ControlsContext";

function Controls(): JSX.Element {
  const { isDeathScreenOn } = useContext(ControlsContext);

  return !isDeathScreenOn ? (
    <MainControls></MainControls>
  ) : (
    <DeathControls></DeathControls>
  );
}

export default Controls;
