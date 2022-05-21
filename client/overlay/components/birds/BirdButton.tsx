import React from "react";
import styled from "styled-components";

import { BlueBird } from "./BlueBird";
import { GreenBird } from "./GreenBird";
import { PinkBird } from "./PinkBird";
import { YellowBird } from "./YellowBird";

export const BIRD_COLORS = {
  PINK: "pink",
  YELLOW: "yellow",
  GREEN: "green",
  BLUE: "blue",
} as const;

const BirdWrapper = styled.div<{ active: boolean; gradientColor: string }>`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  ${({ active, gradientColor }) =>
    active
      ? `
    background: ${gradientColor};
    background: radial-gradient(
      circle,
      ${gradientColor} 0%,
      ${gradientColor} 40%,
      rgba(255, 236, 51, 0) 70%,
      rgba(0, 155, 255, 0) 100%
    );
  `
      : `
    opacity: 0.75;
  `}
`;

export const BirdButton = ({
  color,
  active,
  onClick,
}: {
  color: typeof BIRD_COLORS[keyof typeof BIRD_COLORS];
  active: boolean;
  onClick: () => void;
}) => {
  const SelectedBird = {
    [BIRD_COLORS.BLUE]: <BlueBird width={24} />,
    [BIRD_COLORS.PINK]: <PinkBird width={24} />,
    [BIRD_COLORS.GREEN]: <GreenBird width={24} />,
    [BIRD_COLORS.YELLOW]: <YellowBird width={24} />,
  }[color];

  const gradientColor = {
    [BIRD_COLORS.BLUE]: "rgba(1, 194, 255, 1)",
    [BIRD_COLORS.PINK]: "rgba(227, 35, 219, 1)",
    [BIRD_COLORS.GREEN]: "rgba(111, 247, 113, 1)",
    [BIRD_COLORS.YELLOW]: "rgba(255, 255, 0, 1)",
  }[color];

  return (
    <BirdWrapper active={active} gradientColor={gradientColor} onClick={onClick}>
      {SelectedBird}
    </BirdWrapper>
  );
};
