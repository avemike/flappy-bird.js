import React, { useEffect } from "react";
import { render } from "react-dom";

import { Global } from "~client/styled";

import { CANVAS_SIZE } from "~configs/canvas";
import { EVENTS } from "~configs/events";

import { socket } from "~client/utils/socketSetup";

import { Canvas } from "~client/view/Canvas";

import { MenuController } from "./controllers/menu/MenuController";

// TODO limit players amount on server

const App = () => {
  useEffect(() => {
    socket.emit(EVENTS.DOM_LOADED, CANVAS_SIZE);
  }, []);

  return (
    <React.StrictMode>
      <Global />
      <MenuController />
      <Canvas width={CANVAS_SIZE.WIDTH} height={CANVAS_SIZE.HEIGHT} />
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
