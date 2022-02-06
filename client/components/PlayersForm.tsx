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
const PlayersForm = ({ maxPlayersHook }: Props): JSX.Element => {
  const [maxPlayers, setMaxPlayers] = maxPlayersHook;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setMaxPlayers(+event.target.value);
  }

  return (
    <form>
      <label htmlFor="max_players">max: </label>
      <StyledInput
        onChange={handleInputChange}
        value={maxPlayers}
        id="max_players"
        type="number"
        min="1"
        max="10"
      />
    </form>
  );
};

export { PlayersForm };
