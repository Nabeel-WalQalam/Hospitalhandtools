import React, { useRef, useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Text,
  Flex,
  Heading,
  Box,
  Stack,
  Divider,
  Center,
  useDisclosure,
  useColorMode,
  Button,
  Slide,
  Select,
  List,
  ListItem,
  useOutsideClick,
  ScaleFade,
  custo,
  Tooltip,
} from "@chakra-ui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";
import { BsArrowDown } from "react-icons/bs";
import { motion } from "framer-motion";

const NavList = () => {
  const { colorMode } = useColorMode();
  // console.log(colorMode);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
      // height={"100%"}
      // zIndex={"99"}
      >
        {/* <Stack spacing="1"> */}
        <Flex
          // onClick={() => handleMenuClick()}
          // style={{
          //   position: "absolute",
          //   left: "0px",
          //   top: "0.5rem",
          // }}
          // width={"100%"}
          border={"1px"}
          borderColor={"gray.100"}
          justify="space-evenly"
          bg={colorMode === "light" ? "white" : "#153A5B"}
          shadow={"base"}
        >
          <Flex
            // border={"1px"}
            // mx={"0.5rem"}
            direction="column"
            // color={colorMode === "light" ? "#153A5B" : "white"}
            // fontSize={{
            //   base: "0.8rem",
            //   md: "0.9rem",
            //   lg: "1rem",
            //   xl: "1rem",
            // }}
          >
            <Box
              mt={"1rem"}
              color={colorMode === "light" ? "#153A5B" : "white"}
            >
              <Link href="/plastic-surgery-instruments">
                {/* <Center mx="auto" w={"90%"}> */}
                <Text
                  fontWeight={"semibold"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  // fontSize={["0.6rem", "0.7rem", "0.9rem", "1.5rem"]}
                  _hover={{ textDecoration: "underline" }}
                  textTransform={"uppercase"}
                >
                  PLASTIC SURGERY INSTRUMENTS
                </Text>
                {/* </Center> */}
              </Link>
            </Box>
            <Flex
              direction={"column"}
              // border={"1px"}
              // mx={"auto"}
              // width={"90%"}
              gap={"0.5rem"}
              my={"1rem"}
            >
              <Link
                href={"/plastic-surgery-instruments/Fiber-Optic-Instruments"}
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Fiber Optic Instruments
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments/Knives-and-handles"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Knives and handles
                </Text>
              </Link>
              <Link
                href={
                  "/plastic-surgery-instruments/Measuring-and-Marking-Instruments"
                }
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Measuring and Marking Instruments
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments/Bone-Chisels"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Bone Chisels
                </Text>
              </Link>
              <Link
                href={"/plastic-surgery-instruments/Bone-Osteotomes-and-Gouges"}
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Bone Osteotomes and Gouges
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments/Dissectors"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Dissectors
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments/Elevators"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Elevators
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments/Skin-Grafting-Tools"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Skin Grafting Tools
                </Text>
              </Link>
              <Link
                href={"/plastic-surgery-instruments/cartilage-Rasps-Files-Saw"}
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  cartilage - Rasps- Files - Saw
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments/Scissors"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Scissors
                </Text>
              </Link>
              <Link
                href={
                  "/plastic-surgery-instruments/Dressing-And-Tissue-Forceps"
                }
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Dressing And Tissue Forceps
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments/Mouth-Gags"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Mouth Gags
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments/Needle-Holders"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Needle Holders
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments/Hook-And-Retractor"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Hooks And Retractor
                </Text>
              </Link>
              <Link href={"/plastic-surgery-instruments"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "white" : "#153A5B"}
                  bg={colorMode == "light" ? "#153A5B" : "white"}
                  // w="60%"
                  // p={"0.3rem"}
                  // w={"80%"}
                  // borderRadius="6px"
                >
                  See All Products
                </Text>
              </Link>
            </Flex>
          </Flex>
          {/* <Divider
            orientation="vertical"
            colorScheme={"facebook"}
            height="550px"
            marginY={"auto"}
            border="1px"
            size={"lg"}
          /> */}
          <Flex
            // border={"1px"}
            direction="column"
            // mx={"0.5rem"}
            // fontSize={{
            //   base: "0.8rem",
            //   md: "0.9rem",
            //   lg: "1rem",
            //   xl: "1.4rem",
            // }}
          >
            <Box mt={"1rem"}>
              <Link href="/liposuction-cannula-and-accessories">
                {/* <Center mx="auto" w={"90%"}> */}
                <Text
                  fontWeight={"semibold"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  // fontSize={["0.6rem", "0.7rem", "0.9rem", "1.5rem"]}
                  _hover={{ textDecoration: "underline" }}
                  textTransform={"uppercase"}
                >
                  Liposuction Cannula And Accessories
                </Text>
                {/* </Center> */}
              </Link>
            </Box>
            <Flex
              my={"1rem"}
              // width={"90%"}
              direction={"column"}
              gap={"0.5rem"}
              // mx="auto"
            >
              <Link
                href={
                  "/liposuction-cannula-and-accessories/Fat-Injectors-Cannula"
                }
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Fat Injectors cannula
                </Text>
              </Link>
              <Link
                href={
                  "/liposuction-cannula-and-accessories/Luer-lock-liposuction-cannula"
                }
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Luer lock liposuction cannula
                </Text>
              </Link>
              <Link
                href={
                  "/liposuction-cannula-and-accessories/One-Piece-Handle-Cannula"
                }
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  One Piece Handle Cannula
                </Text>
              </Link>
              <Link
                href={
                  "/liposuction-cannula-and-accessories/Liposuction-Cannula-Accessories"
                }
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Liposuction Cannula Accessories
                </Text>
              </Link>
              <Link
                href={
                  "/liposuction-cannula-and-accessories/inside-threaded-liposuction-cannula"
                }
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  inside threaded liposuction cannula
                </Text>
              </Link>
            </Flex>
          </Flex>
          {/* <Divider
            orientation="vertical"
            colorScheme={"facebook"}
            height="550px"
            marginY={"auto"}
            border="1px"
            size={"lg"}
          /> */}
          <Flex
            //  border={"1px"}
            direction="column"
            // mx={"0.5rem"}
            // fontSize={{
            //   base: "0.8rem",
            //   md: "0.9rem",
            //   lg: "1rem",
            //   xl: "1.4rem",
            // }}
          >
            <Box mt={"1rem"}>
              <Link href="/instruments-by-procedures">
                <Text
                  fontWeight={"semibold"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  // fontSize={["0.6rem", "0.7rem", "0.9rem", "1.5rem"]}
                  _hover={{ textDecoration: "underline" }}
                  textTransform={"uppercase"}
                >
                  Instruments By Procedures
                </Text>
              </Link>
            </Box>
            <Flex
              my={"1rem"}
              width={"90%"}
              direction={"column"}
              // mx="auto"
              // fontSize={{
              //   base: "0.8rem",
              //   md: "0.9rem",
              //   lg: "1rem",
              //   xl: "1rem",
              // }}
            >
              <Link href={"/instruments-by-procedures/Rhinoplasty-Instruments"}>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Rhinoplasty Instruments
                </Text>
              </Link>
              <Link
                href={"/instruments-by-procedures/Breast-Surgery-Instruments"}
              >
                <Text
                  _hover={{ textDecoration: "underline" }}
                  // my="0.3rem"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  Breast Surgery Instruments
                </Text>
              </Link>
            </Flex>
          </Flex>
          {/* <Divider
            orientation="vertical"
            colorScheme={"facebook"}
            height="550px"
            marginY={"auto"}
            border="1px"
            size={"lg"}
          /> */}

          <Flex
            //  border={"1px"}
            direction="column"
            // fontSize={{
            //   base: "0.8rem",
            //   md: "0.9rem",
            //   lg: "1rem",
            //   xl: "1.4rem",
            // }}
          >
            <Box my={"1rem"}>
              <Link href="/instruments-sets">
                <Text
                  fontWeight={"semibold"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  // fontSize={["0.6rem", "0.7rem", "0.9rem", "1.5rem"]}
                  _hover={{ textDecoration: "underline" }}
                  textTransform={"uppercase"}
                >
                  INSTRUMENTS SETS
                </Text>
              </Link>
            </Box>
            <Flex justify={"center"} align="center">
              <Link href={"/instruments-sets/Face-Surgery-Sets"}>
                <Box border={"1px"} borderRadius="10px" borderColor="gray.100">
                  <Image
                    src={"/assets/face-set.png"}
                    alt="Face-Surgery-Instrument"
                    width={250}
                    height={100}
                  />
                </Box>
                <Text
                  // textDecoration={"underline"}
                  my={"1rem"}
                  width={"90%"}
                  // mx="auto"
                  // fontSize={{
                  //   base: "0.8rem",
                  //   md: "0.9rem",
                  //   lg: "1rem",
                  //   xl: "1rem",
                  // }}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  // textAlign={"center"}
                  // fontWeight={"semibold"}
                >
                  Face Surgery Sets
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavList;
