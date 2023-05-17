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
      <Box minH={"100vh"}>
        <Box>
          <Center bg="#153A5B">
            <Heading color={"white"}>WishList</Heading>
          </Center>{" "}
        </Box>
        {wishListProduct.length ? (
          <>
            <TableContainer width={"90%"} mx="auto" mt={"2rem"}>
              <Table
                variant="striped"
                colorScheme={"facebook"}
                _hover={{ bg: "none" }}
                border="none"
              >
                <Thead bg={"gray.100"} border={"1px"} borderColor="gray.300">
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
                <Tbody>
                  {wishListProduct.map((items) => {
                    return (
                      <Tr bg={"white"}>
                        <Td>
                          <Image
                            src={`${
                              items.image ? items.image : "/assets/logo.svg"
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
                        <Td>
                          $
                          {items.priceType === "fixed"
                            ? items.fixedPrice
                            : items.minPrice - items.maxPrice}
                        </Td>
                        <Td>
                          <Flex align={"center"}>
                            {/* <Button
                              variant={"solid"}
                              fontSize={"1.5rem"}
                              colorScheme="facebook"
                              leftIcon={<HiOutlineShoppingCart />}
                              
                            ></Button> */}
                            <AddToCartProduct product={items} />
                            <CloseButton
                              onClick={() => handleDelete(items._id)}
                              mx={"0.5rem"}
                              bg={"red.500"}
                              as={"Button"}
                              colorScheme="red"
                              size="lg"
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Flex direction={"column"} mt={"2rem"} ml={"3rem"}>
              <Text fontWeight={"semibold"} fontSize={"2xl"}>
                Your wish list is empty.
              </Text>

              <Link href={"/"}>
                <Button width={"40%"} mt={"1rem"} colorScheme="facebook">
                  Shop Now
                </Button>
              </Link>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
}
