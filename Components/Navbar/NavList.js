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

  const handleMenuClick = () => {
    // console.log(`${option} clicked`);
    setIsOpen(false);
  };
  return (
    <>
      <Box zIndex={"99"}>
        <Tooltip label="shop" aria-label="shop">
          <Button
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            border={"none"}
            borderRadius={"none"}
            variant={"unstyled"}
            style={{ fontWeight: "bold" }}
            onClick={() => setIsOpen(!isOpen)}
            fontWeight={"bold"}
            color={colorMode === "light" ? "white" : "#153A5B"}
            px="1rem"
            fontSize={"0.9rem"}
            bg={colorMode === "light" ? "#153A5B" : "white"}
          >
            SHOP BY CATEGORY
          </Button>
        </Tooltip>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            // bg="white"
            borderRadius="md"
            boxShadow="md"
            py="2"
            zIndex="1"
            style={{
              border: "1px",
              borderColor: "red",
              position: "absolute",
              left: "0px",
              width: "100%",
              zIndex: "9999",
              // bg: "white",
            }}
          >
            {/* <Stack spacing="1"> */}
            <Flex
              onClick={() => handleMenuClick()}
              style={{
                position: "absolute",
                left: "0px",
                top: "0.5rem",
              }}
              width={"100%"}
              justify="space-evenly"
              bg={colorMode === "light" ? "white" : "#153A5B"}
              shadow={"xl"}
            >
              <Flex
                // border={"1px"}
                // mx={"0.5rem"}
                direction="column"
                // color={colorMode === "light" ? "#153A5B" : "white"}
                fontSize={{
                  base: "0.8rem",
                  md: "0.9rem",
                  lg: "1rem",
                  xl: "1rem",
                }}
              >
                <Box
                  mt={"1rem"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  <Link href="/plastic-surgery-instruments">
                    <Center mx="auto" w={"90%"}>
                      <Heading
                        color={colorMode === "light" ? "#153A5B" : "white"}
                        fontSize={["0.6rem", "0.7rem", "0.9rem", "1.5rem"]}
                        _hover={{ textDecoration: "underline" }}
                        textTransform={"uppercase"}
                      >
                        PLASTIC SURGERY INSTRUMENTS
                      </Heading>
                    </Center>
                  </Link>
                </Box>
                <Box mx={"auto"} width={"90%"} my={"1rem"}>
                  <Link
                    href={
                      "/plastic-surgery-instruments/Fiber-Optic-Instruments"
                    }
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Fiber Optic Instruments
                    </Text>
                  </Link>
                  <Link
                    href={"/plastic-surgery-instruments/Knives-and-handles"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
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
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Measuring and Marking Instruments
                    </Text>
                  </Link>
                  <Link href={"/plastic-surgery-instruments/Bone-Chisels"}>
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Bone Chisels
                    </Text>
                  </Link>
                  <Link
                    href={
                      "/plastic-surgery-instruments/Bone-Osteotomes-and-Gouges"
                    }
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Bone Osteotomes and Gouges
                    </Text>
                  </Link>
                  <Link href={"/plastic-surgery-instruments/Dissectors"}>
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Dissectors
                    </Text>
                  </Link>
                  <Link href={"/plastic-surgery-instruments/Elevators"}>
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Elevators
                    </Text>
                  </Link>
                  <Link
                    href={"/plastic-surgery-instruments/Skin-Grafting-Tools"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Skin Grafting Tools
                    </Text>
                  </Link>
                  <Link
                    href={
                      "/plastic-surgery-instruments/cartilage-Rasps-Files-Saw"
                    }
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      cartilage - Rasps- Files - Saw
                    </Text>
                  </Link>
                  <Link href={"/plastic-surgery-instruments/Scissors"}>
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
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
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Dressing And Tissue Forceps
                    </Text>
                  </Link>
                  <Link href={"/plastic-surgery-instruments/Mouth-Gags"}>
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Mouth Gags
                    </Text>
                  </Link>
                  <Link href={"/plastic-surgery-instruments/Needle-Holders"}>
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Needle Holders
                    </Text>
                  </Link>
                  <Link
                    href={"/plastic-surgery-instruments/Hook-And-Retractor"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Hooks And Retractor
                    </Text>
                  </Link>
                  <Link href={"/plastic-surgery-instruments"}>
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "white" : "#153A5B"}
                      bg={colorMode == "light" ? "#153A5B" : "white"}
                      // w="60%"
                      p={"0.3rem"}
                      w={"80%"}
                      // borderRadius="6px"
                    >
                      See All Products
                    </Text>
                  </Link>
                </Box>
              </Flex>
              <Divider
                orientation="vertical"
                colorScheme={"facebook"}
                height="550px"
                // height="100%"
                border="1px"
                size={"lg"}
                marginY={"auto"}
              />
              <Flex
                // border={"1px"}
                direction="column"
                mx={"0.5rem"}
                fontSize={{
                  base: "0.8rem",
                  md: "0.9rem",
                  lg: "1rem",
                  xl: "1.4rem",
                }}
              >
                <Box mt={"1rem"}>
                  <Link href="/liposuction-cannula-and-accessories">
                    <Center mx="auto" w={"90%"}>
                      <Heading
                        color={colorMode === "light" ? "#153A5B" : "white"}
                        fontSize={["0.6rem", "0.7rem", "0.9rem", "1.5rem"]}
                        _hover={{ textDecoration: "underline" }}
                        textTransform={"uppercase"}
                      >
                        Liposuction Cannula<br></br> And Accessories
                      </Heading>
                    </Center>
                  </Link>
                </Box>
                <Box
                  my={"1rem"}
                  width={"90%"}
                  mx="auto"
                  fontSize={{
                    base: "0.8rem",
                    md: "0.9rem",
                    lg: "1rem",
                    xl: "1rem",
                  }}
                >
                  <Link
                    href={
                      "/liposuction-cannula-and-accessories/Fat-Injectors-Cannula"
                    }
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
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
                      my="0.3rem"
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
                      my="0.3rem"
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
                      my="0.3rem"
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
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      inside threaded liposuction cannula
                    </Text>
                  </Link>
                </Box>
              </Flex>
              <Divider
                orientation="vertical"
                colorScheme={"facebook"}
                height="550px"
                marginY={"auto"}
                border="1px"
                size={"lg"}
              />
              <Flex
                //  border={"1px"}
                direction="column"
                mx={"0.5rem"}
                fontSize={{
                  base: "0.8rem",
                  md: "0.9rem",
                  lg: "1rem",
                  xl: "1.4rem",
                }}
              >
                <Box mt={"1rem"}>
                  <Link href="/instruments-by-procedures">
                    <Center>
                      <Heading
                        color={colorMode === "light" ? "#153A5B" : "white"}
                        fontSize={["0.6rem", "0.7rem", "0.9rem", "1.5rem"]}
                        _hover={{ textDecoration: "underline" }}
                        textTransform={"uppercase"}
                      >
                        Instruments By Procedures
                      </Heading>
                    </Center>
                  </Link>
                </Box>
                <Box
                  my={"1rem"}
                  width={"90%"}
                  mx="auto"
                  fontSize={{
                    base: "0.8rem",
                    md: "0.9rem",
                    lg: "1rem",
                    xl: "1rem",
                  }}
                >
                  <Link
                    href={"/instruments-by-procedures/Rhinoplasty-Instruments"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Rhinoplasty Instruments
                    </Text>
                  </Link>
                  <Link
                    href={
                      "/instruments-by-procedures/Breast-Surgery-Instruments"
                    }
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      my="0.3rem"
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    >
                      Breast Surgery Instruments
                    </Text>
                  </Link>
                </Box>
              </Flex>
              <Divider
                orientation="vertical"
                colorScheme={"facebook"}
                height="550px"
                marginY={"auto"}
                border="1px"
                size={"lg"}
              />

              <Flex
                //  border={"1px"}
                direction="column"
                fontSize={{
                  base: "0.8rem",
                  md: "0.9rem",
                  lg: "1rem",
                  xl: "1.4rem",
                }}
              >
                <Box my={"1rem"}>
                  <Link href="/instruments-sets">
                    <Center>
                      <Heading
                        color={colorMode === "light" ? "#153A5B" : "white"}
                        fontSize={["0.6rem", "0.7rem", "0.9rem", "1.5rem"]}
                        _hover={{ textDecoration: "underline" }}
                        textTransform={"uppercase"}
                      >
                        INSTRUMENTS SETS
                      </Heading>
                    </Center>
                  </Link>
                </Box>
                <Flex justify={"center"} align="center">
                  <Link href={"/instruments-sets/Face-Surgery-Sets"}>
                    <Box
                      border={"1px"}
                      borderRadius="10px"
                      borderColor="gray.200"
                      _hover={{ shadow: "lg" }}
                    >
                      <Image
                        src={"/assets/face-set.png"}
                        alt="Face-Surgery-Instrument"
                        width={250}
                        height={100}
                        priority={true}
                      />
                    </Box>
                    <Text
                      textDecoration={"underline"}
                      my={"1rem"}
                      width={"90%"}
                      mx="auto"
                      fontSize={{
                        base: "0.8rem",
                        md: "0.9rem",
                        lg: "1rem",
                        xl: "1rem",
                      }}
                      color={colorMode === "light" ? "#153A5B" : "white"}
                      textAlign={"center"}
                      fontWeight={"semibold"}
                    >
                      Face Surgery Sets
                    </Text>
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </motion.div>
        )}
      </Box>
    </>
  );
};

export default NavList;
