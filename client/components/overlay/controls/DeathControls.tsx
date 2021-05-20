import React, { useContext } from "react";

import ControlsContext from "../../../utils/ControlsContext";

function SingleControls(): JSX.Element {
  const { restartGame } = useContext(ControlsContext);

  return (
    <>
      <button onClick={restartGame}>restart</button>
      <button>multi</button>
    </>
  );
}

function MultiControls(): JSX.Element {
  const { restartGame } = useContext(ControlsContext);
  return (
    <>
      <button>find another room</button>
      <button>leaderboard</button>
      <button onClick={restartGame}>main menu</button>
      <button>...</button>
    </>
  );
}

function DeathControls(): JSX.Element {
  const {
    gameTypeHook: [gameType],
  } = useContext(ControlsContext);

  switch (gameType) {
    case "single":
      return <SingleControls></SingleControls>;
    case "multi":
      return <MultiControls></MultiControls>;
    default:
      return <></>;
  }
}

export default DeathControls;
