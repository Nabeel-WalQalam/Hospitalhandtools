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
    // <Flex direction={"column"} align={"center"} justify={"center"}>
    // <Center>
    //   <Heading as="h2" marginTop="5">
    //     From the Blog
    //   </Heading>
    // </Center>

    //   <Divider
    //     width={"10%"}
    //     mx="auto"
    //     border={"2px"}
    //     borderColor={"#153A5B"}
    //     marginTop="3"
    //   />
    //   <Flex
    //     // border={"1px"}
    //     width={["80%", "95%"]}
    //     justify={"center"}
    //     align={"center"}
    //     wrap={"wrap"}
    //     direction={["column", "column", "row", "row"]}
    //     mt={"2rem"}
    //     gap={"2rem"}
    //   >
    //     <Flex
    //       justify={"center"}
    //       align={"center"}
    //       // width={{ base: "100%", sm: "85%" }}
    //       // zIndex="2"
    //       // marginLeft={{ base: "0", sm: "5%" }}
    //       // marginTop="5%"
    //       // border={"1px"}
    //     >
    //       <Link
    //         href={
    //           "/Blogs/5-Types-of-Surgical-Instruments-Every-Operating-Room-Should-Have"
    //         }
    //       >
    //         <Flex justify={"center"} align={"center"}>
    //           <Image
    //             src={"/assets/Blogs/pic1.jpg"}
    //             alt={"Surgons"}
    //             // objectFit="contain"
    //             width="inherit"
    //             transition="0.3s ease-in-out"
    //             _hover={{
    //               transform: "scale(1.05)",
    //             }}
    //             transform="scale(1.0)"
    //           />
    //         </Flex>
    //         <Flex
    //           // justify={"center"}
    //           direction={"column"}
    //           // align={"center"}
    //           my={"1rem"}
    //         >
    //           <Box>
    //             <Flex
    //               //   border={"1px"}
    //               wrap={"wrap"}
    //               // align="s"
    //               // justify="center"
    //               gap={"0.4rem"}
    //               w={"90%"}
    //             >
    //               <Badge fontSize="0.8em" colorScheme={"orange"}>
    //                 surgical instruments
    //               </Badge>
    //               <Badge fontSize="0.8em" colorScheme="green">
    //                 room
    //               </Badge>
    //               <Badge fontSize="0.8em" colorScheme="red">
    //                 essential
    //               </Badge>

    //               <Badge fontSize="0.8em" colorScheme="purple">
    //                 surgical procedures
    //               </Badge>
    //               <Badge fontSize="0.8em" colorScheme="green">
    //                 types
    //               </Badge>
    //             </Flex>
    //           </Box>
    //           <Box>
    //             <Heading
    //               //   color={colorMode == "light" ? "#153A5B" : "white"}
    //               as={"h2"}
    //               size="md"
    //               my={"0.5rem"}
    //               _hover={{ textDecoration: "underline" }}
    //               color={"#153A5B"}
    //             >
    //               5 Types of Surgical Instruments <br /> Every Operating Room
    //               Should Have
    //             </Heading>
    //           </Box>

    //           <Box my={"20px"}>
    //             <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
    //               <Avatar name="Adnan Rauf" src="/assets/Blogs/admin.png" />

    //               <Box>
    //                 <Heading
    //                   //   color={colorMode == "light" ? "#153A5B" : "white"}
    //                   color={"#153A5B"}
    //                   size="sm"
    //                 >
    //                   Adnan Rauf
    //                 </Heading>
    //                 <Text color={"gray.400"}>March 20 , 2023</Text>
    //               </Box>
    //             </Flex>
    //           </Box>
    //         </Flex>
    //       </Link>
    //     </Flex>
    //     <Flex
    //       width={["'80%", "35%"]}
    //       justify={"center"}
    //       align={"center"}
    //       // width={{ base: "100%", sm: "85%" }}
    //       // zIndex="2"
    //       // marginLeft={{ base: "0", sm: "5%" }}
    //       // marginTop="5%"
    //       // border={"1px"}
    //     >
    //       <Link
    //         href={
    //           "/Blogs/Enhancing-Surgical-Precision-A-Comprehensive-Guide-to-Surgical-Instruments"
    //         }
    //       >
    //         <Flex justify={"center"} align={"center"}>
    //           <Image
    //             src={"/assets/Blogs/pic2.jpg"}
    //             alt={"Surgons"}
    //             // objectFit="cover"
    //             width="100%"
    //             height={["220px", "310px"]}
    //             transition="0.3s ease-in-out"
    //             _hover={{
    //               transform: "scale(1.05)",
    //             }}
    //             transform="scale(1.0)"
    //           />
    //         </Flex>
    //         <Flex
    //           // width={"50%"}
    //           // border={"1px"}
    //           // justify={"center"}
    //           direction={"column"}
    //           // align={"center"}
    //           // my={"1rem"}
    //         >
    //           <Flex
    //             wrap={"wrap"}
    //             // align="s"
    //             // justify="center"
    //             gap={"0.4rem"}
    //             w={"90%"}
    //             paddingY={"0.5rem"}
    //           >
    // <Badge fontSize="0.8em" colorScheme={"orange"}>
    //   surgical instruments
    // </Badge>
    // {/* <Badge fontSize="0.8em" colorScheme="green">
    //   Surgical precision
    // </Badge> */}

    // <Badge fontSize="0.8em" colorScheme="red">
    //   Importance of surgical instruments
    // </Badge>

    // <Badge fontSize="0.8em" colorScheme="purple">
    //   surgical procedures
    // </Badge>
    // <Badge fontSize="0.8em" colorScheme="green">
    //   Types of surgical instruments
    // </Badge>
    //           </Flex>

    //           <Box>
    //             <Heading
    //               //   color={colorMode == "light" ? "#153A5B" : "white"}
    //               as={"h2"}
    //               size="md"
    //               my={"0.5rem"}
    //               _hover={{ textDecoration: "underline" }}
    //               color={"#153A5B"}
    //             >
    //               Enhancing Surgical Precision: <br /> A Comprehensive Guide to
    //               Surgical Instruments
    //             </Heading>
    //           </Box>

    //           <Box my={"20px"}>
    //             <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
    //               <Avatar name="Adnan Rauf" src="/assets/Blogs/admin.png" />

    //               <Box>
    //                 <Heading
    //                   //   color={colorMode == "light" ? "#153A5B" : "white"}
    //                   color={"#153A5B"}
    //                   size="sm"
    //                 >
    //                   Adnan Rauf
    //                 </Heading>
    //                 <Text color={"gray.400"}>May 1 , 2023</Text>
    //               </Box>
    //             </Flex>
    //           </Box>
    //         </Flex>
    //       </Link>
    //     </Flex>
    //   </Flex>
    // </Flex>
    <>
      <Center>
        <Heading
          color={"#153A5B"}
          as="h2"
          fontSize={["1rem", "2rem", "2.3rem"]}
          marginTop="5"
        >
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
          // display={["none", "flex"]}
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Flex wrap={"wrap"} gap={"0.5rem"}>
            <Badge size={"md"} colorScheme="gray">
              surgical instruments
            </Badge>

            <Badge fontSize="0.8em" colorScheme="gray">
              Importance of surgical instruments
            </Badge>

            <Badge fontSize="0.8em" colorScheme="gray">
              surgical procedures
            </Badge>
            <Badge fontSize="0.8em" colorScheme="gray">
              Types of surgical instruments
            </Badge>
          </Flex>
          <Heading marginTop="1">
            <Link
              href={
                "/Blogs/5-Types-of-Surgical-Instruments-Every-Operating-Room-Should-Have"
              }
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Text my={"0.2rem"} color={"#153A5B"}>
                5 Types of Surgical Instruments Every Operating Room
              </Text>
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            // px={"2rem"}
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
            px={2}
          >
            Having the proper surgical instruments is crucial while carrying out
            surgical procedures. Having access to the correct tools can make all
            the difference in the result of the treatment, whether you're a
            surgeon, surgical technician, or nurse. This blog post will discuss
            five ....
          </Text>
          <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
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
    </>
  );
};

export default Blogs;
