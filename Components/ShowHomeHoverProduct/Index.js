import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Center,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineCompareArrows } from "react-icons/md";
import Image from "next/image";
import { Modalproduct } from "../ProductModal/Modalproduct";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "@/store/compareSlice";
import { addProductWishList } from "@/store/wishListSlice";
import { BsCart, BsFillSuitHeartFill, BsHeart } from "react-icons/bs";
import { AddToCartProduct } from "../ProductModal/AddToCartProduct";
import Link from "next/link";
import { BiDollar } from "react-icons/bi";

const Index = ({ product }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  // console.log("now", product);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const AddToCompare = (product) => {
    // console.log(product);
    dispatch(addProduct(product));
    toast({
      title: "Item added to Compare",

      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-left",
    });
  };

  const AddToWishList = (product) => {
    dispatch(addProductWishList(product));
    toast({
      title: "Item added to Wish List",

      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-left",
    });
  };
  return (
    <>
      <motion.div
        key={product._id}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
      >
        <Flex
          cursor={"pointer"}
          // border={"1px"}
          // marginTop={"1rem"}
          direction={"column"}
          align={"center"}
          justify={"center"}

          // border={"1px"}
        >
          <Flex
            my={"0.5rem"}
            // border="1px"
            bg="gray.100"
            // p={4}
            // my={"1rem"}
            // m={2}
            pos={"relative"}
            width={"305px"}
            height={"305px"}
            gap={"2rem"}
            // border={"1px"}
            // borderColor={"gray.100"}
            // onMouseEnter={() => handleHover(product.id)}
            // onMouseEnter={setShowOptions(true)}
            // onMouseLeave={setShowOptions(false)}
            //   _hover={{ border: "1px" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // zIndex={"-1"}
            // w={"100%"}
            shadow={"base"}
          >
            {/* <Box>{product._id}</Box> */}
            <Box>
              <Image
                src={product.image ? product.image[0].url : "/assets/logo.svg"}
                alt="product-1"
                fill={"auto"}
              />
            </Box>
            {showOptions ? (
              <Box
                pos={"absolute"}
                bottom={"2.2rem"}
                left={"1.5rem"}
                bg={"#335370"}
                w={"80%"}
                marginInline={"auto"}
                py={"0.4rem"}
                borderRadius={"9px"}
                // border={"1px"}
              >
                <AnimatePresence>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                  >
                    <Flex
                      // border={"1px"}
                      width={"70%"}
                      mx={"auto"}
                      // borderColor={"white"}
                      justify={"space-between"}
                      // gap={"4rem"}
                      align={"center"}
                      // mx={"1rem"}
                    >
                      <Box onClick={() => AddToWishList(product)}>
                        <BsHeart color="white" fontSize={"1.4rem"} />
                      </Box>
                      <Box color={"#153A5B"}>
                        {/* <BsCart
                              // id="compareIcon"

                              color="white"
                              // fontSize={"0.5rem"}

                              fontSize={"1.4rem"}
                            /> */}
                        <AddToCartProduct
                          variants={"none"}
                          size={"25px"}
                          color={"white"}
                          text={""}
                          product={product}
                        />
                      </Box>
                      <Box
                        border={"1px"}
                        borderRadius={"50px"}
                        // borderWidth={"2px"}
                        borderColor={"white"}
                        // bg={"#153A5B"}
                        onClick={() => AddToCompare(product)}
                      >
                        <MdOutlineCompareArrows
                          // id="compareIcon"
                          color="white"
                          fontSize={"1.2rem"}
                        />
                      </Box>
                    </Flex>
                  </motion.div>
                </AnimatePresence>
              </Box>
            ) : (
              ""
            )}

            <Link href={"#"}>
              <Box
                as="u"
                bg={"rgba(247, 245, 245, 0.7)"}
                bottom={"0px"}
                pos={"absolute"}
                width={"100%"}
                left={"0px"}
                textAlign={"center"}
                // textDecor={"underline"}
                textTransform={"capitalize"}
                py={"0.2rem"}
                color={"rgba(105, 105, 115, 1)"}
                // border={"1px"}
                // position={"relative"}
              >
                {product.category}
              </Box>
            </Link>
          </Flex>
          <Box>
            <Box
              // pos={"relative"}
              // bottom={"-0.5rem"}
              textAlign={"center"}
              fontSize={"0.9rem"}
              fontWeight={"bold"}
              // color={"#153A5B"}
              width={"100%"}
              noOfLines={1}
              // mx="auto"
              // left={"0rem"}
              // bg={"red"}
              // zIndex={"99999999"}
              // border={"1px"}
              // style={{ zIndex: "99999999 !important" }}
            >
              {product.title}
            </Box>
            <Flex
              // pos={"absolute"}
              // bottom={"-3.5rem"}
              // mt={"0.2rem"}
              // textAlign={"center"}
              // fontSize={"1rem"}
              // fontWeight={"medium"}
              // color={"gray.200"}
              width={"100%"}
              // left={"0px"}
              // border={"1px"}
              justify={"center"}
              align={"center"}
            >
              <BiDollar fontWeight={"sm"} />
              <Text fontWeight={"normal"}>
                {product.priceType === "fixed"
                  ? product.fixedPrice.toFixed(2)
                  : `${product.minPrice.toFixed(
                      2
                    )} - ${product.maxPrice.toFixed(2)}`}
              </Text>{" "}
            </Flex>
          </Box>
        </Flex>
      </motion.div>
    </>
  );
};

export default Index;
