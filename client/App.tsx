import React from "react";
import { render } from "react-dom";

import { CANVAS_SIZE } from "../configs/canvas";

import Canvas from "./components/Canvas";
// import Overlay from "./components/overlay/Overlay";
import Menu from "./components/overlay/Menu";

const App = () => {
  return (
    <>
      {/* <Overlay></Overlay> */}
      <Menu></Menu>
      <Canvas width={CANVAS_SIZE.WIDTH} height={CANVAS_SIZE.HEIGHT}></Canvas>
    </>
  );
};

render(<App />, document.getElementById("root"));
