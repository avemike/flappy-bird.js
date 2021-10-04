import React, { MouseEvent } from "react";
import styled from "styled-components";

import { EVENTS } from "../../configs/events";
import { BIRD_COLORS } from "../../configs/game";
import * as S from "../styled";
import { socket } from "../utils/socketSetup";

function lower(arg: string): string {
  return arg.toLowerCase();
}

function handleColorChange(event: MouseEvent<HTMLButtonElement>): void {
  socket.emit(EVENTS.BIRD_COLOR_CHANGE, event.currentTarget.value);
}

const Color = styled.button<{ color: string }>`
  border: 1px solid black;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const FlexItem = styled.div`
  padding: 0 0.2em 0 0.2em;
`;

export default function ColorSelect(): JSX.Element {
  return (
    <S.FlexWrapper direction="row" dontInheritSize>
      {Object.keys(BIRD_COLORS)
        .filter((x) => !(parseInt(x) >= 0))
        .map((color) => (
          <FlexItem key={`key-${color}`}>
            <Color value={lower(color)} color={lower(color)} onClick={handleColorChange}>
              &#8203;
            </Color>
          </FlexItem>
        ))}
    </S.FlexWrapper>
  );
}
