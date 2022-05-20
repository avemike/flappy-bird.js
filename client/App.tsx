import React, { useEffect } from "react";
import { render } from "react-dom";

import { Canvas } from "~client/Canvas";
import { Global } from "~client/styled";

import { CANVAS_SIZE } from "~configs/canvas";
import { EVENTS } from "~configs/events";

import { socket } from "~client/utils/socketSetup";

import { Overlay } from "./overlay/Overlay";

// TODO limit players amount on server

const App = () => {
  useEffect(() => {
    socket.emit(EVENTS.DOM_LOADED, CANVAS_SIZE);
  }, []);

  return (
    <React.StrictMode>
      <Global />
      <Overlay />
      <Canvas width={CANVAS_SIZE.WIDTH} height={CANVAS_SIZE.HEIGHT} />
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
