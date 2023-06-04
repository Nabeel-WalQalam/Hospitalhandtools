import React, { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
  Flex,
  Center,
  color,
  useColorMode,
  Tooltip,
  Select,
  Spinner,
} from "@chakra-ui/react";
import dbConnect from "@/Middleware/connectDb";
import Product from "@/models/Product";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import BreadCrumb from "@/Components/Shared/BreadCrumb";
import { useToast } from "@chakra-ui/react";

import { Modalproduct } from "@/Components/ProductModal/Modalproduct";

import secureLocalStorage from "react-secure-storage";
import { AiFillHeart } from "react-icons/ai";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addProductWishList } from "@/store/wishListSlice";

export default function Index({ productss }) {
  const dispatch = useDispatch();

  // console.log("products", products);
  const [listStyle, setlistStyle] = useState("grid");
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const Slug = router.query.slug;
  const sortType = useRef("default");
  const [products, setproducts] = useState(productss);
  const [isLoading, setIsLoading] = useState(false);
  // console.log("products", products);
  console.log(router.query.slug);

  const handleSort = async () => {
    setIsLoading(true);
    console.log("sortType", sortType.current.value);
    if (!sortType.current.value) {
      setproducts(productss);
      setIsLoading(false);
      return;
    }
    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getSortedProduct`,
      {
        method: "POST",
        Headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: router.query.slug,
          type: sortType.current.value,
        }),
      }
    );
    const data2 = await responce.json();
    console.log(data2);
    if (data2.success) {
      setproducts(data2.message);
      setIsLoading(false);
    }
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
  return (
    <>
      <Box minH={"100vh"}>
        {products.length != 0 ? (
          <>
            <Box bg={colorMode == "light" ? "gray.100" : "gray.900"} p="1rem">
              <BreadCrumb pgaeTitle={"instruments-sets"}>
                {Slug ? Slug : ""}
              </BreadCrumb>
            </Box>

            <Box bg={"#153A5B"}>
              <Center>
                <Heading fontSize={["md", "2xl", "4xl"]} color="white">
                  {Slug ? Slug : ""}
                </Heading>
              </Center>
            </Box>
            <Box
              //  border={"1px"}
              width={["100%", "90%"]}
              mx={"auto"}
            >
              <Box
                display={["none", "none", "block"]}
                width={"90%"}
                mx="auto"
                mt={"2rem"}
              >
                <Divider borderColor={"gray.400"} />
                <Flex
                  direction={["column", "row"]}
                  py={"0.5rem"}
                  // border={"1px"}
                  justify={"space-between"}
                >
                  <Box>
                    <Tooltip label="Grid" aria-label="Grid">
                      <Button
                        onClick={() => setlistStyle("grid")}
                        variant={"ghost"}
                      >
                        <BsFillGrid3X3GapFill
                          fontSize={"1.3rem"}
                          color="black"
                        />
                      </Button>
                    </Tooltip>
                    <Tooltip label="List" aria-label="List">
                      <Button
                        onClick={() => setlistStyle("list")}
                        variant={"ghost"}
                      >
                        <FaListUl fontSize={"1.3rem"} />
                      </Button>
                    </Tooltip>
                  </Box>
                  <Box>
                    <Flex gap={"1rem"}>
                      <Button colorScheme="facebook" variant={"ghost"}>
                        Sort By :
                      </Button>
                      <Select
                        onChange={handleSort}
                        ref={sortType}
                        placeholder="Default"
                      >
                        {/* <option value="default">default</option> */}
                        <option value="title+1">Name (A-Z)</option>
                        <option value="title+-1">Name (Z-A)</option>
                        <option value="fixedPrice+1">
                          Price (Low {">"} High)
                        </option>
                        <option value="fixedPrice+-1">
                          Price (High {">"} Low)
                        </option>
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
                <Divider borderColor={"gray.400"} />
              </Box>
              <Flex
                mt="1rem"
                w={["100%", "100%", "90%"]}
                justify="center"
                // gap={"20px"}
                // align="center"
                mx="auto"
                // wrap={"wrap"}
                // height={"100vh"}
                // border={"1px"}
              >
                <Flex
                  direction={listStyle === "grid" ? "row" : "column"}
                  width={"inherit"}
                  wrap={"wrap"}
                >
                  {isLoading && (
                    <Box
                      position="fixed"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      backgroundColor="blackAlpha.500"
                      zIndex="modal"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Spinner color="white" size="xl" />
                    </Box>
                  )}

                  {products.map((items) => {
                    // console.log("items", items);
                    let url = items.title.replace(/\s/g, "-");
                    return (
                      <Card
                        key={items._id}
                        _hover={{
                          shadow: "xl",
                          filter: "auto",
                          brightness: "98%",
                        }}
                        maxW={listStyle === "grid" ? "300px" : "none"}
                        mx="1rem"
                        my="1rem"
                        border={"1px"}
                        borderColor={"gray.200"}
                      >
                        <Link
                          href={`/plastic-surgery-instruments/${Slug}/${url}`}
                        >
                          <CardBody>
                            <Box
                              position={"relative"}
                              width={listStyle === "grid" ? "none" : "270px"}
                              height={"200px"}
                            >
                              {items.image ? (
                                <Image
                                  src={items.image[0]}
                                  alt={items.title}
                                  width={250}
                                  height={200}
                                  priority
                                />
                              ) : (
                                <Image
                                  src={
                                    colorMode === "light"
                                      ? "/assets/dummy.png"
                                      : "/assets/dummy.png"
                                  }
                                  alt="Logo"
                                  fill="auto"
                                />
                              )}
                            </Box>
                            <Divider
                              border="1px"
                              borderColor={
                                colorMode == "light" ? "#153A5B" : "white"
                              }
                              my={"2rem"}
                            />
                            <Stack mt="6">
                              <Heading
                                size="sm"
                                color={
                                  colorMode == "light" ? "#153A5B" : "white"
                                }
                              >
                                {items.title}
                              </Heading>

                              <Flex justify={"space-between"} align="center">
                                <Text
                                  color={
                                    colorMode == "light" ? "#153A5B" : "white"
                                  }
                                  fontSize={[14, 15, 17, 20]}
                                >
                                  {items.priceType !== "fixed"
                                    ? `$${items.minPrice} - $${items.maxPrice}`
                                    : `$${items.fixedPrice}`}
                                </Text>

                                <Text
                                  bg={
                                    colorMode == "light" ? "#153A5B" : "white"
                                  }
                                  color={
                                    colorMode == "light" ? "white" : "#153A5B"
                                  }
                                  // py="0.3rem"
                                  px="0.2rem"
                                  borderRadius={"5px"}
                                  display={["none", "block"]}
                                >
                                  Model : {items.model}
                                </Text>
                              </Flex>
                            </Stack>
                          </CardBody>
                        </Link>
                        <Divider />
                        <CardFooter>
                          <Flex
                            gap={"1rem"}
                            // align={"center"}
                            // justify={"center"}
                            direction={["column", "row"]}
                            // spacing="2"
                          >
                            <Modalproduct product={items} />

                            <Button
                              onClick={() => AddToWishList(items)}
                              leftIcon={<AiFillHeart />}
                              _hover={{
                                bg: "white",
                                color: "#153A5B",
                                border: "1px solid #153A5B",
                                fill: "red",
                              }}
                              variant="outline"
                              color={colorMode == "light" ? "#153A5B" : "white"}
                            >
                              favourite
                            </Button>
                          </Flex>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </Flex>
              </Flex>
            </Box>
          </>
        ) : (
          <Box
            display={"flex"}
            justifyContent="center"
            alignContent={"center"}
            flexDirection="column"
            textAlign="center"
            py={10}
            px={6}
            height="70vh"
          >
            <Heading
              display="inline-block"
              as="h2"
              size="4xl"
              bgGradient="linear(to-r, blue.400, purple.600)"
              backgroundClip="text"
            >
              404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
              Page Not Found
            </Text>
            <Text color={"gray.500"} mb={6}>
              The page you're looking for does not seem to exist
            </Text>
            <Link href={"/"}>
              <Button
                _hover={{
                  bg: "white",
                  color: "#153A5B",
                  border: "1px",
                  borderColor: "#153A5B",
                }}
                bg={"#153A5B"}
                color="white"
                variant="solid"
              >
                Go to Home
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const { params } = context;

  const param = params.slug.replace(/-/g, " ");

  try {
    const res = await Product.find({ slug: param });
    const posts = await JSON.parse(JSON.stringify(res));

    return {
      props: { productss: posts }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
  }
}
