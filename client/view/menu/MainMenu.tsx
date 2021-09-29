import React, { ChangeEvent, useContext } from "react";

import { EVENTS } from "../../../configs/events";
import { BIRD_COLORS, GAME_MODE, MENU_STATE } from "../../../configs/game";
import * as S from "../../styled";
import MenuContext from "../../utils/context/MenuContext";
import { socket } from "../../utils/socketSetup";

function MainMenu(): JSX.Element {
  const {
    startGame,
    menuStateHook: [, setMenuState],
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  function handleSingle() {
    setGameMode(GAME_MODE.SINGLE);
    startGame(GAME_MODE.SINGLE);
  }

  function handleMulti() {
    setGameMode(GAME_MODE.MULTI);
    setMenuState(MENU_STATE.MULTI_DETAILS);

    socket.emit(EVENTS.MULTI_JOIN);
  }

  interface ControlsProps {
    text: string;
    onClick(): void;
  }

  function Controls({ text, onClick }: ControlsProps): JSX.Element {
    return <S.Button onClick={onClick}>{text}</S.Button>;
  }

  function handleColorChange(event: ChangeEvent<HTMLSelectElement>) {
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
