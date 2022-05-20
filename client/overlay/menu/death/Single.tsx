import React, { useContext } from "react";
import { MenuContext } from "~client/overlay/context/MenuContext";

import * as S from "~client/styled";

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
