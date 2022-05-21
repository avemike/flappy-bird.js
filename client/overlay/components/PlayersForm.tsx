import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface Props {
  maxPlayersHook: [number, React.Dispatch<React.SetStateAction<number>>];
}

const StyledInput = styled.input`
  border: none;
  background: transparent;
  border: 2px solid black;
  border-radius: 4px;
  padding: 2px;
`;

const PlayersForm = ({ maxPlayersHook }: Props) => {
  const [maxPlayers, setMaxPlayers] = maxPlayersHook;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxPlayers(Number(event.target.value));
  };

  return (
    <form>
      <label htmlFor="max_players">max: </label>
      <StyledInput
        value={maxPlayers}
        id="max_players"
        type="number"
        min="1"
        max="10"
        onChange={handleInputChange}
      />
    </form>
  );
};

export { PlayersForm };
