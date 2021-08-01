import React, { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";

import * as S from "../../styles";
import { TopButton } from "../../styles";

const LabelStyled = styled.label`
  /* font-size: small; */
`;

function Share(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <TopButton position="right" onClick={() => setOpen((open) => !open)}>
        <AiOutlineShareAlt />
      </TopButton>
      <SwitchTransition>
        <CSSTransition
          key={`${open}`}
          timeout={200}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="share-dropdown"
        >
          {open ? (
            <S.Container>
              <S.ShareDropdown>
                <S.FlexWrapper dir="column">
                  <LabelStyled htmlFor="url">share me with friend!</LabelStyled>
                  <input id="url" value="im an url" readOnly />
                </S.FlexWrapper>
              </S.ShareDropdown>
            </S.Container>
          ) : (
            <></>
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default Share;
