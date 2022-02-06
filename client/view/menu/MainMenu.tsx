import React, { useContext } from "react";
import styled from "styled-components";

import { GAME_MODE } from "../../../configs/game";
import { ColorSelect } from "../../components/ColorSelect";
import * as S from "../../styled";
import { MenuContext } from "../../utils/context/MenuContext";

interface ControlsProps {
  text: string;
  onClick(): void;
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
    <S.FlexWrapper>
      <StyledContainer>
        <S.FlexWrapper justifyContent="space-around" alignItems="center">
          <Controls onClick={handleSingle} text="single" />
          <Controls onClick={handleMulti} text="multi" />
        </S.FlexWrapper>
        <ColorSelect />
      </StyledContainer>
    </S.FlexWrapper>
  );
}

export { MainMenu };
