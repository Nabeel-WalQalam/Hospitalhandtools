import { Box, Flex, Image, Text, Tooltip, useToast } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiDollarSign } from "react-icons/fi";
import { AddToCartProduct } from "../ProductModal/AddToCartProduct";
import { MdOutlineCompareArrows } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addProductWishList } from "@/store/wishListSlice";
import { addProduct } from "@/store/compareSlice";

const SubFooterCard = ({ items }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const AddToWishList = (product) => {
    dispatch(addProductWishList(product));
    toast({
      title: "item added to wish list",

      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-left",
    });
  };

  const AddToCompare = (product) => {
    // console.log(product);
    dispatch(addProduct(product));
    toast({
      title: "item added to compare",

      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-left",
    });
  };

  return (
    <Box
      bg={"rgba(255, 255, 255, 1)"}
      borderRadius={"3px"}
      width={"300px"}
      height={"80px"}
    >
      <Flex p={2} gap={"0.4rem"}>
        <Image
          //   border={"1px"}
          alt="pic"
          src={items.image[0].url}
          boxSize={"25%"}
          height={"70px"}
        />
        <Flex direction={"column"}>
          <Text
            color={"#153A5B"}
            fontSize={"14px"}
            fontWeight={"bold"}
            noOfLines={1}
          >
            {items.title}
          </Text>
          <Flex
            align={"center"}
            justify={"left"}
            lineHeight={"1.35"}
            fontSize={"14px"}
          >
            <FiDollarSign />
            <Text fontWeight={"normal"}>
              {items.priceType === "fixed"
                ? items.fixedPrice.toFixed(2)
                : `${items.minPrice.toFixed(2)} - ${items.maxPrice.toFixed(2)}`}
            </Text>
          </Flex>
          <Flex mt={"3px"} gap={"1rem"}>
            <Tooltip label="Add to Wish List" aria-label="Add to Wish List">
              <Box cursor={"pointer"} onClick={() => AddToWishList(items)}>
                <AiOutlineHeart fontSize={"15px"} />
              </Box>
            </Tooltip>
            {items && ( // Add a condition to check if `items` is not null
              <Tooltip label="Add to Cart" aria-label="Add to Cart">
                <Box>
                  <AddToCartProduct
                    variants="none"
                    size="15px"
                    text=""
                    product={items}
                  />
                </Box>
              </Tooltip>
            )}
            <Tooltip
              label="Compare this product"
              aria-label="Compare this product"
            >
              <Box cursor={"pointer"} onClick={() => AddToCompare(items)}>
                <MdOutlineCompareArrows fontSize={"15px"} />
              </Box>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SubFooterCard;
