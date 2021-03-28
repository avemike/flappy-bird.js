import React from "react";
import ReactDOM from "react-dom";
import { Canvas } from "./components/Canvas";
import { CANVAS_SIZE } from "../configs/canvas"

const App = () => {
  const canvasWidth = CANVAS_SIZE.WIDTH;
  const canvasHeight = CANVAS_SIZE.HEIGHT;
  return (
    <>
      <Canvas width={canvasWidth} height={canvasHeight}></Canvas>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
