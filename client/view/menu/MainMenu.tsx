import React, { ChangeEvent, useContext } from "react";

import { EVENTS } from "../../../configs/events";
import { BIRD_COLORS, GAME_MODE, MENU_STATE } from "../../../configs/game";
import * as S from "../../styled";
import MenuContext from "../../utils/context/MenuContext";
import { socket } from "../../utils/socketSetup";

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

  function handleColorChange(event: ChangeEvent<HTMLSelectElement>): void {
    socket.emit(EVENTS.BIRD_COLOR_CHANGE, event.target.value);
  }

  function BirdColorSelect(): JSX.Element {
    function lower(arg: string): string {
      return arg.toLowerCase();
    }

    return (
      <S.ColorSelect as="select" onChange={handleColorChange} defaultValue="yellow">
        {Object.keys(BIRD_COLORS)
          .filter((x) => !(parseInt(x) >= 0))
          .map((color) => (
            <option key={`key-${color}`} value={lower(color)}>
              {lower(color)}
            </option>
          ))}
      </S.ColorSelect>
    );
  }

  return (
    <S.FlexWrapper dir={"column"} animated>
      <Controls onClick={handleSingle} text={"single"} />
      <Controls onClick={handleMulti} text={"multi"} />
      <BirdColorSelect />
    </S.FlexWrapper>
  );
}

export default MainMenu;
