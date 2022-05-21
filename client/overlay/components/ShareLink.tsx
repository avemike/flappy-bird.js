import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { Fade } from "~client/overlay/transitions";

import { EVENTS } from "~configs/events";
import { Link } from "~configs/types";

import { socket } from "~client/utils/socketSetup";

import { Container, ShareDropdown, FlexWrapper, TopButton } from "../../styled";
import { useToggle } from "../hooks/useToggle";

const LabelStyled = styled.label``;

interface LinkProps {
  url: string;
}

const LinkInput = ({ url }: LinkProps) => {
  return (
    <Container>
      <ShareDropdown>
        <FlexWrapper direction="column">
          <LabelStyled htmlFor="url">paste this into input</LabelStyled>
          <input id="url" value={socket.id} readOnly />
          <LabelStyled htmlFor="url">or share this link with a friend</LabelStyled>
          <input id="url" value={url} readOnly />
        </FlexWrapper>
      </ShareDropdown>
    </Container>
  );
};

interface Props {
  children: ReactNode;
}

export const ShareLink = ({ children }: Props) => {
  const { isOpen, onToggle } = useToggle();
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

  const RenderedLink = isOpen ? <LinkInput url={url} /> : <></>;

  return (
    <div>
      <TopButton position="right" onClick={onToggle}>
        {children}
      </TopButton>
      <Fade primary={`${isOpen}`}>{RenderedLink}</Fade>
    </div>
  );
};
