/**
 *
 * Wrapper
 *
 */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import WrapperStyled from "./WrapperStyles";
import CloseBtn from "./CloseBtn";

function Wrapper({ children }) {
  const location = useLocation();
  const [isSideBarOpen, openSideBar] = useState(false);

  useEffect(() => {
    openSideBar(false);
  }, [location]);

  return (
    <>
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
