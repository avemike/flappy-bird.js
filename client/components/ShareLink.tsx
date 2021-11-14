import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

import { EVENTS } from "~configs/events";
import { Link } from "~configs/types";

import { useToggle } from "~client/hooks/useToggle";

import { socket } from "~client/utils/socketSetup";
import { Fade } from "~client/utils/transitions";

import * as S from "../styled";

const LabelStyled = styled.label``;

interface LinkProps {
  url: string;
}

const LinkInput = ({ url }: LinkProps): JSX.Element => {
  return (
    <S.Container>
      <S.ShareDropdown>
        <S.FlexWrapper direction="column">
          <LabelStyled htmlFor="url">paste this into input</LabelStyled>
          <input id="url" value={socket.id} readOnly />
          <LabelStyled htmlFor="url">or share this link with a friend</LabelStyled>
          <input id="url" value={url} readOnly />
        </S.FlexWrapper>
      </S.ShareDropdown>
    </S.Container>
  );
};

interface Props {
  children: ReactNode;
}

const ShareLink = ({ children }: Props): JSX.Element => {
  const [isOpen, toggleOpen] = useToggle();
  const [url, setUrl] = useState("");

  useEffect(() => {
    socket.emit(EVENTS.LINK_REQ);
    socket.on(EVENTS.LINK_RES, (url: Link) => {
      setUrl(url);
    });

    // TODO add link type
    return () => {
      socket.off(EVENTS.LINK_RES);
    };
  }, []);

  const renderedLink = isOpen ? <LinkInput url={url} /> : <></>;

  return (
    <div>
      <S.TopButton position="right" onClick={toggleOpen}>
        {children}
      </S.TopButton>
      <Fade primary={`${isOpen}`}>{renderedLink}</Fade>
    </div>
  );
};

export { ShareLink };
