import React, { useContext, useState } from "react";
import { Transition } from "react-transition-group";

import { MenuState, ANIMATION_DURATION as duration } from "../../../../configs/game";
import MenuContext from "../../../utils/MenuContext";
import * as S from "../../styles";
import Back from "../nav/Back";

interface Props {
  readyClick: () => void;
}

function Normal({ readyClick: handleReadyClick }: Props): JSX.Element {
  const [inProp] = useState(true);

  const {
    menuStateHook: [, setMenu],
  } = useContext(MenuContext);

  function handleLeave() {
    setMenu(MenuState.MULTI_DETAILS);
  }

  return (
    <Transition in={inProp} appear={true} timeout={duration.miliseconds}>
      {(state) => (
        <S.FlexWrapper state={state} dir={"column"}>
          <S.Nav>
            <Back onClick={handleLeave}></Back>
          </S.Nav>
          <S.Button onClick={handleReadyClick}>set ready</S.Button>
          <S.Button onClick={() => setMenu(MenuState.MULTI_DETAILS)}>leave</S.Button>
        </S.FlexWrapper>
      )}
    </Transition>
  );
}

export default Normal;
