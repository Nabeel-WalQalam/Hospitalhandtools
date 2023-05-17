import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Avatar,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Badge } from "@chakra-ui/react";

export default function Index() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Box>
        <Center bg={"#153A5B"} py="1rem">
          <Heading
            textAlign={"center"}
            as={"h1"}
            color="white"
            fontSize={["1xl", "2xl", "3xl", "4xl"]}
          >
            5 Types of Surgical Instruments Every Operating Room Should Have
          </Heading>
        </Center>
        <Box fontWeight={"semibold"} textAlign={"center"} color={"gray.600"}>
          By Adnan Rauf March 20 , 2023
        </Box>
        <Flex my={"2rem"} justify={"center"}>
          <Image
            src={"/assets/Blogs/blog1cover.png"}
            alt={"Retractors | Scissors | Forceps"}
            width={800}
            height={100}
          />
        </Flex>
        <Box width={"80%"} marginInline="auto">
          <Text textAlign={"center"} fontSize="1.2rem" fontWeight="semibold">
            Having the proper surgical instruments is crucial while carrying out
            surgical procedures. Having access to the correct tools can make all
            the difference in the result of the treatment, whether you're a{" "}
            surgeon, surgical technician, or nurse. This blog post will discuss
            <br />
            five different types of surgical equipment that every operating room
            needs.
          </Text>
        </Box>

        <Flex
          direction={["column", "column", "row", "row"]}
          marginInline="auto"
          justify="center"
          my={"2rem"}
          mt="4rem"
          align={"center"}
          gap="5rem"
          w={"90%"}
        >
          <Box border={"1px"} borderColor="gray.400">
            <Image
              src="/assets/Blogs/scalpe.png"
              alt="Green double couch with wooden legs"
              width={500}
              height={200}
              priority
            />
          </Box>
          <Flex direction={"column"} width="80%">
            <Box mt={"3rem"}>
              <Link href={"/"}>
                <Center>
                  <Heading
                    _hover={{ textDecoration: "underline" }}
                    textAlign={"center"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    size="md"
                  >
                    Scalpels
                  </Heading>
                </Center>
              </Link>
              <Divider
                w={"10%"}
                mt="1rem"
                border={"1px"}
                borderColor={colorMode === "light" ? "#153A5B" : "white"}
                marginInline="auto"
              />
            </Box>
            <Box my={"1rem"}>
              <Center>
                <Text
                  textAlign={"center"}
                  color={colorMode === "light" ? "gray.600" : "white"}
                >
                  One of the most fundamental and important surgical tools is
                  the scalpel. They are employed to make tissue or skin
                  incisions. <br /> The blade of a scalpel can be straight or
                  curved depending on the technique, and there are many
                  different sizes and shapes available. <br /> Moreover, certain
                  scalpels incorporate a safety feature to guard against
                  unintentional harm.
                </Text>
              </Center>
            </Box>
          </Flex>
        </Flex>

        <Flex
          direction={["column", "column", "row-reverse", "row-reverse"]}
          marginInline="auto"
          justify="center"
          my={"2rem"}
          mt="4rem"
          align={"center"}
          gap="5rem"
          w={"90%"}
        >
          <Box border={"1px"} borderColor="gray.400">
            <Image
              src="/assets/Blogs/forceps.png"
              alt="Green double couch with wooden legs"
              width={500}
              height={200}
              priority
            />
          </Box>
          <Flex direction={"column"} width="80%">
            <Box mt={"3rem"}>
              <Link href={"/"}>
                <Center>
                  <Heading
                    _hover={{ textDecoration: "underline" }}
                    textAlign={"center"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    size="md"
                  >
                    Forceps
                  </Heading>
                </Center>
              </Link>
              <Divider
                w={"10%"}
                mt="1rem"
                border={"1px"}
                borderColor={colorMode === "light" ? "#153A5B" : "white"}
                marginInline="auto"
              />
            </Box>
            <Box my={"1rem"}>
              <Center>
                <Text
                  textAlign={"center"}
                  color={colorMode === "light" ? "gray.600" : "white"}
                >
                  Another essential surgical tool in the operating theatre is a
                  pair of forceps. During a surgical procedure, they are used to
                  grab and hold tissues or other items. <br /> According to the
                  use they are meant for, forceps come in a wide range of sizes
                  and shapes. For instance, a smooth forceps is used to grasp
                  delicate structures like blood vessels, whereas a forceps with
                  teeth is utilised to grasp tissue.
                </Text>
              </Center>
            </Box>
          </Flex>
        </Flex>

        <Flex
          direction={["column", "column", "row", "row"]}
          marginInline="auto"
          justify="center"
          my={"2rem"}
          mt="4rem"
          align={"center"}
          gap="5rem"
          w={"90%"}
        >
          <Box border={"1px"} borderColor="gray.400">
            <Image
              src="/assets/Blogs/sissor.png"
              alt="Green double couch with wooden legs"
              width={500}
              height={200}
              priority
            />
          </Box>
          <Flex direction={"column"} width="80%">
            <Box mt={"3rem"}>
              <Link href={"/"}>
                <Center>
                  <Heading
                    _hover={{ textDecoration: "underline" }}
                    textAlign={"center"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    size="md"
                  >
                    Scissors
                  </Heading>
                </Center>
              </Link>
              <Divider
                w={"10%"}
                mt="1rem"
                border={"1px"}
                borderColor={colorMode === "light" ? "#153A5B" : "white"}
                marginInline="auto"
              />
            </Box>
            <Box my={"1rem"}>
              <Center>
                <Text
                  textAlign={"center"}
                  color={colorMode === "light" ? "gray.600" : "white"}
                >
                  Surgical scissors are used to cut tissue and other materials
                  during surgical procedures. Like other surgical instruments,
                  scissors come in many shapes and sizes. <br /> Straight
                  scissors are used to cut straight lines, while curved scissors
                  are used to cut curves and hard-to-reach places.
                </Text>
              </Center>
            </Box>
          </Flex>
        </Flex>

        <Flex
          direction={["column", "column", "row-reverse", "row-reverse"]}
          marginInline="auto"
          justify="center"
          my={"2rem"}
          mt="4rem"
          align={"center"}
          gap="5rem"
          w={"90%"}
        >
          <Box border={"1px"} borderColor="gray.400">
            <Image
              src="/assets/Blogs/Retractors.png"
              alt="Green double couch with wooden legs"
              width={500}
              height={200}
              priority
            />
          </Box>
          <Flex direction={"column"} width="80%">
            <Box mt={"3rem"}>
              <Link href={"/"}>
                <Center>
                  <Heading
                    _hover={{ textDecoration: "underline" }}
                    textAlign={"center"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    size="md"
                  >
                    Retractors
                  </Heading>
                </Center>
              </Link>
              <Divider
                w={"10%"}
                mt="1rem"
                border={"1px"}
                borderColor={colorMode === "light" ? "#153A5B" : "white"}
                marginInline="auto"
              />
            </Box>
            <Box my={"1rem"}>
              <Center>
                <Text
                  textAlign={"center"}
                  color={colorMode === "light" ? "gray.600" : "white"}
                >
                  Retractors are used to hold tissues and organs in place during
                  surgical procedures. They come in a variety of shapes and
                  sizes, depending on their intended use. <br /> Some retractors
                  are hand-held while others are self-retaining.
                </Text>
              </Center>
            </Box>
          </Flex>
        </Flex>

        <Flex
          direction={["column", "column", "row", "row"]}
          marginInline="auto"
          justify="center"
          my={"2rem"}
          mt="4rem"
          align={"center"}
          gap="5rem"
          w={"90%"}
        >
          <Box border={"1px"} borderColor="gray.400">
            <Image
              src="/assets/Blogs/suction.png"
              alt="Green double couch with wooden legs"
              width={500}
              height={200}
              priority
            />
          </Box>
          <Flex direction={"column"} width="80%">
            <Box mt={"3rem"}>
              <Link href={"/"}>
                <Center>
                  <Heading
                    _hover={{ textDecoration: "underline" }}
                    textAlign={"center"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    size="md"
                  >
                    Suction Devices
                  </Heading>
                </Center>
              </Link>
              <Divider
                w={"10%"}
                mt="1rem"
                border={"1px"}
                borderColor={colorMode === "light" ? "#153A5B" : "white"}
                marginInline="auto"
              />
            </Box>
            <Box my={"1rem"}>
              <Center>
                <Text
                  textAlign={"center"}
                  color={colorMode === "light" ? "gray.600" : "white"}
                >
                  SA suction device is used to remove blood, fluid, or other
                  debris from the surgical site. They are essential for
                  maintaining a clear view of the surgical field and avoiding
                  complications during surgery. <br /> Suction devices come in a
                  variety of sizes and shapes, and some are designed for use on
                  specific areas of the body.
                </Text>
              </Center>
            </Box>
          </Flex>
        </Flex>

        <Flex justify={"center"} align="center" direction={"column"}>
          <Text fontWeight={"bold"} fontSize="1.2rem">
            Conclusion:
          </Text>
          <Text my={"2rem"} fontWeight={"normal"} w="80%" textAlign={"center"}>
            To sum up, using the appropriate surgical instruments is crucial for
            carrying out safe and effective surgical procedures. Instruments
            like suction devices, retractors, scissors, and forceps are just a
            few examples of the kinds of tools every operating room needs.{" "}
            Surgeons and surgical teams can give their patients the best
            treatment possible by having access to these crucial instruments.
          </Text>
        </Flex>
        <Divider my={"2rem"} />
      </Box>
    </>
  );
}
