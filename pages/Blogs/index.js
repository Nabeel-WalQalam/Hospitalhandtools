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
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
// import Image from "next/image";
import { Badge } from "@chakra-ui/react";

export default function Index() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Box paddingY={"4rem"}>
        <Center>
          <Heading as="h2" marginTop="5">
            Stories by HospitalHandTools
          </Heading>
        </Center>
        <Box
          py={"2rem"}
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginTop="5%"
            >
              <Link
                textDecoration="none"
                href={
                  "/Blogs/5-Types-of-Surgical-Instruments-Every-Operating-Room-Should-Have"
                }
                _hover={{ textDecoration: "none" }}
              >
                <Image
                  borderRadius="lg"
                  src={"/assets/Blogs/pic1.jpg"}
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Link>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  "radial(#153A5B 1px, transparent 1px)",
                  "radial(blue.300 1px, transparent 1px)"
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            <Badge size={"md"} variant="solid" colorScheme="orange">
              surgical instruments
            </Badge>

            <Badge fontSize="0.8em" colorScheme="red">
              Importance of surgical instruments
            </Badge>

            <Badge fontSize="0.8em" colorScheme="purple">
              surgical procedures
            </Badge>
            <Badge fontSize="0.8em" colorScheme="green">
              Types of surgical instruments
            </Badge>
            <Heading marginTop="1">
              <Link
                href={
                  "/Blogs/5-Types-of-Surgical-Instruments-Every-Operating-Room-Should-Have"
                }
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                color="#153A5B"
              >
                5 Types of Surgical Instruments Every Operating Room
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              // px={"2rem"}
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              Having the proper surgical instruments is crucial while carrying
              out surgical procedures. Having access to the correct tools can
              make all the difference in the result of the treatment, whether
              you're a surgeon, surgical technician, or nurse. This blog post
              will discuss five ....
            </Text>
            <HStack
              marginTop="2"
              spacing="2"
              display="flex"
              alignItems="center"
            >
              <Image
                borderRadius="full"
                boxSize="40px"
                src="/assets/Blogs/admin.png"
                alt={`Avatar of `}
              />
              <Text fontWeight="medium">Adnan Rauf - CEO</Text>
              <Text>—</Text>
              <Text>May 1 , 2013</Text>
            </HStack>
            {/* <BlogAuthor name="John Doe" date={new Date('2021-04-06T19:01:27Z')} /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
