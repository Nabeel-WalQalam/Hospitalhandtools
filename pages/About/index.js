import React from "react";
import Image from "next/image";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Button,
  Icon,
  Box,
  IconProps,
  Text,
  Center,
  Divider,
} from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";
import { ShareButton } from "@/Components/ShareButton/ShareButton";
export default function Index() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box minHeight={"100vh"}>
        <Box mt={"2rem"}>
          <Center>
            <Heading
              color={colorMode === "light" ? "#153A5B" : "white"}
              fontSize={["20", "lg", "lg", "xl"]}
            >
              Hi, we are HospitalHandTools
            </Heading>
          </Center>{" "}
        </Box>
        <Box my={"1rem"}>
          <Center>
            <Text
              textAlign={"center"}
              color={colorMode === "light" ? "gray.600" : "white"}
            >
              HospitalHandTools is the Pakistan's premier manufacturer and{" "}
              supplier of surgical (medical) instruments. We have a
              long-standing <br />
              global reputation for quality, excellence and outstanding service.
            </Text>
          </Center>
        </Box>
        <Flex justify={"center"} width="100%">
          <Image
            src={"/assets/about-us1.jpg"}
            alt={"Tools"}
            width={1000}
            height={100}
          />
        </Flex>

        <Box mt={"3rem"}>
          <Center>
            <Heading color={colorMode === "light" ? "#153A5B" : "white"}>
              Our Mission
            </Heading>
          </Center>
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
              Welcome to our website! We are a team of passionate individuals
              dedicated to making a positive impact in the field of surgical{" "}
              <br />
              instruments. Our mission is to inspire change by developing
              innovative instruments that enhance surgical precision,
              efficiency, and patient outcomes.
            </Text>
          </Center>
        </Box>

        <Box mt={"3rem"}>
          <Center>
            <Heading color={colorMode === "light" ? "#153A5B" : "white"}>
              Inspiring change
            </Heading>
          </Center>
          <Divider
            w={"10%"}
            mt="1rem"
            border={"1px"}
            borderColor={colorMode === "light" ? "#153A5B" : "white"}
            marginInline="auto"
          />
        </Box>
        <Flex
          // border={"1px"}
          direction={["column", "column", "row", "row"]}
          justify="center"
          my={"2rem"}
          mt="4rem"
          align={"center"}
          gap="5rem"
        >
          <Box border={"1px"} borderColor="gray.400">
            <Image
              src="/assets/C_pic_1.png"
              alt="Green double couch with wooden legs"
              width={400}
              height={200}
              priority
            />
          </Box>
          <Flex direction={"column"}>
            <Box mt={"3rem"}>
              <Center>
                <Heading
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  size="md"
                >
                  Our Team: Experts in Surgery, Engineering, and Design
                </Heading>
              </Center>
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
                  We believe that every surgical procedure deserves the best
                  possible tools, and we strive <br /> to create instruments
                  that meet the highest standards of quality and performance.
                  <br /> Our team of experts includes experienced surgeons,
                  engineers, and designers <br /> who work together to develop
                  cutting-edge instruments that are both practical and
                  effective.
                </Text>
              </Center>
            </Box>
          </Flex>
        </Flex>

        {/* //second */}

        <Flex
          direction={["column", "column", "row", "row"]}
          // border={"1px"}
          justify="center"
          my={"2rem"}
          mt="4rem"
          align={"center"}
          gap="5rem"
        >
          <Flex direction={"column"}>
            <Box mt={"3rem"}>
              <Center>
                <Heading
                  textAlign={"center"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  size="md"
                >
                  Continuous Improvement: Adapting to Meet the Needs of our{" "}
                  <br />
                  Customers and Partners
                </Heading>
              </Center>
              <Divider
                w={"20%"}
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
                  We are committed to continuous improvement and are always{" "}
                  <br />
                  seeking new ways to improve our products and services. We
                  welcome feedback <br /> from our customers and partners and
                  are constantly adapting to meet their needs.
                </Text>
              </Center>
            </Box>
          </Flex>
          <Box border={"1px"} borderColor="gray.400">
            <Image
              src="/assets/C_pic_1.png"
              alt="Green double couch with wooden legs"
              width={400}
              height={200}
              priority
            />
          </Box>
        </Flex>

        {/* Third section */}

        <Flex
          direction={["column", "column", "row", "row"]}
          // border={"1px"}
          justify="center"
          my={"2rem"}
          mt="4rem"
          align={"center"}
          gap="5rem"
        >
          <Box border={"1px"} borderColor="gray.400">
            <Image
              src="/assets/C_pic_1.png"
              alt="Green double couch with wooden legs"
              width={400}
              height={200}
              priority
            />
          </Box>
          <Flex direction={"column"}>
            <Box mt={"3rem"}>
              <Center>
                <Heading
                  textAlign={"center"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  size="md"
                >
                  Thank You for Visiting: Joining us in Advancing <br /> the
                  Field of Surgical Instruments
                </Heading>
              </Center>
              <Divider
                w={"20%"}
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
                  Thank you for visiting our website, and we look forward to
                  working with you <br /> to advance the field of surgical
                  instruments and improve patient outcomes.
                </Text>
              </Center>
            </Box>
          </Flex>
        </Flex>

        <Box my={"1rem"}>
          <Box mt={"3rem"}>
            <Center>
              <Heading color={colorMode === "light" ? "#153A5B" : "white"}>
                Any Query!
              </Heading>
            </Center>
            <Divider
              w={"5%"}
              mt="1rem"
              border={"1px"}
              borderColor={colorMode === "light" ? "#153A5B" : "white"}
              marginInline="auto"
            />
          </Box>
          <Flex
            direction={["column", "column", "row", "row"]}
            // border={"1px"}
            justify="center"
            my={"2rem"}
            mt="4rem"
            align={"center"}
            gap="10rem"
          >
            <Flex direction={"column"}>
              <Box my={"1rem"}>
                <UnorderedList lineHeight={"40px"}>
                  <ListItem fontSize={"1rem"}>Info@adasinstrument.com</ListItem>
                  <ListItem fontSize={"1rem"}>adas.surgical@gmail.com</ListItem>
                  <ListItem fontSize={"1rem"}>
                    Call Now: 0092-321-612-6225
                  </ListItem>
                  <ListItem fontSize={"1rem"}>
                    Whatsapp / viber / wechat: 0092-321-612-6225
                  </ListItem>
                  <Text my={"1rem"} fontSize={"1rem"} fontWeight="bold">
                    For Live Chat :
                  </Text>
                  <ListItem fontSize={"1rem"}>adas.surgical@yahoo.com</ListItem>
                  <ListItem fontSize={"1rem"}>
                    adas.surgical@hotmail.com
                  </ListItem>
                </UnorderedList>
                <Box my={"1rem"}>
                  <ShareButton />
                </Box>
              </Box>
            </Flex>
            <Box border={"1px"} borderColor="gray.400">
              <Image
                src="/assets/4016710_218.jpg"
                alt="Contact-Us"
                width={400}
                height={200}
                priority
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
