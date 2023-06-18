import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  Select,
  Flex,
  useColorMode,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { buyNow } from "@/store/cartSlice";
import { FiShoppingCart } from "react-icons/fi";

export const Modalproduct = ({ product }) => {
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const Router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [combinationSet, setcombinationSet] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [cartslug, setcartslug] = useState("");
  const [adding, setadding] = useState(false);
  const dispatch = useDispatch();

  console.log("products", product);

  const handleOnClose = async () => {
    // Router.push(`/${product.category}/${product.slug}`);

    onClose();
  };

  // const handleBuyNow = (
  //   Slug,
  //   price,
  //   qty,
  //   title,
  //   model,
  //   weigth,
  //   options,
  //   image
  // ) => {
  //   // console.log(Slug, price, qty, title, model, weigth, options);
  //   buyNow(Slug, price, qty, title, model, weigth, options, image);
  // };

  useEffect(() => {
    console.log("hi im products list page");
  }, []);

  const handleOpen = () => {
    onOpen();
  };

  //latest

  useEffect(() => {
    if (product.combination_set) {
      let data = product.combination_set;
      // let array = data.split(",");
      // setcartslug(array);
      setcombinationSet(data);
    }
  }, [product.combination_set]);

  const handleOptions = async (
    event,
    combinationSetIndex,
    combinationSetName,
    combinationIndex,
    combinationName
  ) => {
    const updatedItems = [...selectedItems];
    // console.log("leng", updatedItems.length);
    if (updatedItems[combinationSetIndex] === combinationName) {
      updatedItems[combinationSetIndex] = null;
    } else {
      updatedItems[combinationSetIndex] = combinationName;
    }

    // Update the selected items state
    setSelectedItems(updatedItems);

    // Router.push({
    //   query: { combination: selectedItems },
    // });
  };

  const isCartEnabled2 =
    Object.keys(selectedItems).length === combinationSet.length &&
    Object.values(selectedItems).every((item) => item !== null);

  function getBadgeVariant(setIndex, item) {
    // If the item is selected, return the "solid" variant
    // Otherwise, return the "outline" variant
    return selectedItems[setIndex] === item ? "solid" : "outline";
  }

  useEffect(() => {
    if (selectedItems.length) {
      if (selectedItems.length === combinationSet.length) {
        let selectedCombination = selectedItems.join("-");
        setcartslug(selectedCombination);

        let matchingPrice = product.options.find((priceObj) => {
          return priceObj.combination === selectedCombination;
        });

        if (matchingPrice) {
          setTotalPrice(matchingPrice.price);
        } else {
          setTotalPrice(null);
        }
      }
    }
  }, [selectedItems]);

  const HandleBuyNow = (
    Slug,
    price2,
    qty,
    title,
    model,
    weight2,
    options,
    image
  ) => {
    setadding(true);

    const price = parseFloat(price2).toFixed(2);
    const weight = parseFloat(weight2).toFixed(2);
    // addtocart(Slug, price, qty, title, model, weight, options, image);
    dispatch(buyNow({ Slug, price, title, model, weight, options, image }));
    toast({
      title: "item added to cart.",
      position: "bottom",
      status: "success",
      duration: 2000,
      isClosable: true,
      colorScheme: "facebook",
    });
    setadding(false);
    onClose();
  };
  return (
    <>
      <Button
        leftIcon={<FiShoppingCart />}
        key={product._id}
        border="1px solid #153A5B"
        variant="solid"
        _hover={{
          bg: "white",
          color: "#153A5B",
          border: "1px solid #153A5B",
        }}
        bg="#153A5B"
        color="white"
        onClick={handleOpen}
        borderRadius={"none"}
      >
        Quick Buy
      </Button>
      <Modal
        closeOnOverlayClick={false}
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{product.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction={"column"}
              my={"0.2rem"}
              ml="1rem"
              // border={"1px"}
              // borderColor="facebook.900"
            >
              <Box
                //  border={"1px"}
                color="black"
                fontSize={"1.5rem"}
              >
                {product.variants == "yes" ? (
                  <>
                    {combinationSet.map((set, Index) => {
                      return (
                        <Box key={Index + set}>
                          <Text
                            color={colorMode == "light" ? "#153A5B" : "white"}
                            fontWeight={"semibold"}
                            mt={"0.5rem"}
                          >
                            Select {set}
                          </Text>
                          {product.combination
                            ? product.combination[Index].map(
                                (items, Index2) => {
                                  return (
                                    <Badge
                                      mt={"0.5rem"}
                                      cursor={"pointer"}
                                      border={"1px"}
                                      _hover={{
                                        textDecor: "underline",
                                      }}
                                      fontSize={[
                                        "1rem",
                                        "1rem",
                                        "1.5rem",
                                        "1.5rem",
                                        "1.5rem",
                                      ]}
                                      mx={"0.3rem"}
                                      px={"0.5rem"}
                                      onClick={(e) =>
                                        handleOptions(
                                          e,
                                          Index,
                                          set,
                                          Index2,
                                          items
                                        )
                                      }
                                      key={Index2 + items}
                                      variant={getBadgeVariant(Index, items)}
                                      color={
                                        colorMode == "light"
                                          ? "#153A5B"
                                          : "white"
                                      }
                                    >
                                      {items}
                                    </Badge>
                                  );
                                }
                              )
                            : ""}
                        </Box>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Flex>
            <Box my={"2rem"}>
              <Button
                isLoading={adding}
                loadingText="please wait"
                isDisabled={!isCartEnabled2}
                onClick={() => {
                  HandleBuyNow(
                    cartslug ? product.title + cartslug : product.title,
                    product.priceType === "fixed"
                      ? `${product.fixedPrice}`
                      : TotalPrice === null
                      ? 0
                      : `${TotalPrice}`,
                    1,
                    product.title,
                    product.model,
                    product.weight,
                    cartslug ? cartslug : null,
                    product.image ? product.image[0] : "/assets/logo.svg"
                  );
                }}
                w={[250, 300, 350, 400]}
                bg="#153A5B"
                colorScheme={"facebook"}
                color={colorMode == "light" ? "white" : "white"}
              >
                Buy Now
                <Text mx={"0.5rem"}>
                  {product.priceType === "fixed"
                    ? `$${product.fixedPrice}`
                    : TotalPrice === null
                    ? ""
                    : `$${TotalPrice}`}
                </Text>
              </Button>
              <Box>
                {product.variants === "no" ? (
                  " "
                ) : !isCartEnabled2 ? (
                  <>
                    <Text color={"red.200"}>Select all options*</Text>
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="facebook" mr={3} onClick={handleOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
