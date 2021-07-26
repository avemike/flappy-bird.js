import React, { FormEvent, useContext, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";

import { MenuState, ANIMATION_DURATION as duration } from "../../../../configs/game";
import MenuContext from "../../../utils/MenuContext";
import { socket } from "../../../utils/socketSetup";
import * as S from "../../styles";
import Back from "../nav/Back";
import Invite from "./Invite";

const ReadyCounter = styled.span``;

const ButtonSuper = styled(S.Button)<{ ready: boolean }>`
  background-color: ${({ ready }) => ready && "green"};
`;

function Host(): JSX.Element {
  const [inProp, setInProp] = useState(true);
  const [ready, setReady] = useState(false);
  const [activePlayers, setActivePlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(1);
  // const [url, setUrl] = useState("");
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
    setInProp(false);
    setTimeout(() => {
      setMenu(MenuState.MULTI_DETAILS);
    }, duration.miliseconds);
  }

  return (
    <Transition in={inProp} appear={true} timeout={duration.miliseconds}>
      {(state) => (
        <S.FlexWrapper state={state} dir={"column"}>
          <S.Nav>
            <Back onClick={handleLeave}></Back>
            <Invite></Invite>
          </S.Nav>
          <div>you are host</div>
          <ReadyCounter>
            ready: {activePlayers}/{maxPlayers}
          </ReadyCounter>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="max_players">max: </label>
            <input ref={inputRef} id="max_players" type="number" min="1" defaultValue={maxPlayers} />
            <button type="submit">set</button>
          </form>
          <S.Button onClick={toggleReady}>set ready</S.Button>
          <ButtonSuper ready={activePlayers === maxPlayers}>
            {activePlayers === maxPlayers ? "start" : `${activePlayers}/${maxPlayers} ready`}
          </ButtonSuper>
        </S.FlexWrapper>
      )}
    </Transition>
  );
}

export default Host;
