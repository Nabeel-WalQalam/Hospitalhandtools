import {
  Box,
  useDisclosure,
  useColorMode,
  Flex,
  Tooltip,
  Text,
  Heading,
  Center,
  Button,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NavList from "../Navbar/NavList";
import { motion } from "framer-motion";
import { NavbarCat } from "../Navbar/NavbarCat";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { useSelector } from "react-redux";
import Link from "next/link";

const Index = () => {
  const { onOpen, onClose, isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const cart = useSelector((state) => state.cart.cart);
  const [subTotal, setsubTotal] = useState(0);

  const isDesktop = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += 1;
    });
    return total;
  };

  useEffect(() => {
    if (cart.length) {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        let stotal = cart[i].price * cart[i].quantity;
        total += stotal;
      }
      setsubTotal(total);
    } else {
      setsubTotal(0);
    }
  }, [cart]);
  return (
    <>
      {!isDesktop && (
        <Box
          pos={"sticky"}
          top={"-1px"}
          bg={colorMode === "light" ? "white" : "#153A5B"}
          zIndex={"999"}
          shadow={"base"}
          // border={colorMode == "dark" ? "1px" : "none"}
          // border={"1px"}
          height={"100%"}
        >
          <Flex
            justify={"space-around"}
            // justify={["right", "right", "space-between", "space-between"]}
          >
            <Flex justify={"center"} gap={"2rem"} align={"center"}>
              <Box className="dropdown" height={"100%"}>
                <Button
                  className="dropbtn"
                  variant={"unstyled"}
                  pos={"relative"}
                  // style={{ fontWeight: "bold" }}
                  // onClick={() => setIsOpen(!isOpen)}
                  fontWeight={"semibold"}
                  // color={colorMode === "light" ? "#153A5B" : "white"}
                  // fontSize={"0.9rem"}
                  borderRadius={"none"}
                  color={colorMode === "light" ? "white" : "white"}
                  bg={"#153A5B"}
                  height={"100%"}
                  px={"1rem"}
                  py="0.5rem"
                  // color={"white"}
                >
                  SHOP BY CATEGORY
                </Button>
                <Box
                  // id="subMenu"
                  height={"100%"}
                  className="dropdown-content"
                  fontSize={"1rem"}
                  color={"black"}
                >
                  <NavList isOpen={isOpen} onToggle={onToggle} />
                </Box>
              </Box>
              <Box>
                <Link href={"/About"}>
                  <Button
                    variant={"unstyled"}
                    style={{ fontWeight: "bold" }}
                    // onClick={() => setIsOpen(!isOpen)}
                    fontWeight={"bold"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    fontSize={"0.9rem"}
                    _hover={{ textDecor: "underline" }}
                  >
                    ABOUT
                  </Button>
                </Link>
              </Box>
              <Box>
                <Link href={"/Contact"}>
                  <Button
                    variant={"unstyled"}
                    // onClick={() => setIsOpen(!isOpen)}
                    fontWeight={"bold"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    fontSize={"0.9rem"}
                    _hover={{ textDecor: "underline" }}
                  >
                    CONTACT
                  </Button>
                </Link>
              </Box>
              <Box>
                <Link href={"/Blogs"}>
                  <Button
                    variant={"unstyled"}
                    // style={{ fontWeight: "bold" }}
                    // onClick={() => setIsOpen(!isOpen)}
                    fontWeight={"bold"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    fontSize={"0.9rem"}
                    _hover={{ textDecor: "underline" }}
                  >
                    BLOG
                  </Button>
                </Link>
              </Box>
            </Flex>

            <Flex
              // mr={["0rem", "0rem", "2rem", "5rem"]}
              // bg={"#153A5B"}
              // color={"white"}
              align={"center"}
              // border={"1px"}
              gap={"1rem"}
              // height={"100%"}
              // px="1rem"
            >
              <Box>
                <Tooltip label="color mode" fontSize="md">
                  <Box
                    // as={motion.div}
                    // whileHover={{ scale: 1.1 }}
                    // // whileTap={{ scale: 0.9 }}
                    // transition={{
                    //   type: "spring",
                    //   stiffness: 300,
                    //   damping: 25,
                    // }}
                    style={{ color: "#153A5B", fontWeight: "bold" }}
                    cursor={"pointer"}
                    onClick={toggleColorMode}
                  >
                    {colorMode === "light" ? (
                      <MdDarkMode fontSize={"1.4rem"} />
                    ) : (
                      <IoMdSunny fontSize={"1.4rem"} fill="white" />
                    )}
                  </Box>
                </Tooltip>
              </Box>

              <Divider
                orientation="vertical"
                border={"1px"}
                borderColor={"gray"}
                // width={"100%"}
                // height={"30px"}
              />

              <Flex height={"100%"} align={"center"} gap={"1rem"}>
                <Box>
                  <Text color={colorMode == "light" ? "gray.800" : "white"}>
                    {getTotalQuantity() || 0} item(s) - $
                    {subTotal.toFixed(2) || 0}
                  </Text>
                </Box>
                <Box
                  border={"1px"}
                  borderColor={"#153A5B"}
                  height={"100%"}
                  // mx={"1rem"}
                  bg={"#153A5B"}
                  // py={"0.5rem"}
                  // px="0.5rem"
                >
                  <NavbarCat paddingGap={true} color={"white"} />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Index;
