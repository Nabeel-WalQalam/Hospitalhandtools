import {
  Box,
  Center,
  color,
  Code,
  Flex,
  Button,
  Heading,
  Highlight,
  Divider,
  Text,
  Select,
  HStack,
  Tag,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
  Spinner,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Carousel,
  CarouselButtonGroup,
  CarouselButton,
  CarouselTrack,
  CarouselSlide,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import {
  EmailIcon,
  FacebookShareButton,
  LinkedinShareButton,
  MailruShareButton,
  PinterestShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappIcon,
} from "react-share";
import ReactHtmlParser from "react-html-parser";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ImageSlider from "../ImageSlider/ImageSlider";
import { useToast, useColorMode } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

import { motion } from "framer-motion";
import { BsFillCartFill, BsSkype } from "react-icons/bs";
import Index from "../ShowHomeHoverProduct/Index";
// import { GlassMagnifier, Magnifier } from "react-image-magnifiers";
// import ImageGallery from "react-image-gallery";
// import ReactImageMagnify from "react-image-magnify";
// import Zoom from "react-img-zoom";
// import ReactImageZoom from "react-image-zoom";
// import ReactImageMagnify from "react-image-magnify";
// import dynamic from "next/dynamic";

// const ReactImageMagnify = dynamic(() => import("react-image-magnify"), {
//   ssr: false,
// });
import ImageGallery from "react-image-gallery";
import {
  RiArrowDownSLine,
  RiArrowUpLine,
  RiArrowUpSLine,
} from "react-icons/ri";
import { FiBarChart } from "react-icons/fi";
import { Modalproduct } from "../ProductModal/Modalproduct";
import { AiOutlineHeart } from "react-icons/ai";
import { MdCompareArrows } from "react-icons/md";
// import Zoom from "../ImageZoom/Zoom";
import { addProductWishList } from "@/store/wishListSlice";
import { addProduct } from "@/store/compareSlice";

const ProductPage = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adding, setadding] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const [first, setfirst] = useState([]);
  const [minPrice, setminPrice] = useState(product.minPrice);
  const [sortedarr, setsortedarr] = useState({});
  const [disableButton, setdisableButton] = useState(0);
  const [disableButton2, setdisableButton2] = useState(true);
  const [fieldOptions, setfieldOptions] = useState({});
  const [combinationSet, setcombinationSet] = useState([]);
  const [isCartEnabled, setIsCartEnabled] = useState(false);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [cartslug, setcartslug] = useState("");
  // console.log(product.combination, product.options);
  // console.log(product);
  const [selectedItems, setSelectedItems] = useState([]);
  const Router = useRouter();
  const slug = Router.query.slug;
  const Query = Router.query.V;
  const query = product.title;
  const [FeatureProducts, setFeatureProducts] = useState([]);
  const [SelectedImage2, setSelectedImage2] = useState("");
  const [imageMap, setimageMap] = useState([]);

  useEffect(() => {
    if (product.options) {
      const imageMap = product.options.reduce((acc, curr) => {
        acc[curr.combination] = curr.weight;
        return acc;
      }, {});
      // console.log(imageMap);
      setimageMap(imageMap);
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getFeaturesProduct`,
        {
          method: "GET",
          Headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
        }
      );
      const data2 = await responce.json();
      console.log(data2);
      setFeatureProducts(data2.message);
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (product.combination_set) {
      let data = product.combination_set;
      let array = data.split(",");
      // setcartslug(array);
      setcombinationSet(array);
    }
  }, [product.combination_set]);
  // console.log("selected", cartslug);

  let firstWord = query.split(" ")[0];

  const HandleAddToCart = (
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
    // const cartOpener = document.getElementById("cartBoxOpener");

    // if(cartOpener.svf)
    const price = parseFloat(price2).toFixed(2);
    const weight = parseFloat(weight2).toFixed(2);
    // addtocart(Slug, price, qty, title, model, weight, options, image);
    dispatch(addToCart({ Slug, price, title, model, weight, options, image }));
    toast({
      title: "item added to cart.",
      position: "bottom",
      status: "success",
      duration: 2000,
      isClosable: true,
      colorScheme: "facebook",
    });
    setadding(false);
  };

  //new logic here

  const handleOptions = async (
    event,
    combinationSetIndex,
    combinationSetName,
    combinationIndex,
    combinationName
  ) => {
    console.log(
      combinationSetIndex,
      combinationSetName,
      combinationIndex,
      combinationName
    );

    const newSelectedItems = [...selectedItems];
    newSelectedItems[combinationSetIndex] = combinationName;
    setSelectedItems(newSelectedItems);

    const selectedCombination = newSelectedItems.join("-");
    const selectedImage = imageMap[selectedCombination];
    console.log("image", selectedImage);
    setSelectedImage2(selectedImage);

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

  const phoneNumber = "923216126225"; // Replace with your client's WhatsApp number
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  function handleWhatsapp() {
    window.open(url, "_blank");
  }

  const emailAddress = "adas.surgical@gmail.com <adas.surgical@gmail.com>"; // Replace with the email address you want to send the email to
  const subject = ""; // Replace with the subject of the email
  const body = ""; // Replace with the body of the email

  function handleEmail() {
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  function handleSkype() {
    window.location.href = `skype:adas.instruments?call`;
  }

  const handleImageLoad = (event) => {
    console.log("Image loaded:", event.target.src);
  };

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // const [mainImage, setMainImage] = useState(product.options[0].weight);

  const handleVariantClick = (variantImage) => {
    setMainImage(variantImage);
  };

  // console.log("image selected", SelectedImage);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedImageIndex(null);
    setIsModalOpen(false);
  };

  // const images = [
  //   "https://via.placeholder.com/150",
  //   "https://via.placeholder.com/200",
  //   "https://via.placeholder.com/250",
  //   "https://via.placeholder.com/300",
  //   "https://via.placeholder.com/350",
  //   "https://via.placeholder.com/400",
  // ];

  const [selectedImage, setSelectedImage] = useState(
    product.image ? product.image[0] : "/assets/logo.svg"
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedImage2("");
    const newIndex =
      (currentIndex - 1 + product.image.length) % product.image.length;
    setSelectedImage(product.image[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    setSelectedImage2("");
    const newIndex = (currentIndex + 1) % product.image.length;
    setSelectedImage(product.image[newIndex]);
    setCurrentIndex(newIndex);
  };

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
    <>
      <Box
      //  m={[0, 0, 5, 10]}
      >
        <Flex
          direction={["column", "column", "column", "row"]}
          align={["none", "none", "center", "unset"]}
          justify={["center", "center", "center", "center"]}
          gap={["0px", "0px", "2rem", "3rem"]}
          mt={"2rem"}
        >
          <Flex
            my={"1rem"}
            direction={"column"}
            // border={"1px"}
            width={["100%", "90%", "90%", "40%"]}
            marginInline={["auto", "auto", "unset", "unset"]}
          >
            <Flex
              justify={"center"}
              // w={"100%"}
              align="center"
              border={"1px"}
              height="450px"
              // minW={"600px"}
              borderColor={"gray.200"}
              // width={"inherit"}
              // my={[5, 5, 0, 0]}
              // boxShadow="base"
              // p={[0, 0, 5, 100]}
              // borderRadius="8px"
            >
              {product.variants === "yes" && product.image ? (
                // <ImageSlider slides={product.image} />
                <>
                  <Flex
                    direction={"row"}
                    width={"inherit"}
                    height={"inherit"}
                    my={"2rem"}
                    justify={"center"}
                    gap={"3rem"}
                    align={"center"}
                    // border="1px"
                    // borderColor={"gray.200"}
                  >
                    {/* <Box width={"inherit"} height={"inherit"}> */}
                    <Flex
                      direction={"column"}
                      border={"1px"}
                      borderColor={"gray.200"}
                      gap={"1rem"}
                      alignContent={"center"}
                      alignItems={"center"}
                      w="100px"
                      // mr={4}
                    >
                      <IconButton
                        icon={<RiArrowUpSLine />}
                        isDisabled={currentIndex === 0}
                        onClick={handlePrevious}
                        aria-label="Previous"
                        mb={2}
                        fontSize={"2rem"}
                        variant={"ghost"}
                      />

                      {product.image
                        ? product.image.map((src, index) => (
                            <Image
                              key={index}
                              src={src}
                              alt={`Image ${index}`}
                              w="50%"
                              mb={2}
                              border={"1px"}
                              borderColor={"gray.200"}
                              shadow={"base"}
                              onClick={() => {
                                setSelectedImage(src);
                                setCurrentIndex(index);
                              }}
                              boxShadow={
                                selectedImage === src
                                  ? "0 0 0 2px #153A5B"
                                  : "0 0 0 2px transparent"
                              }
                              _hover={{ boxShadow: "0 0 0 1px gray" }}
                            />
                          ))
                        : ""}
                      <IconButton
                        icon={<RiArrowDownSLine />}
                        isDisabled={currentIndex === product.image.length - 1}
                        onClick={handleNext}
                        aria-label="Next"
                        mt={2}
                        variant={"ghost"}
                        fontSize={"2rem"}
                      />
                    </Flex>
                    <Flex justify={"center"} align={"center"}>
                      <Flex
                        width={"inherit"}
                        height={"inherit"}
                        overflow={"hidden"}
                      >
                        <Box flex={1}>
                          <Image
                            src={
                              SelectedImage2 ? SelectedImage2 : selectedImage
                            }
                            alt="Selected Image"
                            w="100%"
                            h="400px"
                          />
                        </Box>
                      </Flex>
                    </Flex>
                  </Flex>
                </>
              ) : (
                <Image
                  src={"/assets/logo.svg"}
                  alt="Logo"
                  width={"inerit"}
                  height={"inherit"}
                />
              )}
            </Flex>
            <HStack
              display={["none", "none", "flex", "flex"]}
              mt={"1rem"}
              justify="center"
              align={"center"}
            >
              {/* <Text>TAGS : </Text> */}
              {product.tags.map((tags) => {
                return (
                  <Tag
                    key={tags}
                    bg={"#153A5B"}
                    color="white"
                    px={"1rem"}
                    py={"0.3rem"}
                    fontWeight="normal"
                  >
                    {tags}
                  </Tag>
                );
              })}
            </HStack>
          </Flex>

          <Flex
            px="1rem"
            border={"1px"}
            borderColor="gray.200"
            direction={"column"}
            // w="40%"
            width={["100%", "100%", "90%", "40%"]}
            mt={"1rem"}
          >
            <Heading ml={["0rem", "2rem"]} mt={"1rem"} lineHeight="tall">
              <Highlight
                // width={"100%"}

                query={firstWord}
                styles={{
                  px: "2",
                  py: "1",
                  rounded: "8",
                  bg: "#153A5B",
                  color: "white",
                }}
              >
                {product.title ? product.title : ""}
              </Highlight>
            </Heading>

            <Flex
              direction={["column", "row"]}
              align={["start", "end"]}
              justify={"space-between"}
              my={"1rem"}
              gap={"1rem"}
              ml={["none", "2rem"]}
            >
              <Code
                color={colorMode == "light" ? "#153A5B" : "white"}
                children={
                  product.priceType !== "fixed"
                    ? `$${product.minPrice} - $${product.maxPrice} `
                    : `$${product.fixedPrice}`
                }
                fontSize={"2rem"}
              />
              <Box>
                {product.quantity != 0 ? (
                  <Button
                    size={"sm"}
                    my={"1rem"}
                    colorScheme="green"
                    variant="outline"
                  >
                    <Box>{product.quantity} In Stock -</Box>
                    <Text>- also available on backorder</Text>
                  </Button>
                ) : (
                  <Button
                    size={"sm"}
                    //  my={"1rem"}
                    colorScheme="red"
                    variant="outline"
                  >
                    <Box>Available on backorder</Box>
                  </Button>
                )}
              </Box>
            </Flex>
            <Divider />
            <Box my={"1rem"} ml="2rem">
              {product.short_description
                ? ReactHtmlParser(product.short_description)
                : ""}
            </Box>
            <Divider />
            <Box my={"1rem"} ml="1.5rem">
              <UnorderedList mb={"1rem"}>
                <ListItem color={"gray.500"}>
                  Model: {product.model ? product.model : "pp-009"}
                </ListItem>
                <ListItem color={"gray.500"}>
                  Weight: {product.weight} Kg
                </ListItem>
              </UnorderedList>
              <HStack
                display={["flex", "flex", "none", "none"]}
                mt={"2rem"}
                justify="left"
                align={"center"}
              >
                {product.tags.map((tags) => {
                  return (
                    <Tag
                      key={tags}
                      bg={"#153A5B"}
                      color="white"
                      p={2}
                      fontWeight="normal"
                    >
                      {tags}
                    </Tag>
                  );
                })}
              </HStack>
              <Divider />
            </Box>
            <Flex
              direction={"column"}
              my={"0.2rem"}
              ml="1rem"
              // border={"1px"}
              // borderColor="facebook.900"
            >
              <Box color="black" fontSize={"1.5rem"}>
                {product.variants == "yes" ? (
                  <>
                    {combinationSet.map((set, Index) => {
                      return (
                        <Box key={Index + set}>
                          <Text
                            color={colorMode == "light" ? "#153A5B" : "white"}
                            fontWeight={"semibold"}
                            mt={"1rem"}
                          >
                            Select {set}*
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
                                          ? "gray.900"
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

            <Divider mt={"2rem"} />

            {/* /masla */}
            <Box
              my={"1rem"}
              // border="1px"
              w={["100%", "95%", "100%"]}
              marginInline="auto"
              //  ml={["0rem", "0rem", "2rem", "5rem"]}
            >
              <Flex direction={["column", "row"]} gap={"1rem"}>
                <Button
                  isLoading={adding}
                  loadingText="adding"
                  _disabled={{ bg: "gray.800" }}
                  isDisabled={!isCartEnabled2}
                  onClick={() => {
                    HandleAddToCart(
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
                  w={["100%", "90%"]}
                  bg="#153A5B"
                  // colorScheme={"facebook"}
                  _hover={{ bg: "gray.900" }}
                  color={colorMode == "light" ? "white" : "white"}
                  borderRadius={"none"}
                  leftIcon={<BsFillCartFill />}
                  // mx={'1rem'}
                >
                  Add To Cart
                  <Text mx={"0.5rem"}>
                    {product.priceType === "fixed"
                      ? `$${product.fixedPrice}`
                      : TotalPrice === null
                      ? ""
                      : `$${TotalPrice}`}
                  </Text>
                </Button>

                <Modalproduct product={product} />
              </Flex>
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
              <Flex
                my={"1.2rem"}
                justify={"center"}
                align={"center"}
                gap={"1rem"}
                // border={"1px"}
                direction={["column", "row", "row", "row"]}
              >
                <Button
                  borderColor={"gray.400"}
                  width={["100%", "50%"]}
                  fontWeight={"normal"}
                  variant={"outline"}
                  borderRadius={"none"}
                  leftIcon={<AiOutlineHeart fill={"red"} />}
                  onClick={() => AddToWishList(product)}
                  // fontSize={["0.8rem", "1rem"]}
                >
                  ADD TO WISH LIST
                </Button>
                <Button
                  borderColor={"gray.400"}
                  width={["100%", "50%"]}
                  fontWeight={"normal"}
                  variant={"outline"}
                  borderRadius={"none"}
                  leftIcon={
                    <MdCompareArrows
                      style={{
                        border: "1px",
                        borderColor: "black",
                        borderRadius: "50px",
                      }}
                    />
                  }
                  onClick={() => AddToCompare(product)}
                  // fontSize={["0.8rem", "1rem"]}
                >
                  COMPARE THIS PRODUCT
                </Button>
              </Flex>

              <Box mt={"2rem"}>
                {/* <EmailIcon /> */}
                {/* <FacebookShareButton url="asd" />
                <WhatsappIcon /> */}
                <Flex
                  // style={{ color: "#153A5B", fontWeight: "bold" }}
                  border={"1px"}
                  borderRadius={"9px"}
                  borderColor={"gray.200"}
                  py={"0.6rem"}
                  cursor={"pointer"}
                  justify={"space-evenly"}
                  gap={"0.6rem"}
                  // mr="1rem"
                  align={"center"}
                >
                  <Box display={["none", "block"]}>
                    <Text>Please Contact if you have any Query?</Text>
                  </Box>
                  <Flex gap={"1rem"}>
                    <Tooltip label="WhatsApp" aria-label="WhatsApp">
                      <Box
                        as={motion.div}
                        whileHover={{ scale: 1.1 }}
                        // whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <WhatsappIcon
                          onClick={handleWhatsapp}
                          cursor={"pointer"}
                          size={32}
                          round={true}
                        />
                      </Box>
                    </Tooltip>
                    <Tooltip label="Mail" aria-label="Mail">
                      <Box
                        as={motion.div}
                        whileHover={{ scale: 1.1 }}
                        // whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <EmailIcon
                          cursor={"pointer"}
                          size={32}
                          round={true}
                          onClick={handleEmail}
                        />
                      </Box>
                    </Tooltip>
                    <Tooltip label="Skype" aria-label="Skype">
                      <Box
                        as={motion.div}
                        whileHover={{ scale: 1.1 }}
                        // whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <BsSkype
                          cursor={"pointer"}
                          size={32}
                          fill="#00AFF0"
                          //   round={true}
                          onClick={handleSkype}
                        />
                      </Box>
                    </Tooltip>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box>
        <Flex width={"80%"} mx="auto" mt={"3rem"}>
          <Tabs w={"100%"} variant="unstyled">
            <TabList
            // gap={"1.5rem"}
            >
              <Tab _selected={{ color: "white", bg: "#153A5B" }}>
                Product Description
              </Tab>
            </TabList>
            <TabPanels w={"100%"} bg={"gray.200"}>
              <TabPanel>
                {product.long_description
                  ? ReactHtmlParser(product.long_description)
                  : "No information found"}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        <Flex width={"95%"} mx={"auto"} direction={"column"} mt={"5rem"}>
          <Text ml={"5rem"} fontWeight={"semibold"} fontSize={"1.2rem"}>
            PEOPLE ALSO BOUGHT
          </Text>
          <Divider w={"10%"} ml={"5rem"} borderColor={"gray.800"} />

          {FeatureProducts.length ? (
            <>
              <Flex
                my={"2rem"}
                wrap={"wrap"}
                justify={"center"}
                align={"center"}
                gap={"2rem"}
                w={"100%"}
                // width={"100px"}
                // my={"1rem"}
              >
                {FeatureProducts.map((items) => {
                  // console.log("product Last", items);
                  return <Index product={items} />;
                })}
              </Flex>
            </>
          ) : (
            <Spinner />
          )}
        </Flex>
      </Box>
    </>
  );
};

export default ProductPage;
