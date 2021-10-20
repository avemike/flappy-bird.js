import React, { useState } from "react";

type StateRetrunValue<T> = [T, React.Dispatch<React.SetStateAction<T>>];

// function useToggle(initialValue = false): StateRetrunValue<boolean> {
function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  function toggle(): void {
    setValue((value) => !value);
  }

  return [value, toggle];
}

export { useToggle };
