import {
  Box,
  Center,
  Flex,
  Text,
  Heading,
  Button,
  Divider,
  InputGroup,
} from "@chakra-ui/react";
import { RiCoupon3Fill } from "react-icons/ri";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  AiOutlineHome,
  AiTwotoneHome,
  AiOutlineUser,
  AiOutlineAppstore,
  AiOutlineMenu,
  AiFillEdit,
  AiOutlineCloudUpload,
  AiOutlineFund,
  AiOutlinePicRight,
  AiFillHome,
} from "react-icons/ai";

const Sidebar = () => {
  return (
    <>
      <Box
        // w={"15%"}
        bg={"#153A5B"}
        // border="1px"
        // borderColor={"gray.800"}
        // position=""
        // height="100vh"
      >
        <Flex direction={"column"}>
          <Center
          //  border="1px" borderColor={"white"}
          >
            <Text
              my="1rem"
              // fontSize={"sm"}
              color={"white"}
              textTransform="uppercase"
            >
              {" "}
            </Text>
          </Center>

          <Flex
            justify={"center"}
            //  align="flex-start"
            direction="column"
          >
            <Link href={"/haniyanasir/admin"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<AiOutlineHome />}
                mt={"1rem"}
                ml={"1rem"}
                color="white"
                variant="none"
                textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
              >
                Home
              </Button>
            </Link>

            <Link href={"/haniyanasir/admin/users"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                ml={"1rem"}
                leftIcon={<AiOutlineUser />}
                color="white"
                fill={"white"}
                variant="none"
                textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
                mb="0.5rem"
              >
                Users
              </Button>
            </Link>

            {/* <Box w={"100%"} my="1rem">
              <Center>
                <Text
                  fontSize={"1.2rem"}
                  color="white"
                  fontWeight={"semibold"}
                  // p="0.5rem"
                  // bg={"white"}
                >
                  components
                </Text>
              </Center>
            </Box> */}
            <Divider />
            <Box>
              <Accordion allowToggle border="none">
                <AccordionItem border="none">
                  <AccordionButton>
                    <Flex
                      // border={"1px"}
                      justify={"space-between"}
                      // width={"100%"}
                      align={"center"}
                      color="white"
                      fill={"white"}
                      textTransform="uppercase"
                      p={"0.5rem"}
                      _hover={{
                        bg: "blue.600",
                        borderRadius: "9px",
                      }}
                    >
                      <AiOutlineAppstore />
                      {/* <Button
                        leftIcon={<AiOutlineAppstore />}
                        color="white"
                        fill={"white"}
                        variant="none"
                        textTransform="uppercase"
                      > */}
                      products
                      {/* </Button> */}
                      <AccordionIcon color={"white"} />
                    </Flex>
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <Link href={"/haniyanasir/admin/allproducts"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiOutlineMenu />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        All Products
                      </Button>
                    </Link>
                    {/* <Link href={"/admin/editproduct"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiFillEdit />}
                        my={"0.5rem"}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        Edit Product
                      </Button>
                    </Link> */}
                    <Link href={"/haniyanasir/admin/addproduct"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiOutlineCloudUpload />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        Add Product
                      </Button>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            {/* add Category */}

            <Box width={"100%"}>
              <Accordion allowToggle width={"100%"} border="none">
                <AccordionItem width={"100%"} border="none">
                  <AccordionButton width={"100%"}>
                    <Flex
                      // border={"1px"}
                      justify={"space-between"}
                      width={"100%"}
                      align={"center"}
                      color="white"
                      fill={"white"}
                      textTransform="uppercase"
                      p={"0.5rem"}
                      _hover={{ bg: "blue.600", borderRadius: "9px" }}
                    >
                      <AiOutlineAppstore />
                      {/* <Button
                        leftIcon={<AiOutlineAppstore />}
                        color="white"
                        fill={"white"}
                        variant="none"
                        textTransform="uppercase"
                      > */}
                      Category
                      {/* </Button> */}
                      <AccordionIcon color={"white"} />
                    </Flex>
                  </AccordionButton>

                  <AccordionPanel pb={4} w="100%">
                    <Link href={"/haniyanasir/admin/allcategory"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiOutlineMenu />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        All Category
                      </Button>
                    </Link>
                    {/* <Link href={"/admin/editcategory"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiFillEdit />}
                        my={"0.5rem"}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        Edit Category
                      </Button>
                    </Link> */}
                    <Link href={"/haniyanasir/admin/addcategory"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiOutlineCloudUpload />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        Add Category
                      </Button>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            <Box width={"100%"}>
              <Accordion allowToggle width={"100%"} border="none">
                <AccordionItem width={"100%"} border="none">
                  <AccordionButton width={"100%"}>
                    <Flex
                      // border={"1px"}
                      justify={"space-between"}
                      width={"100%"}
                      align={"center"}
                      color="white"
                      fill={"white"}
                      textTransform="uppercase"
                      p={"0.5rem"}
                      _hover={{ bg: "blue.600", borderRadius: "9px" }}
                    >
                      <AiOutlineFund />
                      {/* <Button
                        leftIcon={<AiOutlineFund />}
                        color="white"
                        fill={"white"}
                        variant="none"
                        textTransform="uppercase"
                      > */}
                      Orders
                      {/* </Button> */}
                      <AccordionIcon color={"white"} />
                    </Flex>
                  </AccordionButton>

                  <AccordionPanel pb={4} w="100%">
                    <Link href={"/haniyanasir/admin/allorders"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiOutlineMenu />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        All Orders
                      </Button>
                    </Link>
                    {/* <Link href={"/admin/orderdetail"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiOutlinePicRight />}
                        my={"0.5rem"}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        Order Detail
                      </Button>
                    </Link> */}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            <Box w={"100%"} my="1rem">
              <Text
                color="#153A5B"
                fontWeight={"semibold"}
                p="0.5rem"
                bg={"white"}
              >
                Tools
              </Text>
            </Box>
            <Box width={"100%"}>
              <Accordion allowToggle width={"100%"} border="none">
                <AccordionItem width={"100%"} border="none">
                  <AccordionButton width={"100%"}>
                    <Flex
                      // border={"1px"}
                      justify={"space-between"}
                      width={"100%"}
                      align={"center"}
                      color="white"
                      fill={"white"}
                      textTransform="uppercase"
                      p={"0.5rem"}
                      _hover={{ bg: "blue.600", borderRadius: "9px" }}
                    >
                      <AiFillHome />
                      Zone
                      <AccordionIcon color={"white"} />
                    </Flex>
                  </AccordionButton>

                  <AccordionPanel pb={4} w="100%">
                    <Link href={"/haniyanasir/admin/allzones"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiOutlineMenu />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        All Zone
                      </Button>
                    </Link>
                    {/* <Link href={"/admin/editzone"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiFillEdit />}
                        my={"0.5rem"}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        Edit Zone
                      </Button>
                    </Link> */}
                    <Link href={"/haniyanasir/admin/addzone"}>
                      <Button
                        leftIcon={<AiOutlineCloudUpload />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                      >
                        Add Zone
                      </Button>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            <Box width={"100%"}>
              <Accordion allowToggle width={"100%"} border="none">
                <AccordionItem width={"100%"} border="none">
                  <AccordionButton width={"100%"}>
                    <Flex
                      // border={"1px"}
                      justify={"space-between"}
                      width={"100%"}
                      align={"center"}
                      color="white"
                      fill={"white"}
                      textTransform="uppercase"
                      p={"0.5rem"}
                      _hover={{ bg: "blue.600", borderRadius: "9px" }}
                    >
                      <RiCoupon3Fill />
                      Coupen
                      <AccordionIcon color={"white"} />
                    </Flex>
                  </AccordionButton>

                  <AccordionPanel pb={4} w="100%">
                    <Link href={"/haniyanasir/admin/allcoupen"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiOutlineMenu />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        All Coupens
                      </Button>
                    </Link>

                    <Link href={"/haniyanasir/admin/addCoupen"}>
                      <Button
                        leftIcon={<AiOutlineCloudUpload />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                      >
                        Add Coupen
                      </Button>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            <Box width={"100%"}>
              <Accordion allowToggle width={"100%"} border="none">
                <AccordionItem width={"100%"} border="none">
                  <AccordionButton width={"100%"}>
                    <Flex
                      // border={"1px"}
                      justify={"space-between"}
                      width={"100%"}
                      align={"center"}
                      color="white"
                      fill={"white"}
                      textTransform="uppercase"
                      p={"0.5rem"}
                      _hover={{ bg: "blue.600", borderRadius: "9px" }}
                    >
                      <RiCoupon3Fill />
                      Attribute
                      <AccordionIcon color={"white"} />
                    </Flex>
                  </AccordionButton>

                  <AccordionPanel pb={4} w="100%">
                    <Link href={"/haniyanasir/admin/allAttribute"}>
                      <Button
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                        leftIcon={<AiOutlineMenu />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                      >
                        All Attribute
                      </Button>
                    </Link>

                    <Link href={"/haniyanasir/admin/addAttribute"}>
                      <Button
                        leftIcon={<AiOutlineCloudUpload />}
                        color="white"
                        variant="none"
                        textTransform="uppercase"
                        _hover={{ bg: "blue.600" }}
                        _active={{ bg: "blue.600", borderRadius: "9px" }}
                        _focus={{ bg: "blue.600", borderRadius: "9px" }}
                      >
                        Add Attribute
                      </Button>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Sidebar;
