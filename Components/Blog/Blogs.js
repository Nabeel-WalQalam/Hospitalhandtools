//
import React from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Center,
  Badge,
  useColorMode,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";

const Blogs = () => {
  const colorMode = useColorMode();
  return (
    <Flex direction={"column"} align={"center"} justify={"center"}>
      <Center>
        <Heading as="h2" marginTop="5">
          From the Blog
        </Heading>
      </Center>

      <Divider
        width={"10%"}
        mx="auto"
        border={"2px"}
        borderColor={"#153A5B"}
        marginTop="3"
      />
      <Flex
        // border={"1px"}
        width={["80%", "95%"]}
        justify={"center"}
        align={"center"}
        wrap={"wrap"}
        direction={["column", "column", "row"]}
        mt={"2rem"}
        gap={"2rem"}
      >
        <Flex
          justify={"center"}
          align={"center"}
          // width={{ base: "100%", sm: "85%" }}
          // zIndex="2"
          // marginLeft={{ base: "0", sm: "5%" }}
          // marginTop="5%"
          // border={"1px"}
        >
          <Link
            href={
              "/Blogs/5-Types-of-Surgical-Instruments-Every-Operating-Room-Should-Have"
            }
          >
            <Flex justify={"center"} align={"center"}>
              <Image
                src={"/assets/Blogs/pic1.jpg"}
                alt={"Surgons"}
                // objectFit="contain"
                width="inherit"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
                transform="scale(1.0)"
              />
            </Flex>
            <Flex
              // justify={"center"}
              direction={"column"}
              // align={"center"}
              my={"1rem"}
            >
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
                  //   color={colorMode == "light" ? "#153A5B" : "white"}
                  as={"h2"}
                  size="md"
                  my={"0.5rem"}
                  _hover={{ textDecoration: "underline" }}
                  color={"#153A5B"}
                >
                  5 Types of Surgical Instruments <br /> Every Operating Room
                  Should Have
                </Heading>
              </Box>

              <Box my={"20px"}>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name="Adnan Rauf" src="/assets/Blogs/admin.png" />

                  <Box>
                    <Heading
                      //   color={colorMode == "light" ? "#153A5B" : "white"}
                      color={"#153A5B"}
                      size="sm"
                    >
                      Adnan Rauf
                    </Heading>
                    <Text color={"gray.400"}>March 20 , 2023</Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Link>
        </Flex>
        <Flex
          justify={"center"}
          align={"center"}
          // width={{ base: "100%", sm: "85%" }}
          // zIndex="2"
          // marginLeft={{ base: "0", sm: "5%" }}
          // marginTop="5%"
          // border={"1px"}
        >
          <Link
            href={
              "/Blogs/5-Types-of-Surgical-Instruments-Every-Operating-Room-Should-Have"
            }
          >
            <Flex justify={"center"} align={"center"}>
              <Image
                src={"/assets/Blogs/pic1.jpg"}
                alt={"Surgons"}
                // objectFit="contain"
                width="inherit"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
                transform="scale(1.0)"
              />
            </Flex>
            <Flex
              // justify={"center"}
              direction={"column"}
              // align={"center"}
              my={"1rem"}
            >
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
                  //   color={colorMode == "light" ? "#153A5B" : "white"}
                  as={"h2"}
                  size="md"
                  my={"0.5rem"}
                  _hover={{ textDecoration: "underline" }}
                  color={"#153A5B"}
                >
                  5 Types of Surgical Instruments <br /> Every Operating Room
                  Should Have
                </Heading>
              </Box>

              <Box my={"20px"}>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name="Adnan Rauf" src="/assets/Blogs/admin.png" />

                  <Box>
                    <Heading
                      //   color={colorMode == "light" ? "#153A5B" : "white"}
                      color={"#153A5B"}
                      size="sm"
                    >
                      Adnan Rauf
                    </Heading>
                    <Text color={"gray.400"}>March 20 , 2023</Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Blogs;
