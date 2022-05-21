import React, { useContext } from "react";
import styled from "styled-components";

import { GAME_MODE } from "../../../configs/game";
import { MenuContext } from "../../overlay/context/MenuContext";
import * as S from "../../styled";
import { ColorSelect } from "../components/ColorSelect";

interface ControlsProps {
  text: string;
  onClick();
}

const StyledContainer = styled.div`
  height: 100%;
  width: 75%;
  padding: 10% 10% 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
`;

function MainMenu() {
  const {
    startGame,
    handleMulti,
    gameModeHook: [, setGameMode],
  } = useContext(MenuContext);

  function handleSingle() {
    setGameMode(GAME_MODE.SINGLE);
    startGame(GAME_MODE.SINGLE);
  }

  function Controls({ text, onClick }: ControlsProps) {
    return <S.Button onClick={onClick}>{text}</S.Button>;
  }

  return (
    <S.FlexWrapper>
      <StyledContainer>
        <S.FlexWrapper justifyContent="space-around" alignItems="center">
          <Controls text="single" onClick={handleSingle} />
          <Controls text="multi" onClick={handleMulti} />
        </S.FlexWrapper>
        <ColorSelect />
      </StyledContainer>
    </S.FlexWrapper>
  );
}

export { MainMenu };
