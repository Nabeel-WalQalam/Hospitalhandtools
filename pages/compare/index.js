import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  Button,
  Flex,
  Image,
  Text,
  Box,
  Center,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  CloseButton,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import { removeProduct } from "@/store/compareSlice";
import { addToCart } from "@/store/cartSlice";
import { AddToCartProduct } from "@/Components/ProductModal/AddToCartProduct";
import BreadCrumb from "@/Components/Shared/BreadCrumb";
export default function Compare() {
  const toast = useToast();
  const dispatch = useDispatch();
  const compareProduct = useSelector((state) => state.compare.product);
  //   console.log(compareProduct);

  const handleRemove = (key) => {
    dispatch(removeProduct(key));
  };

  const handleCart = async (product) => {
    // console.log(product);
    dispatch(addToCart(product));
    toast({
      title: "item added to cart",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box id="DIV_1">
        <Box id="DIV_2">
          <Box bg={"#EFF1F4"} p="0.8rem">
            <BreadCrumb>Product Comparison</BreadCrumb>
          </Box>
          <Box width={"85%"} mx="auto" mt={"1rem"}>
            <Heading>Product Comparison</Heading>
          </Box>

          {compareProduct.length ? (
            <>
              <Box
                mt="1rem"
                border={"1px"}
                borderColor={"gray.200"}
                width={"85%"}
                mx={"auto"}
                id="DIV_4"
                mb="3rem"
              >
                <Table id="TABLE_5">
                  <Thead bg={"lightgray.100"} id="THEAD_6">
                    <Tr bg={"gray.300"} id="TR_7">
                      <Td colspan="4" id="TD_8">
                        <strong id="STRONG_9">Product Details</strong>
                      </Td>
                    </Tr>
                  </Thead>
                  <Tbody id="TBODY_10">
                    <Tr id="TR_11">
                      <Td id="TD_12">Product</Td>

                      {compareProduct.map((items) => {
                        let categorySlug = items.category.replace(/\s+/g, "-");
                        let Slug = items.slug.replace(/\s+/g, "-");
                        let titleSlug = items.title.replace(/\s+/g, "-");

                        console.log(items);
                        return (
                          <Td id="TD_13">
                            <Link
                              href={`/${categorySlug}/${Slug}/${titleSlug}`}
                              id="A_14"
                            >
                              <strong id="STRONG_15">
                                {items.title ? items.title : ""}
                              </strong>
                            </Link>
                          </Td>
                        );
                      })}
                    </Tr>
                    <Tr id="TR_22">
                      <Td id="TD_23">Image</Td>

                      {compareProduct.map((items) => {
                        return (
                          <Td>
                            <Image
                              src={`${
                                items.image
                                  ? items.image[0].url
                                  : "/assets/logo.svg"
                              }`}
                              alt={items.title}
                              boxSize={"90px"}
                              // id="IMG_25"
                            />
                          </Td>
                        );
                      })}
                    </Tr>
                    <Tr id="TR_30">
                      <Td id="TD_31">Price</Td>
                      {compareProduct.map((items) => {
                        return (
                          <Td id="TD_32">
                            $
                            {items.priceType === "fixed"
                              ? items.fixedPrice
                              : `${items.minPrice} - ${items.maxPrice}`}
                          </Td>
                        );
                      })}
                    </Tr>
                    <Tr id="TR_35">
                      <Td id="TD_36">Model</Td>
                      {compareProduct.map((items) => {
                        return <Td id="TD_32">{items.model}</Td>;
                      })}
                    </Tr>
                    <Tr id="TR_40">
                      <Td id="TD_41">Brand</Td>
                      <Td id="TD_42"></Td>
                      <Td id="TD_43"></Td>
                      <Td id="TD_44"></Td>
                    </Tr>
                    <Tr id="TR_45">
                      <Td id="TD_46">Availability</Td>
                      {compareProduct.map((items) => {
                        return (
                          <Td id="TD_32">
                            {items.backOrder ? "Pre-Order" : items.quantity}
                          </Td>
                        );
                      })}
                    </Tr>

                    <Tr id="TR_88">
                      <Td id="TD_89">Summary</Td>

                      {compareProduct.map((items) => {
                        return (
                          <Td id="TD_90">
                            {ReactHtmlParser(items.short_description)}
                          </Td>
                        );
                      })}
                    </Tr>
                    <Tr id="TR_93">
                      <Td id="TD_94">Weight</Td>

                      {compareProduct.map((items) => {
                        return <Td id="TD_95">{items.weight}kg</Td>;
                      })}
                    </Tr>
                  </Tbody>

                  <Tfoot id="TFOOT_123">
                    <Tr id="TR_124">
                      <Td id="TD_125"></Td>
                      {compareProduct.map((items) => {
                        return (
                          <Td id="TD_132">
                            <Flex id="DIV_133">
                              <Box
                                cursor={"pointer"}
                                bg={"#153A5B"}
                                p={2}
                                color={"white"}
                              >
                                <AddToCartProduct product={items} />
                              </Box>

                              <CloseButton
                                onClick={() => handleRemove(items._id.$oid)}
                                mx={"0.5rem"}
                                bg={"red.500"}
                                // as={"Button"}
                                borderRadius={"none"}
                                color="white"
                                size="md"
                              />

                              {/* </Link> */}
                            </Flex>
                          </Td>
                        );
                      })}
                    </Tr>
                  </Tfoot>
                </Table>
              </Box>
            </>
          ) : (
            <>
              <Flex width={"85%"} mx={"auto"} direction={"column"}>
                <Text
                  fontSize={"1.3rem"}
                  mt={"1rem"}
                  fontWeight={"medium"}
                  color={"gray.600"}
                >
                  You have not chosen any products to compare.
                </Text>
                <Link href={"/"}>
                  <Box>
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
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
