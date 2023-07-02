import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      {" "}
      <Flex
        // border={"1px"}
        justify="space-evenly"
        direction={"column"}
      >
        <Flex
          // border={"1px"}
          // mx={"0.5rem"}
          direction="column"
        >
          <Accordion allowToggle>
            <AccordionItem mt={"3rem"}>
              <AccordionButton py={"1rem"}>
                <Flex width="100%" justify={"space-between"} align="center">
                  <Link href="/plastic-surgery-instruments">
                    <Heading
                      color={colorMode === "light" ? "#153A5B" : "white"}
                      fontSize={["0.8rem", "1rem", "1.5rem", "2rem"]}
                      _hover={{ textDecoration: "underline" }}
                      textTransform={"uppercase"}
                      onClick={() => onClose()}
                    >
                      PLASTIC SURGERY INSTRUMENTS
                    </Heading>
                  </Link>

                  <AccordionIcon />
                </Flex>
              </AccordionButton>

              <AccordionPanel onClick={() => onClose()} pb={4}>
                <Box my={"1rem"}>
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
                      color="white"
                      bg={"#153A5B"}
                      // w="60%"
                      p={"0.3rem"}
                      borderRadius="6px"
                    >
                      See All Products
                    </Text>
                  </Link>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </Box>
  );
};
