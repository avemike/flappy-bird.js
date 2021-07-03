import React, { useEffect, useState } from "react";
import { socket } from "../../utils/socketSetup";

import Menu from "./Menu";

const Overlay = (): JSX.Element => {
  const [isActive, setActive] = useState(true);
  // const [deathScreen, setDeathScreen] = useState(false);
  // const gameTypeHook = useState("");

  // useEffect(() => {
  //   socket.on("game over", () => {
  //     setActive(true);
  //     // setDeathScreen(true);
  //   });

  //   return () => {
  //     socket.off("game over");
  //   };
  // }, []);

  function startGame() {
    setActive(false);
    socket.emit("start game");
  }

  function restartGame() {
    // setDeathScreen(false);
    setActive(true);
    socket.emit("restart");
  }

  const controlsPack = {
    startGame,
    restartGame,
    // isDeathScreenOn: deathScreen,
    // gameTypeHook,
  };

  // return isActive ? <Menu controls={controlsPack} /> : <></>;
  return isActive ? <Menu /> : <></>;
};

export default Overlay;
