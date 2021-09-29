import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";

import { EVENTS } from "../../../configs/events";
import { GAME_MODE, MENU_STATE } from "../../../configs/game";
import { Back } from "../../components/Back";
import * as S from "../../styled";
import MenuContext from "../../utils/context/MenuContext";
import { socket } from "../../utils/socketSetup";
import { Share } from "./";

function Host(): JSX.Element {
  const [isReady, setReady] = useState(false);
  const [readyCount, setReadyCount] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(2);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    menuStateHook: [, setMenu],
    startGame,
  } = useContext(MenuContext);

  useEffect(() => {
    socket.on(EVENTS.READY_COUNT, (readyCount: number) => {
      setReadyCount(readyCount);
    });

    return () => {
      socket.off(EVENTS.READY_COUNT);
    };
  }, [setReadyCount]);

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (inputRef.current) setMaxPlayers(+inputRef.current?.value);
  }

  function toggleReady() {
    setReady((ready) => !ready);
    socket.emit(EVENTS.READY_ACTION, isReady ? false : true);
  }

  function handleLeave() {
    setMenu(MENU_STATE.MULTI_DETAILS);
    socket.emit(EVENTS.LOBBY_ABORT);
  }

  function runGame() {
    if (readyCount === maxPlayers) startGame(GAME_MODE.MULTI);
  }

  return (
    <S.FlexWrapper dir={"column"} animated>
      <S.Nav>
        <Back onClick={handleLeave} />
        <Share>
          <AiOutlineShareAlt />
        </Share>
      </S.Nav>
      <div>you are host</div>
      <S.ReadyCounter>
        ready: {readyCount}/{maxPlayers}
      </S.ReadyCounter>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="max_players">max: </label>
        <input ref={inputRef} id="max_players" type="number" min="1" max="10" defaultValue={maxPlayers} />
        <button type="submit">set</button>
      </form>
      <S.Button onClick={toggleReady}>set ready</S.Button>
      <S.ButtonSuper onClick={runGame} ready={readyCount === maxPlayers}>
        {readyCount === maxPlayers ? "start" : `${readyCount}/${maxPlayers} ready`}
      </S.ButtonSuper>
    </S.FlexWrapper>
  );
}

export default Host;
