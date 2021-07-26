import React from "react";
import { render } from "react-dom";

import { CANVAS_SIZE } from "../configs/canvas";
import Canvas from "./components/Canvas";
import MenuController from "./components/menu/MenuController";

const App = () => {
  return (
    <>
      <MenuController></MenuController>
      <Canvas width={CANVAS_SIZE.WIDTH} height={CANVAS_SIZE.HEIGHT}></Canvas>
    </>
  );
};

render(<App />, document.getElementById("root"));
