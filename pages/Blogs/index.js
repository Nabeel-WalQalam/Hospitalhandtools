import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Avatar,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
// import Image from "next/image";
import { Badge } from "@chakra-ui/react";

export default function Index() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Box minH={"100vh"}>
        <Center bg={"#153A5B"}>
          <Heading color={"white"}>Blogs</Heading>
        </Center>
        <Box>
          <Text p="2rem" fontSize={"4xl"} fontWeight="semibold">
            Latest blog posts
          </Text>
        </Box>
        <Box>
          <Flex my={"1rem"} justify={"center"} gap="2rem" wrap={"wrap"}>
            <Box
              border={"1px"}
              borderColor="gray.300"
              _hover={{ filter: "grayscale(50%)", boxShadow: "base" }}
              minw="30%"
              p={"1rem"}
            ></Box>
            <Box
              border={"1px"}
              borderColor="gray.300"
              _hover={{ filter: "grayscale(50%)", boxShadow: "base" }}
              minw="30%"
              p={"1rem"}
            >
              <Link
                href={
                  "/Blogs/5-Types-of-Surgical-Instruments-Every-Operating-Room-Should-Have"
                }
              >
                <Box>
                  <Image
                    src={"/assets/Blogs/pic1.jpg"}
                    alt={"Surgons"}
                    width={450}
                    height={100}
                  />
                </Box>
                <Box my={"1rem"}>
                  <Box>
                    <Flex
                      //   border={"1px"}
                      wrap={"wrap"}
                      // align="s"
                      // justify="center"
                      gap={"0.4rem"}
                      w={"90%"}
                    >
                      <Badge fontSize="0.8em" colorScheme={"orange"}>
                        surgical instruments
                      </Badge>
                      <Badge fontSize="0.8em" colorScheme="green">
                        room
                      </Badge>
                      <Badge fontSize="0.8em" colorScheme="red">
                        essential
                      </Badge>

                      <Badge fontSize="0.8em" colorScheme="purple">
                        surgical procedures
                      </Badge>
                      <Badge fontSize="0.8em" colorScheme="green">
                        types
                      </Badge>
                    </Flex>
                  </Box>
                  <Box>
                    <Heading
                      color={colorMode == "light" ? "#153A5B" : "white"}
                      as={"h2"}
                      size="md"
                      my={"0.5rem"}
                      _hover={{ textDecoration: "underline" }}
                    >
                      5 Types of Surgical Instruments <br /> Every Operating
                      Room Should Have
                    </Heading>
                  </Box>

                  <Box my={"20px"}>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar name="Adnan Rauf" src="/assets/Blogs/admin.png" />

                      <Box>
                        <Heading
                          color={colorMode == "light" ? "#153A5B" : "white"}
                          size="sm"
                        >
                          Adnan Rauf
                        </Heading>
                        <Text color={"gray.400"}>March 20 , 2023</Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Link>
            </Box>
            <Box
              border={"1px"}
              borderColor="gray.300"
              _hover={{ filter: "grayscale(50%)", boxShadow: "base" }}
              minw="30%"
              p={"1rem"}
            >
              <Link
                href={
                  "/Blogs/5-Types-of-Surgical-Instruments-Every-Operating-Room-Should-Have"
                }
              >
                <Box>
                  <Image
                    src={"/assets/Blogs/pic1.jpg"}
                    alt={"Surgons"}
                    width={450}
                    height={100}
                  />
                </Box>
                <Box my={"1rem"}>
                  <Box>
                    <Flex
                      //   border={"1px"}
                      wrap={"wrap"}
                      // align="s"
                      // justify="center"
                      gap={"0.4rem"}
                      w={"90%"}
                    >
                      <Badge fontSize="0.8em" colorScheme={"orange"}>
                        surgical instruments
                      </Badge>
                      <Badge fontSize="0.8em" colorScheme="green">
                        room
                      </Badge>
                      <Badge fontSize="0.8em" colorScheme="red">
                        essential
                      </Badge>

                      <Badge fontSize="0.8em" colorScheme="purple">
                        surgical procedures
                      </Badge>
                      <Badge fontSize="0.8em" colorScheme="green">
                        types
                      </Badge>
                    </Flex>
                  </Box>
                  <Box>
                    <Heading
                      color={colorMode == "light" ? "#153A5B" : "white"}
                      as={"h2"}
                      size="md"
                      my={"0.5rem"}
                      _hover={{ textDecoration: "underline" }}
                    >
                      5 Types of Surgical Instruments <br /> Every Operating
                      Room Should Have
                    </Heading>
                  </Box>

                  <Box my={"20px"}>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar name="Adnan Rauf" src="/assets/Blogs/admin.png" />

                      <Box>
                        <Heading
                          color={colorMode == "light" ? "#153A5B" : "white"}
                          size="sm"
                        >
                          Adnan Rauf
                        </Heading>
                        <Text color={"gray.400"}>March 20 , 2023</Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
