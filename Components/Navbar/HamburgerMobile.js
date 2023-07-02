import React, { useRef, useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Center,
  Heading,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { Box, Button, useDisclosure, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import secureLocalStorage from "react-secure-storage";

import { GiHamburgerMenu } from "react-icons/gi";
import VoucherSearch from "../ProductSearch/VoucherSearch";
import { useSelector } from "react-redux";
export const HamburgerMobile = () => {
  const user = useSelector((state) => state.user.user);
  const { colorMode, toggleColorMode } = useColorMode(
    secureLocalStorage.getItem("chakra-ui-color-mode")
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [username, setusername] = useState();
  // const btnRef = useRef();

  return (
    <>
      <GiHamburgerMenu
        // ref={btnRef}
        onClick={onOpen}
        fontSize={"1.8rem"}
        fill={colorMode == "light" ? "#153A5B" : "white"}
        display={["block", "block", "none"]}
      />
      <Drawer
        display={["block", "block", "none"]}
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

          <DrawerBody p={"0px"}>
            {/* <Box mt={"2rem"}>
              <VoucherSearch />
            </Box> */}
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
                        <Flex
                          width="100%"
                          justify={"space-between"}
                          align="center"
                        >
                          <Link href="/plastic-surgery-instruments">
                            <Heading
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              Fiber Optic Instruments
                            </Text>
                          </Link>
                          <Link
                            href={
                              "/plastic-surgery-instruments/Knives-and-handles"
                            }
                          >
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              Measuring and Marking Instruments
                            </Text>
                          </Link>
                          <Link
                            href={"/plastic-surgery-instruments/Bone-Chisels"}
                          >
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              Bone Osteotomes and Gouges
                            </Text>
                          </Link>
                          <Link
                            href={"/plastic-surgery-instruments/Dissectors"}
                          >
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              Dissectors
                            </Text>
                          </Link>
                          <Link href={"/plastic-surgery-instruments/Elevators"}>
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              Elevators
                            </Text>
                          </Link>
                          <Link
                            href={
                              "/plastic-surgery-instruments/Skin-Grafting-Tools"
                            }
                          >
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              cartilage - Rasps- Files - Saw
                            </Text>
                          </Link>
                          <Link href={"/plastic-surgery-instruments/Scissors"}>
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              Dressing And Tissue Forceps
                            </Text>
                          </Link>
                          <Link
                            href={"/plastic-surgery-instruments/Mouth-Gags"}
                          >
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              Mouth Gags
                            </Text>
                          </Link>
                          <Link
                            href={"/plastic-surgery-instruments/Needle-Holders"}
                          >
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              Needle Holders
                            </Text>
                          </Link>
                          <Link
                            href={
                              "/plastic-surgery-instruments/Hook-And-Retractor"
                            }
                          >
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                    <AccordionItem>
                      <AccordionButton py={"1rem"}>
                        <Flex
                          width="100%"
                          justify={"space-between"}
                          align="center"
                        >
                          <Link href="/liposuction-cannula-and-accessories">
                            <Heading
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                              fontSize={["0.8rem", "1rem", "1.5rem", "2rem"]}
                              _hover={{ textDecoration: "underline" }}
                              textTransform={"uppercase"}
                              onClick={() => onClose()}
                            >
                              Liposuction Cannula
                            </Heading>
                          </Link>

                          <AccordionIcon />
                        </Flex>
                      </AccordionButton>

                      <AccordionPanel onClick={() => onClose()} pb={4}>
                        <Box my={"1rem"}>
                          <Link
                            href={
                              "/liposuction-cannula-and-accessories/Fat-Injectors-cannula"
                            }
                          >
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              inside threaded liposuction cannula
                            </Text>
                          </Link>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton py={"1rem"}>
                        <Flex
                          width="100%"
                          justify={"space-between"}
                          align="center"
                        >
                          <Link href="/instruments-by-procedures">
                            <Heading
                              onClick={() => onClose()}
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                              fontSize={["0.8rem", "1rem", "1.5rem", "2rem"]}
                              _hover={{ textDecoration: "underline" }}
                              textTransform={"uppercase"}
                            >
                              Instruments By Procedures
                            </Heading>
                          </Link>

                          <AccordionIcon />
                        </Flex>
                      </AccordionButton>
                      <AccordionPanel onClick={() => onClose()} pb={4}>
                        <Box my={"1rem"}>
                          <Link
                            href={
                              "/instruments-by-procedures/Rhinoplasty-Instruments"
                            }
                          >
                            <Text
                              _hover={{ textDecoration: "underline" }}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
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
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                            >
                              Breast Surgery Instruments
                            </Text>
                          </Link>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton py={"1rem"}>
                        <Flex
                          width="100%"
                          justify={"space-between"}
                          align="center"
                        >
                          <Link href="/instruments-sets">
                            <Heading
                              onClick={() => onClose()}
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                              fontSize={["0.8rem", "1rem", "1.5rem", "2rem"]}
                              _hover={{ textDecoration: "underline" }}
                              textTransform={"uppercase"}
                            >
                              INSTRUMENTS SETS
                            </Heading>
                          </Link>

                          <AccordionIcon />
                        </Flex>
                      </AccordionButton>
                      <AccordionPanel onClick={() => onClose()} py={4}>
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
                              />
                            </Box>
                            <Text
                              textDecoration={"underline"}
                              my="0.3rem"
                              color={
                                colorMode === "light" ? "#153A5B" : "white"
                              }
                              textAlign={"center"}
                              fontWeight={"semibold"}
                              fontSize="1.2rem"
                            >
                              Face Surgery Sets
                            </Text>
                          </Link>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Flex>
                <Divider
                  my={"1.5rem"}
                  orientation="horizontal"
                  colorScheme={"facebook"}
                  // height="500px"
                  // height="100%"
                  border="1px"
                  // size={"sm"}
                  width="50%"
                  marginInline={"auto"}
                />

                {/* <Divider
                  orientation="vertical"
                  colorScheme={"facebook"}
                  height="500px"
                  // marginY={"auto"}
                  border="1px"
                  size={"lg"}
                /> */}
                <Flex
                  //  border={"1px"}
                  direction="column"
                  mx={"0.5rem"}
                ></Flex>
                {/* <Divider
                  orientation="vertical"
                  colorScheme={"facebook"}
                  height="5s00px"
                  // height="100%"
                  border="1px"
                  size={"lg"}
                /> */}
                <Flex
                  //  border={"1px"}
                  direction="column"
                ></Flex>
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
