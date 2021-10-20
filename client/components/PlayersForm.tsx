import React, { ChangeEvent, FormEvent } from "react";

interface Props {
  maxPlayersHook: [number, React.Dispatch<React.SetStateAction<number>>];
}

const PlayersForm = ({ maxPlayersHook }: Props): JSX.Element => {
  const [maxPlayers, setMaxPlayers] = maxPlayersHook;

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setMaxPlayers(+event.target.value);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="max_players">max: </label>
      <input
        onChange={handleInputChange}
        value={maxPlayers}
        id="max_players"
        type="number"
        min="1"
        max="10"
      />
      <button type="submit">set</button>
    </form>
  );
};

export { PlayersForm };
