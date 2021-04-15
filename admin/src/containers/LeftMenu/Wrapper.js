/**
 *
 * Wrapper
 *
 */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import WrapperStyled from "./WrapperStyles";
import CloseBtn from "./CloseBtn";
import { OpenMenu, CloseMenu } from "./LeftMenuControls";

function Wrapper({ children }) {
  const location = useLocation();
  const [isSideBarOpen, openSideBar] = useState(false);
  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedRight: () => openSideBar(true),
  });

  useEffect(() => {
    openSideBar(false);
  }, [location]);

  return (
    <>
      {isSideBarOpen ? (
        <CloseMenu onClick={() => openSideBar(false)} />
      ) : (
        <OpenMenu {...handlers} />
      )}
      <WrapperStyled isOpen={isSideBarOpen}>
        <CloseBtn
          active={isSideBarOpen}
          onClick={() => openSideBar(!isSideBarOpen)}
        >
          <div></div>
        </CloseBtn>
        {children}
      </WrapperStyled>
    </>
  );
}

export default Wrapper;
