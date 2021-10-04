import React, { useEffect } from "react";
import { render } from "react-dom";

import { CANVAS_SIZE } from "../configs/canvas";
import { EVENTS } from "../configs/events";
import MenuController from "./controllers/MenuController";
import { Global } from "./styled";
import { socket } from "./utils/socketSetup";
import Canvas from "./view/Canvas";

const App = () => {
  useEffect(() => {
    socket.emit(EVENTS.DOM_LOADED, CANVAS_SIZE);
  }, []);

  return (
    <>
      <Global />
      <MenuController />
      <Canvas width={CANVAS_SIZE.WIDTH} height={CANVAS_SIZE.HEIGHT} />
    </>
  );
};

render(<App />, document.getElementById("root"));
