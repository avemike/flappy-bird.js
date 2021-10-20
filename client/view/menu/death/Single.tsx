import React, { useContext } from "react";

import * as S from "~client/styled";

import { MenuContext } from "~client/utils/context/MenuContext";

const Single = (): JSX.Element => {
  const { handleMulti, backToMenu } = useContext(MenuContext);

  return (
    <>
      <S.Button onClick={backToMenu}>back to menu</S.Button>
      <S.Button onClick={handleMulti}>multi</S.Button>
    </>
  );
};

export { Single };
