import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import ButtonStyled from "../../shared/ButtonStyled";

interface Props {
  children: ReactNode;
  content: string;
}

const FormStyled = styled.form`
  position: absolute;
  transform: translate(0, 50%);
`;

const InputMenu = ({ children, content }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen((open) => !open);
  }

  return (
    <div>
      <ButtonStyled onClick={handleClick}>{content}</ButtonStyled>
      <FormStyled as="div">
        <label>share this link with friend</label>
        {/* <input type="text">{link}</input> */}
      </FormStyled>
      {open && children}
    </div>
  );
};

export default InputMenu;
