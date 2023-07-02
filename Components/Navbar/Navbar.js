import React, { useMemo, useEffect, useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

import DesktopNavbar from "../DeskTopNavbar/DesktopNavbar";
import { MobileNavbar } from "../MobileNavbar/MobileNavbar";
const Navbar = () => {
  const isDesktop = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });

  useEffect(() => {
    console.log("run middle navbar");
  }, []);

  return (
    <React.Fragment>
      {isDesktop ? <MobileNavbar /> : <DesktopNavbar />}
    </React.Fragment>
  );
};

export default Navbar;
