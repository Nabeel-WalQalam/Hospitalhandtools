import {
  Box,
  Flex,
  Text,
  Center,
  Heading,
  Divider,
  Button,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import React from "react";

// import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "react-feather";
import { BsArrowRight } from "react-icons/bs";
import { HiArrowNarrowRight } from "react-icons/hi";
const data = [
  {
    id: 1,
    image: "/assets/mamplasty-cat-image1.jpg",
    name: "Mammoplasty",
  },
  {
    id: 2,
    image: "/assets/ENT-HPIC.jpg",
    name: "Ent Instrument",
  },
  {
    id: 3,
    image: "/assets/super-hanlde.jpg",
    name: "Liposuction",
  },
  {
    id: 4,
    image: "/assets/INSTRUMENTS SETS.jpg",
    name: "Instrument Set",
  },
];
export const TrendingProducts = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  // localStorage.getItem("chakra-ui-color-mode")
  return (
    <React.Fragment>
      <Flex justify={"center"} width={"100%"} mx="auto">
        <Text
          fontSize={"22px"}
          fontWeight={"bold"}
          // color={colorMode === "light" ? "#153A5B" : "white"}
        >
          Top Categories
        </Text>
      </Flex>
      <Flex
        gap="1.5rem"
        my={"1.5rem"}
        justify={"center"}
        align={"center"}
        wrap={"wrap"}
        // border={"1px"}
      >
        {data &&
          data.map((list) => {
            return (
              <Link href={"/ent-instruments"} key={list.id}>
                <Box
                  width={"240px"}
                  height={"240px"}
                  border={"1px"}
                  borderColor={"gray.200"}
                  pos={"relative"}
                  overflow="hidden"
                  boxShadow={"md"}
                  cursor={"pointer"}
                >
                  <Image
                    transform="scale(1.0)"
                    src={list.image}
                    alt="some text"
                    // objectFit="contain"
                    // width="300px"
                    height={"inherit"}
                    width={"inherit"}
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                    // pos={"relative"}
                  />
                  <Text
                    // border={"1px"}
                    as="div"
                    pos={"absolute"}
                    bottom={"10px"}
                    left={"25%"}
                    w={"50%"}
                    // mx={"auto"}
                    bg="rgba(255, 255, 255, 0.9);"
                    color={"black"}
                    fontSize={"14px"}
                    whiteSpace={"nowrap"}
                    fontWeight={"semibold"}
                    textTransform={"uppercase"}
                  >
                    <Center>{list.name}</Center>
                  </Text>
                </Box>
                <Flex
                  align={"center"}
                  gap={"0.5rem"}
                  // border={"1px"}
                  justify={"right"}
                  _hover={{ color: "#153A5B", textDecor: "underline" }}
                  mt="0.5rem"
                >
                  <Text
                    fontSize={"12px"}
                    fontWeight={"medium"}
                    color={"rgba(51, 51, 51, 1)"}
                  >
                    See products
                  </Text>
                  <Box>
                    <HiArrowNarrowRight fontSize={"12px"} />
                  </Box>
                </Flex>
              </Link>
            );
          })}
      </Flex>
    </React.Fragment>
  );
};
