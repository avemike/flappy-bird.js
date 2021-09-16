import React, { useEffect } from "react";
import { render } from "react-dom";

import { CANVAS_SIZE } from "../configs/canvas";
import MenuController from "./controllers/MenuController";
import { socket } from "./utils/socketSetup";
import Canvas from "./view/Canvas";

const App = () => {
  return (
    <>
      <MenuController></MenuController>
      <Canvas width={CANVAS_SIZE.WIDTH} height={CANVAS_SIZE.HEIGHT}></Canvas>
    </>
  );
};

render(<App />, document.getElementById("root"));
