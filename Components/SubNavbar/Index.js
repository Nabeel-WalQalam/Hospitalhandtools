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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NavList from "../Navbar/NavList";
import { motion } from "framer-motion";
import { NavbarCat } from "../Navbar/NavbarCat";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { useSelector } from "react-redux";

const Index = () => {
  const { onOpen, onClose, isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const cart = useSelector((state) => state.cart.cart);
  const [subTotal, setsubTotal] = useState(0);
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
      <Box
        pos={"sticky"}
        top={"0px"}
        bg={colorMode === "light" ? "white" : "#153A5B"}
        zIndex={"999"}
        shadow={"base"}
        border={colorMode == "dark" ? "1px" : "none"}
        // border={"1px"}
      >
        <Flex
          // w={"95%"}
          ml={["1rem", "1rem", "1rem"]}
          // border={"1px"}
          align={"center"}
          justify={["right", "right", "space-between", "space-between"]}
        >
          <Flex
            justify={"center"}
            gap={"1.7rem"}
            display={["none", "none", "flex"]}
            // ml={"1rem"}
            w={"50%"}
            // border={"1px"}
          >
            <Box>
              <NavList
                isOpen={isOpen}
                onToggle={onToggle}
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                // whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                style={{ color: "#153A5B", fontWeight: "bold" }}
              />
            </Box>
            <Box>
              <Tooltip label="About" aria-label="About">
                <Button
                  as={motion.button}
                  whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  variant={"unstyled"}
                  style={{ fontWeight: "bold" }}
                  // onClick={() => setIsOpen(!isOpen)}
                  fontWeight={"bold"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  fontSize={"0.9rem"}
                >
                  ABOUT
                </Button>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip label="Contact" aria-label="Contact">
                <Button
                  as={motion.button}
                  whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  variant={"unstyled"}
                  style={{ fontWeight: "bold" }}
                  // onClick={() => setIsOpen(!isOpen)}
                  fontWeight={"bold"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  fontSize={"0.9rem"}
                >
                  CONTACT
                </Button>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip label="Blog" aria-label="Blog">
                <Button
                  as={motion.button}
                  whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  variant={"unstyled"}
                  style={{ fontWeight: "bold" }}
                  // onClick={() => setIsOpen(!isOpen)}
                  fontWeight={"bold"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  fontSize={"0.9rem"}
                >
                  BLOG
                </Button>
              </Tooltip>
            </Box>
          </Flex>
          <Flex
            mr={["0rem", "0rem", "2rem", "5rem"]}
            // bg={"#153A5B"}
            color={"white"}
            align={"center"}

            // border={"1px"}
            // px="1rem"
          >
            <Box>
              <Tooltip label="color mode" fontSize="md">
                <Box
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
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
            <Flex mx={"1rem"}>
              <Divider
                orientation="vertical"
                border={"1px"}
                borderColor={"gray"}
                // width={"100%"}
                height={"50px"}
              />
            </Flex>
            <Flex align={"center"}>
              <Box>
                <Text color={colorMode == "light" ? "gray.800" : "white"}>
                  {getTotalQuantity() || 0} item(s) - $
                  {subTotal.toFixed(2) || 0}
                </Text>
              </Box>
              <Box mx={"1rem"} bg={"#153A5B"} py={"0.5rem"} px="0.5rem">
                <NavbarCat />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Index;
