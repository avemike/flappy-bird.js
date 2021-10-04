import React, { ReactElement } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

interface Props {
  key: string;
  children: React.ReactNode;
}

export const Fade = ({ key, children }: Props): ReactElement => (
  <SwitchTransition>
    <CSSTransition
      key={key}
      appear={true}
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done, false);
      }}
      classNames="fade"
    >
      {children}
    </CSSTransition>
  </SwitchTransition>
);
