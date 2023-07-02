import React, { useRef, useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import secureLocalStorage from "react-secure-storage";

import { GiHamburgerMenu } from "react-icons/gi";
import VoucherSearch from "../ProductSearch/Search";
import { useSelector } from "react-redux";
import { Index } from "../MobileModal/Index";
export const HamburgerMobile = () => {
  const user = useSelector((state) => state.user.user);
  const { colorMode, toggleColorMode } = useColorMode(
    secureLocalStorage.getItem("chakra-ui-color-mode")
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [username, setusername] = useState();
  // const btnRef = useRef();

  useEffect(() => {
    console.log("run hamburger");
  });

  return (
    <>
      <GiHamburgerMenu
        // ref={btnRef}
        onClick={() => onOpen()}
        fontSize={"1.8rem"}
        fill={colorMode == "light" ? "#153A5B" : "white"}
        display={["block", "block", "none"]}
      />
      <Drawer
        // display={["block", "block", "none"]}
        isOpen={isOpen}
        size="full"
        placement="left"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {" "}
            {/* <Image
              src={"/assets/logo.svg"}
              alt="Logo"
              width={200}
              height={100}
              
            /> */}
          </DrawerHeader>

          <DrawerBody>
            {/* <Box mt={"2rem"}>
              <VoucherSearch />
            </Box> */}
            <Index />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
