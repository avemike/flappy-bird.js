import React, { useContext } from "react";

import ControlsContext from "../../../utils/ControlsContext";

function MainControls() {
  const {
    startGame,
    gameTypeHook: [, setGameType],
  } = useContext(ControlsContext);

  function handleClick(gameType) {
    startGame();
    setGameType(gameType);
  }

  return (
    <>
      <button onClick={() => handleClick("single")}>single</button>
      <button onClick={() => handleClick("multi")}>multi</button>
    </>
  );
}

export default MainControls;
