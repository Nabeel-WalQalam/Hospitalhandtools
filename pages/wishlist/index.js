import React, { useState, useEffect } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorMode,
  Box,
  Text,
  Flex,
  Center,
  Heading,
  Button,
  Image,
  CloseButton,
} from "@chakra-ui/react";
import { HiOutlineShoppingCart } from "react-icons/hi";
// import Image from "next/image";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductWishList,
  removeProductWishList,
} from "@/store/wishListSlice";
import { Modalproduct } from "@/Components/ProductModal/Modalproduct";
import secureLocalStorage from "react-secure-storage";
import { AddToCartProduct } from "@/Components/ProductModal/AddToCartProduct";
import BreadCrumb from "@/Components/Shared/BreadCrumb";

export default function Index() {
  const dispatch = useDispatch();
  const wishListProduct = useSelector((state) => state.wishList.wishList);
  console.log(wishListProduct);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [filterWishlist, setfilterWishlist] = useState([]);

  const handleDelete = (key) => {
    dispatch(removeProductWishList(key));
    toast({
      title: "item Deleted",

      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-left",
    });
  };

  return (
    <>
      <Box>
        <Box bg={"#EFF1F4"} p="0.8rem">
          <BreadCrumb>My Wish List</BreadCrumb>
        </Box>
        <Box width={"85%"} mx="auto" mt={"1rem"}>
          <Heading>My Wish List</Heading>
        </Box>
        {wishListProduct.length ? (
          <>
            <TableContainer
              border={"1px"}
              borderColor={"gray.200"}
              width={"85%"}
              mx="auto"
              mt={"2rem"}
            >
              <Table
                // variant="striped"
                // colorScheme={"facebook"}
                // _hover={{ bg: "none" }}
                border="none"
              >
                <Thead bg={"gray.100"} border={"1px"} borderColor="gray.100">
                  <Tr>
                    <Th
                      color={colorMode === "light" ? "#white" : "white"}
                      fontWeight="bold"
                    >
                      Image
                    </Th>
                    <Th
                      color={colorMode === "light" ? "#white" : "white"}
                      fontWeight="bold"
                    >
                      Title
                    </Th>
                    <Th
                      color={colorMode === "light" ? "#white" : "white"}
                      fontWeight="bold"
                    >
                      Model
                    </Th>
                    <Th
                      color={colorMode === "light" ? "#white" : "white"}
                      fontWeight="bold"
                    >
                      Stock
                    </Th>
                    <Th
                      color={colorMode === "light" ? "#white" : "white"}
                      fontWeight="bold"
                    >
                      Unit Price
                    </Th>

                    <Th
                      color={colorMode === "light" ? "#white" : "white"}
                      fontWeight="bold"
                    >
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody bg={"white"}>
                  {wishListProduct.map((items) => {
                    return (
                      <Tr key={items._id}>
                        <Td>
                          <Image
                            boxSize={"90px"}
                            src={`${
                              items.image
                                ? items.image[0].url
                                : "/assets/logo.svg"
                            }`}
                            alt={items.title}
                          />
                        </Td>
                        <Td>{items.title ? items.title : ""}</Td>
                        <Td>{items.model}</Td>
                        <Td>
                          {items.backOrder ? (
                            <Text color={"red.400"}>Pre-Order</Text>
                          ) : (
                            <Text color={"green"}>In-Stock</Text>
                          )}
                        </Td>
                        <Td fontWeight={"semibold"}>
                          $
                          {items.priceType === "fixed"
                            ? items.fixedPrice
                            : `${items.minPrice} - ${items.maxPrice}`}
                        </Td>
                        <Td>
                          <Flex align={"center"}>
                            {/* <Button
                              variant={"solid"}
                              fontSize={"1.5rem"}
                              colorScheme="facebook"
                              leftIcon={<HiOutlineShoppingCart />}
                              
                            ></Button> */}
                            <Box
                              cursor={"pointer"}
                              bg={"#153A5B"}
                              p={2}
                              color={"white"}
                            >
                              <AddToCartProduct product={items} />
                            </Box>
                            <CloseButton
                              onClick={() => handleDelete(items._id.$oid)}
                              mx={"0.5rem"}
                              bg={"red.500"}
                              as={"Button"}
                              borderRadius={"none"}
                              color="white"
                              size="md"
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>

            <Link href={"/"}>
              <Box width={"85%"} mx={"auto"}>
                <Button
                  _hover={{
                    shadow: "2xl",
                  }}
                  width={"100%"}
                  borderRadius={"none"}
                  bg="#153A5B"
                  color={"white"}
                  my="1.5rem"
                  textTransform={"uppercase"}
                >
                  Continue
                </Button>
              </Box>
            </Link>
          </>
        ) : (
          <>
            <Flex
              width={"85%"}
              // border={"1px"}
              mx="auto"
              direction={"column"}
              mt={"1rem"}
            >
              <Text
                width={"100%"}
                fontWeight={"medium"}
                color={"gray.600"}
                fontSize={"2xl"}
              >
                Your wish list is empty.
              </Text>
            </Flex>
            <Link href={"/"}>
              <Box width={"85%"} mx={"auto"}>
                <Button
                  _hover={{
                    shadow: "2xl",
                  }}
                  width={"100%"}
                  borderRadius={"none"}
                  bg="#153A5B"
                  color={"white"}
                  my="1.5rem"
                  textTransform={"uppercase"}
                >
                  Continue
                </Button>
              </Box>
            </Link>
          </>
        )}
      </Box>
    </>
  );
}
