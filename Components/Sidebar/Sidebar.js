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
  AiOutlineInbox,
} from "react-icons/ai";

import { HiViewGridAdd } from "react-icons/hi";
import {
  BiCategory,
  BiSolidCity,
  BiAddToQueue,
  BiSolidDiscount,
} from "react-icons/bi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdLocationCity } from "react-icons/md";

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
          <Flex
            // border={"1px"}
            justify={"center"}
            //  align="flex-start"
            px="2rem"
            gap="1.5rem"
            direction="column"
          >
            <Link href={"/haniyanasir/admin"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                // _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<AiFillHome />}
                mt={"1rem"}
                color="white"
                variant="none"
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
              >
                Home
              </Button>
            </Link>
            <Link href={"/haniyanasir/admin/allproducts"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<AiOutlineInbox />}
                color="white"
                variant="none"
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
              >
                All Products
              </Button>
            </Link>
            <Link href={"/haniyanasir/admin/addproduct"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<HiViewGridAdd />}
                color="white"
                variant="none"
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
              >
                Add Product
              </Button>
            </Link>
            <Link href={"/haniyanasir/admin/allcategory"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<BiCategory />}
                color="white"
                variant="none"
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
              >
                All Category
              </Button>
            </Link>
            <Link href={"/haniyanasir/admin/addcategory"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<AiOutlineCloudUpload />}
                color="white"
                variant="none"
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
              >
                Add Category
              </Button>
            </Link>
            <Link href={"/haniyanasir/admin/allorders"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<BsFillCartCheckFill />}
                color="white"
                variant="none"
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
              >
                All Orders
              </Button>
            </Link>
            <Link href={"/haniyanasir/admin/allzones"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<MdLocationCity />}
                color="white"
                variant="none"
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
              >
                All Zone
              </Button>
            </Link>
            <Link href={"/haniyanasir/admin/addzone"}>
              <Button
                leftIcon={<BiAddToQueue />}
                color="white"
                variant="none"
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
              >
                Add Zone
              </Button>
            </Link>
            <Link href={"/haniyanasir/admin/allcoupen"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<RiCoupon3Fill />}
                color="white"
                variant="none"
                // textTransform="uppercase"
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
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
              >
                Add Coupen
              </Button>
            </Link>
            <Link href={"/haniyanasir/admin/allAttribute"}>
              <Button
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
                leftIcon={<AiOutlineMenu />}
                color="white"
                variant="none"
                // textTransform="uppercase"
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
                // textTransform="uppercase"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.600", borderRadius: "9px" }}
                _focus={{ bg: "blue.600", borderRadius: "9px" }}
              >
                Add Attribute
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Sidebar;
