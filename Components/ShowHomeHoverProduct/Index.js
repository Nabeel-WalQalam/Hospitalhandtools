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
import { BsCart } from "react-icons/bs";
import { AddToCartProduct } from "../ProductModal/AddToCartProduct";

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
          // border={"1px"}
          marginTop={"1rem"}
          direction={"column"}
          align={"center"}
          justify={"center"}
        >
          <Box
            my={"1rem"}
            // border="1px"
            bg="gray.100"
            // p={4}
            // my={"1rem"}
            // m={2}
            pos={"relative"}
            width={"300px"}
            height={"275px"}
            border={"1px"}
            borderColor={"gray.200"}
            // onMouseEnter={() => handleHover(product.id)}
            // onMouseEnter={setShowOptions(true)}
            // onMouseLeave={setShowOptions(false)}
            //   _hover={{ border: "1px" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // zIndex={"-1"}
            // w={"100%"}
          >
            {/* <Box>{product._id}</Box> */}
            <Box>
              <Image
                src={product.image ? product.image : "/assets/logo.svg"}
                alt="product-1"
                fill={"auto"}
              />
            </Box>
            {showOptions ? (
              <Box
                pos={"absolute"}
                bottom={"2.1rem"}
                left={"1.5rem"}
                bg={"white"}
                w={"80%"}
                marginInline={"auto"}
                py={"0.4rem"}
                borderRadius={"9px"}
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
                      width={"80%"}
                      mx={"auto"}
                      // borderColor={"white"}
                      justify={"space-between"}
                      // gap={"4rem"}
                      align={"center"}
                      // mx={"1rem"}
                    >
                      <Box>
                        <Tooltip
                          label="add to Wish List"
                          aria-label="add to Wish List"
                          // bg={"white"}
                          // color={"#153A5B"}
                        >
                          <Button variant={"ghost"}>
                            <AiOutlineHeart
                              // color="white"
                              fontSize={"1.4rem"}
                              onClick={() => AddToWishList(product)}
                            />
                          </Button>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Tooltip
                          label="add to cart"
                          aria-label="add to cart"
                          // bg={"white"}
                          // color={"#153A5B"}
                        >
                          <Button
                            // border={"1px"}
                            // borderColor={"white"}
                            // borderRadius={"50%"}
                            align={"center"}
                            // as={"Button"}
                            variant={"ghost"}

                            // _hover={{
                            //   color: "red",
                            // }}
                            // onClick={() => AddToCompare(product)}
                          >
                            {/* <BsCart
                              // id="compareIcon"

                              // color="white"
                              // fontSize={"0.5rem"}

                              fontSize={"1.4rem"}
                            /> */}
                            <AddToCartProduct
                              variants={"ghost"}
                              text={""}
                              product={product}
                            />
                          </Button>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Tooltip
                          label="compare this product"
                          aria-label="compare product"
                          // bg={"white"}
                          // color={"#153A5B"}
                        >
                          <Button
                            // border={"1px"}
                            // borderColor={"black"}
                            // borderRadius={"50%"}
                            align={"center"}
                            variant={"ghost"}
                            // _hover={{
                            //   color: "red",
                            // }}
                            onClick={() => AddToCompare(product)}
                          >
                            <MdOutlineCompareArrows
                              // id="compareIcon"
                              // color="white"
                              // fontSize={"0.5rem"}

                              fontSize={"1.4rem"}
                            />
                          </Button>
                        </Tooltip>
                      </Box>
                    </Flex>
                  </motion.div>
                </AnimatePresence>
              </Box>
            ) : (
              ""
            )}

            <Box
              bg={"rgba(247, 245, 245, 0.7)"}
              bottom={"0px"}
              pos={"absolute"}
              width={"100%"}
              left={"0px"}
              textAlign={"center"}
              textDecor={"underline"}
              py={"0.2rem"}
              // color={"gray.600"}
              // border={"1px"}
              // position={"relative"}
            >
              {product.category}
            </Box>
          </Box>
          <Box>
            <Box
              // pos={"relative"}
              // bottom={"-0.5rem"}
              textAlign={"center"}
              fontSize={"1rem"}
              fontWeight={"semibold"}
              // color={"#153A5B"}
              width={"90%"}
              mx="auto"
              // left={"0rem"}
              // bg={"red"}
              // zIndex={"99999999"}
              // border={"1px"}
              // style={{ zIndex: "99999999 !important" }}
            >
              {product.title}
            </Box>
            <Box
              // pos={"absolute"}
              // bottom={"-3.5rem"}
              // mt={"0.2rem"}
              textAlign={"center"}
              fontSize={"1rem"}
              fontWeight={"normal"}
              // color={"#153A5B"}
              width={"100%"}
              // left={"0px"}
              // border={"1px"}
            >
              ${" "}
              {product.priceType === "fixed"
                ? product.fixedPrice.toFixed(2)
                : `${product.minPrice} - ${product.maxPrice}`}
            </Box>
          </Box>
        </Flex>
      </motion.div>
    </>
  );
};

export default Index;
