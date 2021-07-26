import React, { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import styled from "styled-components";

import { TopButton } from "../../styles";

const LabelStyled = styled.label`
  font-size: small;
  color: white;
`;

function Invite(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open && (
        <span>
          <LabelStyled htmlFor="url">nd</LabelStyled>
          <input id="url" value="im an url" readOnly />
        </span>
      )}
      <TopButton position="right" onClick={() => setOpen((open) => !open)}>
        <AiOutlineShareAlt />
      </TopButton>
    </div>
  );
}

export default Invite;
