import React, { useState } from "react";
import styled from "styled-components";

import { EVENTS } from "../../../configs/events";
import { BIRD_COLORS } from "../../../configs/game";
import * as S from "../../styled";
import { socket } from "../../utils/socketSetup";
import { BirdButton } from "./birds/BirdButton";

const StyledGrid = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const ChooseColorTitle = styled.h4`
  text-align: center;
`;

const ColorSelect = () => {
  const [activeColor, setActiveColor] = useState(BIRD_COLORS["YELLOW"]);

  const handleColorChange = (color: BIRD_COLORS) => {
    setActiveColor(color);
    socket.emit(EVENTS.BIRD_COLOR_CHANGE, color);
  };

  return (
    <S.FlexWrapper justifyContent="flex-end">
      <ChooseColorTitle>Choose color</ChooseColorTitle>
      <StyledGrid>
        {Object.values(BIRD_COLORS).map((color) => (
          <BirdButton
            key={color}
            color={color}
            active={activeColor === color}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </StyledGrid>
    </S.FlexWrapper>
  );
};

export { ColorSelect };
