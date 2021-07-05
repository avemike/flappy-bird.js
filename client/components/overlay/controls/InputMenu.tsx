import React, { ReactNode, useState } from "react";

import ButtonStyled from "./ButtonStyled";

interface Props {
  children: ReactNode;
  content: string;
}

const InputMenu = ({ children, content }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen((open) => !open);
  }

  return (
    <>
      <ButtonStyled onClick={handleClick}>{content}</ButtonStyled>
      {open && children}
    </>
  );
};
export default InputMenu;
