import React, { useContext } from "react";

import ControlsContext from "../../../utils/ControlsContext";

function MainControls(): JSX.Element {
  const {
    startGame,
    gameTypeHook: [, setGameType],
  } = useContext(ControlsContext);

  function handleClick(gameType: string) {
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
