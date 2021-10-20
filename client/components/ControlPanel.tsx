import React, { useContext, useEffect, useState } from "react";

import * as S from "~client/styled";

import { EVENTS } from "~configs/events";
import { DEFAULT_MAX_PLAYERS, GAME_MODE } from "~configs/game";

import { MenuContext } from "~client/utils/context/MenuContext";
import { socket } from "~client/utils/socketSetup";

import { LaunchGameButton } from "./LaunchGameButton";
import { PlayersForm } from "./PlayersForm";

const ControlPanel = (): JSX.Element => {
  const [isReady, setReady] = useState(false);
  const [readyCount, setReadyCount] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(DEFAULT_MAX_PLAYERS);

  const { startGame } = useContext(MenuContext);

  useEffect(() => {
    socket.on(EVENTS.READY_COUNT, (readyCount: number) => {
      setReadyCount(readyCount);
    });

    return () => {
      socket.off(EVENTS.READY_COUNT);
    };
  }, [setReadyCount]);

  function runGame() {
    if (readyCount === maxPlayers) startGame(GAME_MODE.MULTI);
  }

  function toggleReady() {
    setReady((ready) => !ready);
    socket.emit(EVENTS.READY_ACTION, isReady ? false : true);
  }

  return (
    <>
      <S.ReadyCounter>
        ready: {readyCount}/{maxPlayers}
      </S.ReadyCounter>
      <PlayersForm maxPlayersHook={[maxPlayers, setMaxPlayers]} />
      <S.Button onClick={toggleReady}>set ready</S.Button>
      <LaunchGameButton onClick={runGame} readyCount={readyCount} maxPlayers={maxPlayers} />
    </>
  );
};

export { ControlPanel };
