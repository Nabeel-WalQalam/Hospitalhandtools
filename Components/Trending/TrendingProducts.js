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

export const TrendingProducts = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  // localStorage.getItem("chakra-ui-color-mode")
  return (
    <>
      {/*
       <Center display={"flex"} flexDirection="column">
        <Heading color={colorMode === "light" ? "#153A5B" : "white"}>
          Top Categories
        </Heading>
        <Divider
          my={"0.5rem"}
          border={"2px"}
          borderColor="#153A5B"
          width={"7%"}
        />
      </Center>

      <Flex
        wrap={"wrap"}
        my={"3rem"}
        gap={["2rem", "3rem", "3rem", "7rem"]}
        justify={"center"}
        align="center"
        className="Card_Wrapper"
      >
        <Box className="hero_Card" borderRadius={"8px"}>
          <Image
            src={"/assets/mamplasty-cat-image1.jpg"}
            width={300}
            height={100}
            alt={"Mammoplasty"}
          />
          <Box className="info">
            <Heading color={"#153A5B"}>Mammoplasty</Heading>
            <Text
              color={"#153A5B"}
              letterSpacing={"1px"}
              fontSize="15px"
              marginTop={"8px"}
              fontWeight="semibold"
            >
              Rebuild your confidence, one procedure at a time.
            </Text>
            <Link href="/plastic-surgery-instruments">
              <Button
                mt="8"
                width={"100%"}
                bg={"#153A5B"}
                color="white"
                border={"1px solid #153A5B"}
                _hover={{ bg: "#153A5B", color: "white" }}
                size="lg"
                // height="14"
                px="8"
                fontSize="md"
                fontWeight="bold"
              >
                Shop Now
              </Button>
            </Link>
          </Box>
        </Box>
        <Box border={"1px"} borderColor="gray.100" className="hero_Card">
          <Image
            src={"/assets/ENT-HPIC.jpg"}
            width={300}
            height={100}
            alt={"Liposuction"}
          />
          <Box className="info">
            <Heading color={"#153A5B"} margin={"0px"}>
              ENT Instruments
            </Heading>
            <Text
              marginBottom={"20px"}
              letterSpacing={"1px"}
              fontSize="15px"
              marginTop={"8px"}
              color={"#153A5B"}
              fontWeight="semibold"
            >
              Precision tools for better ear, nose, and throat health.
            </Text>
            <Link href="/ent-instruments">
              <Button
                mt="8"
                width={"100%"}
                bg={"#153A5B"}
                color="white"
                border={"1px solid #153A5B"}
                _hover={{ bg: "#153A5B", color: "white" }}
                size="lg"
                // height="14"
                px="8"
                fontSize="md"
                fontWeight="bold"
              >
                Shop Now
              </Button>
            </Link>
          </Box>
        </Box>
        <Box className="hero_Card">
          <Image
            src={"/assets/super-hanlde.jpg"}
            width={300}
            height={100}
            alt={"super-hanlde"}
          />
          <Box className="info">
            <Heading color={"white"} margin={"0px"}>
              Liposuction
            </Heading>
            <Text
              letterSpacing={"1px"}
              fontSize="15px"
              marginTop={"8px"}
              color={"#white"}
              fontWeight="semibold"
            >
              Achieve the body you've <br /> always wanted with Liposuction.
            </Text>
            <Link href="/liposuction-cannula-and-accessories">
              <Button
                mt="8"
                width={"100%"}
                bg={"#153A5B"}
                color="white"
                border={"1px solid #153A5B"}
                _hover={{ bg: "#153A5B", color: "white" }}
                size="lg"
                // height="14"
                px="8"
                fontSize="md"
                fontWeight="bold"
              >
                Shop Now
              </Button>
            </Link>
          </Box>
        </Box>
      </Flex> */}
      <Box>
        <Center>
          <Heading
            size={"lg"}
            color={colorMode === "light" ? "#153A5B" : "white"}
          >
            Top Categories
          </Heading>
        </Center>
        <Divider
          my={"0.5rem"}
          border={"2px"}
          borderColor="#153A5B"
          width={"7%"}
          mx={"auto"}
        />
      </Box>
      <Flex
        gap="1.5rem"
        my={"2rem"}
        justify={"center"}
        align={"center"}
        wrap={"wrap"}
        // border={"1px"}
      >
        <Box
          border={"1px"}
          borderColor={"gray.200"}
          pos={"relative"}
          overflow="hidden"
          boxShadow={"base"}
        >
          <Image
            transform="scale(1.0)"
            src={"/assets/mamplasty-cat-image1.jpg"}
            alt="some text"
            objectFit="contain"
            // width="300px"
            height={"250px"}
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
            bottom={"0px"}
            left={"0px"}
            // mx={"auto"}
            w={"100%"}
            bg="#153A5B"
            color={"white"}
          >
            <Center>Mammoplasty</Center>
          </Text>
        </Box>
        <Link href={"/ent-instruments"}>
          <Box
            border={"1px"}
            borderColor={"gray.200"}
            pos={"relative"}
            overflow="hidden"
            boxShadow={"base"}
          >
            <Image
              transform="scale(1.0)"
              src={"/assets/ENT-HPIC.jpg"}
              alt="some text"
              objectFit="contain"
              // width="300px"
              height={"250px"}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
              // pos={"relative"}
            />
            <Text
              // border={"1px"}
              pos={"absolute"}
              bottom={"0px"}
              left={"0px"}
              // mx={"auto"}
              w={"100%"}
              bg="#153A5B"
              color={"white"}
              as="div"
            >
              <Center>Ent Instruments</Center>
            </Text>
          </Box>
        </Link>
        <Link href={"/liposuction-cannula-and-accessories"}>
          <Box
            border={"1px"}
            borderColor={"gray.200"}
            pos={"relative"}
            overflow="hidden"
            boxShadow={"base"}
          >
            <Image
              transform="scale(1.0)"
              src={"/assets/super-hanlde.jpg"}
              alt="some text"
              objectFit="contain"
              // width="300px"
              height={"250px"}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
              // pos={"relative"}
            />
            <Text
              as="div"
              // border={"1px"}
              pos={"absolute"}
              bottom={"0px"}
              left={"0px"}
              // mx={"auto"}
              w={"100%"}
              bg="#153A5B"
              color={"white"}
            >
              <Center>Liposuction</Center>
            </Text>
          </Box>
        </Link>
        <Link href={"/instruments-sets"}>
          <Box
            border={"1px"}
            borderColor={"gray.200"}
            pos={"relative"}
            overflow="hidden"
            boxShadow={"base"}
          >
            <Image
              transform="scale(1.0)"
              src={"/assets/INSTRUMENTS SETS.jpg"}
              alt="some text"
              objectFit="contain"
              // width="300px"
              height={"250px"}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
              // pos={"relative"}
            />
            <Text
              // border={"1px"}
              pos={"absolute"}
              bottom={"0px"}
              left={"0px"}
              // mx={"auto"}
              w={"100%"}
              bg="#153A5B"
              color={"white"}
              as="div"
            >
              <Center>INSTRUMENTS SETS</Center>
            </Text>
          </Box>
        </Link>
      </Flex>
    </>
  );
};
