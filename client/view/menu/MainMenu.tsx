import React, { ChangeEvent, useContext } from "react";

import { EVENTS } from "../../../configs/events";
import { GAME_MODE } from "../../../configs/game";
import ColorSelect from "../../components/ColorSelect";
import * as S from "../../styled";
import MenuContext from "../../utils/context/MenuContext";

interface ControlsProps {
  text: string;
  onClick(): void;
}

function MainMenu(): JSX.Element {
  const {
    startGame,
    handleMulti,
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  function handleSingle(): void {
    setGameMode(GAME_MODE.SINGLE);
    startGame(GAME_MODE.SINGLE);
  }

  function Controls({ text, onClick }: ControlsProps): JSX.Element {
    return <S.Button onClick={onClick}>{text}</S.Button>;
  }

  return (
    <S.FlexWrapper direction="column" animated>
      <Controls onClick={handleSingle} text={"single"} />
      <Controls onClick={handleMulti} text={"multi"} />
      <ColorSelect />
    </S.FlexWrapper>
  );
}

export default MainMenu;
