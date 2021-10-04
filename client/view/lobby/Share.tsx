import React, { ReactNode, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";

import * as S from "../../styled";
import { socket } from "../../utils/socketSetup";

const LabelStyled = styled.label``;

interface Props {
  children: ReactNode;
}

function Share({ children }: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <S.TopButton position="right" onClick={() => setOpen((open) => !open)}>
        {children}
      </S.TopButton>
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
                <S.FlexWrapper direction="column">
                  <LabelStyled htmlFor="url">{socket.id}</LabelStyled>
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
