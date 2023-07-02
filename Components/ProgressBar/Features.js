import React from "react";
import { Flex, Box, Text, Heading, useColorMode } from "@chakra-ui/react";
import { FaShippingFast, FaMedal, FaLock, FaPhoneAlt } from "react-icons/fa";
export const Features = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex
        p={"2rem"}
        justify={["center", "space-between", "center"]}
        gap={["1rem", "2rem", "4rem", "5rem", "10rem"]}
        wrap={"wrap"}
        // border="1px"
      >
        <Flex align={"center"}>
          <Box
            border={"2px"}
            p="1rem"
            borderRadius={"50%"}
            mr="0.6rem"
            borderColor={"#153A5B"}
            position="relative"
            zIndex={"-999"}
          >
            <Box
              className={colorMode === "light" ? "circleDot" : "circleDot2"}
            ></Box>
            <FaShippingFast
              fill={colorMode === "light" ? "#153A5B" : "white"}
              size={"2rem"}
            />
          </Box>
          <Box zIndex={"-999"}>
            <Text
              fontWeight={"bold"}
              color={colorMode === "light" ? "#153A5B" : "white"}
            >
              Free Shipping
            </Text>
            <Text
              fontSize={[10, 11, 12, 13]}
              color={colorMode === "light" ? "gray.500" : "white"}
            >
              Free Shipping on all orders <br /> over US $500
            </Text>
          </Box>
        </Flex>
        <Flex align={"center"}>
          <Box
            border={"2px"}
            p="1rem"
            borderRadius={"50%"}
            mr="0.6rem"
            borderColor={"#153A5B"}
            position="relative"
            zIndex={"-999"}
          >
            <Box
              className={colorMode === "light" ? "circleDot" : "circleDot2"}
            ></Box>
            <FaMedal
              fill={colorMode === "light" ? "#153A5B" : "white"}
              size={"2rem"}
            />
          </Box>
          <Box zIndex={"-999"}>
            <Text
              fontWeight={"bold"}
              color={colorMode === "light" ? "#153A5B" : "white"}
            >
              Quality Assured
            </Text>
            <Text
              fontSize={[10, 11, 12, 13]}
              color={colorMode === "light" ? "gray.500" : "white"}
            >
              Instruments follow strict <br /> procedures to ensure quality
            </Text>
          </Box>
        </Flex>
        <Flex align={"center"}>
          <Box
            zIndex={"-999"}
            border={"2px"}
            p="1rem"
            borderRadius={"50%"}
            mr="0.6rem"
            borderColor={"#153A5B"}
            position="relative"
          >
            <Box
              className={colorMode === "light" ? "circleDot" : "circleDot2"}
            ></Box>
            <FaLock
              fill={colorMode === "light" ? "#153A5B" : "white"}
              size={"2rem"}
            />
          </Box>
          <Box>
            <Text
              fontWeight={"bold"}
              color={colorMode === "light" ? "#153A5B" : "white"}
            >
              Secure Shopping
            </Text>
            <Text
              fontSize={[10, 11, 12, 13]}
              color={colorMode === "light" ? "gray.500" : "white"}
            >
              We use latest SSL and <br /> technologies for e-security
            </Text>
          </Box>
        </Flex>
        <Flex align={"center"}>
          <Box
            border={"2px"}
            p="1rem"
            borderRadius={"50%"}
            mr="0.6rem"
            borderColor={"#153A5B"}
            position="relative"
            zIndex={"-999"}
          >
            <Box
              className={colorMode === "light" ? "circleDot" : "circleDot2"}
            ></Box>
            <FaPhoneAlt
              fill={colorMode === "light" ? "#153A5B" : "white"}
              size={"2rem"}
            />
          </Box>
          <Box>
            <Text
              fontWeight={"bold"}
              color={colorMode === "light" ? "#153A5B" : "white"}
            >
              Customer Support
            </Text>
            <Text
              fontSize={[10, 11, 12, 13]}
              color={colorMode === "light" ? "gray.500" : "white"}
            >
              Whatsapp +92 321 6126225 <br />
              to get instant support
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
