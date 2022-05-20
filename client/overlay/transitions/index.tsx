import React, { ReactElement } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

interface Props {
  primary: string;
  children: React.ReactNode;
}

export const Fade = ({ primary, children }: Props): ReactElement => (
  <SwitchTransition>
    <CSSTransition
      key={primary}
      timeout={1000}
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
