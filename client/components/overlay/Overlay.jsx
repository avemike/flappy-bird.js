import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CANVAS_SIZE } from "../../../configs/canvas";
import { socket } from "../../utils/socketSetup";

import Controls from "./controls/Controls";
import ControlsContext from "../../utils/ControlsContext";

const Menu = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  width: ${CANVAS_SIZE.WIDTH}px;
  height: ${CANVAS_SIZE.HEIGHT}px;
  background: tomato;
  opacity: 0.5;
  z-index: 999;
`;

const Overlay = () => {
  const [isActive, setIsActive] = useState(true);
  const [deathScreen, setDeathScreen] = useState(false);
  const gameTypeHook = useState("");

  useEffect(() => {
    socket.on("game over", () => {
      setIsActive(true);
      setDeathScreen(true);
    });

    return () => {
      socket.off("game over");
    };
  }, []);

  function startGame() {
    setIsActive(false);
    socket.emit("start game");
  }

  function restartGame() {
    setDeathScreen(false);
    setIsActive(true);
    socket.emit("restart");
  }

  const controlsPack = {
    startGame,
    restartGame,
    isDeathScreenOn: deathScreen,
    gameTypeHook,
  };

  return (
    isActive && (
      <Menu>
        <h1>flappy bird</h1>
        <ControlsContext.Provider value={controlsPack}>
          <Controls></Controls>
        </ControlsContext.Provider>
      </Menu>
    )
  );
};

export default Overlay;
