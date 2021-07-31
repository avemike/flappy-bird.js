import React, { FormEvent, useContext, useRef, useState } from "react";

import { MenuState } from "../../../../configs/game";
import MenuContext from "../../../utils/MenuContext";
import { socket } from "../../../utils/socketSetup";
import * as S from "../../styles";
import Back from "../nav/Back";
import Share from "./Share";

function Host(): JSX.Element {
  const [ready, setReady] = useState(false);
  const [activePlayers, setActivePlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (inputRef.current) setMaxPlayers(+inputRef.current?.value);
  }

  function toggleReady() {
    setReady((ready) => !ready);
    if (!ready) {
      setActivePlayers((activePlayers) => activePlayers + 1);
      socket.emit("ready");
    } else {
      setActivePlayers((activePlayers) => activePlayers - 1);
      socket.emit("not ready");
    }
  }

  function handleLeave() {
    setMenu(MenuState.MULTI_DETAILS);
  }

  return (
    <S.FlexWrapper dir={"column"} animated>
      <S.Nav>
        <Back onClick={handleLeave}></Back>
        <Share></Share>
      </S.Nav>
      <div>you are host</div>
      <S.ReadyCounter>
        ready: {activePlayers}/{maxPlayers}
      </S.ReadyCounter>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="max_players">max: </label>
        <input ref={inputRef} id="max_players" type="number" min="1" defaultValue={maxPlayers} />
        <button type="submit">set</button>
      </form>
      <S.Button onClick={toggleReady}>set ready</S.Button>
      <S.ButtonSuper ready={activePlayers === maxPlayers}>
        {activePlayers === maxPlayers ? "start" : `${activePlayers}/${maxPlayers} ready`}
      </S.ButtonSuper>
    </S.FlexWrapper>
  );
}

export default Host;
