import { useState } from "react";

export function useToggle(initialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  const onToggle = () => {
    setValue((value) => !value);
  };

  return { isOpen: value, onToggle };
}
