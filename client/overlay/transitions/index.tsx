import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

interface Props {
  primary: string;
  children: CSSTransitionProps["children"];
}

export const Fade = ({ primary, children }: Props) => (
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
