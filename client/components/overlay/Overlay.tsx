import React, { FC, useEffect, useState } from "react";
import { socket } from "../../utils/socketSetup";

import Menu from "./Menu";

const Overlay: FC = () => {
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

  return isActive ? <Menu controls={controlsPack}></Menu> : null;
};

export default Overlay;
