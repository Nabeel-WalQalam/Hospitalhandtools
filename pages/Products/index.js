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
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modalproduct } from "@/Components/ProductModal/Modalproduct";
import { useRouter } from "next/router";

export default function Index() {
  const { colorMode } = useColorMode();
  const [listStyle, setlistStyle] = useState("grid");
  let { query, searchProduct, category } = useSelector(
    (state) => state.products
  );
  console.log("products", searchProduct, query);
  const [isLoading, setIsLoading] = useState(false);
  const sortType = useRef("default");
  const router = useRouter();

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

  useEffect(() => {
    if (!query || !category) {
      router.push("/");
    }
  }, [query, category]);

  return (
    <>
      <Center>
        <Box
          // border={"1px solid red"}
          width={"100%"}
          bg={"#153A5B"}

          // marginTop={"2rem"}
        >
          <Text
            textAlign={"center"}
            marginInline={"auto"}
            color={"white"}
            fontSize={"2rem"}
            fontWeight={"semibold"}
          >
            Product Search
          </Text>
          {/* <Text fontSize={"2rem"} fontWeight={"semibold"}>
          Category - {category}
        </Text> */}
        </Box>
      </Center>

      <Box
        // border={"1px solid red"}
        width={"80%"}
        marginInline={"auto"}
        marginTop={"2rem"}
      >
        <Text fontSize={"2rem"} fontWeight={"semibold"}>
          Keyword - {query}
        </Text>
        {/* <Text fontSize={"2rem"} fontWeight={"semibold"}>
          Category - {category}
        </Text> */}
      </Box>
      <Box
        //  border={"1px"}

        width={"90%"}
        mx={"auto"}
      >
        <Box display={["none", "block"]} width={"90%"} mx="auto" mt={"2rem"}>
          <Divider borderColor={"gray.400"} />
          <Flex
            direction={["column", "row"]}
            py={"0.5rem"}
            // border={"1px"}
            justify={"space-between"}
          >
            <Box>
              <Tooltip label="Grid" aria-label="Grid">
                <Button onClick={() => setlistStyle("grid")} variant={"ghost"}>
                  <BsFillGrid3X3GapFill fontSize={"1.3rem"} color="black" />
                </Button>
              </Tooltip>
              <Tooltip label="List" aria-label="List">
                <Button onClick={() => setlistStyle("list")} variant={"ghost"}>
                  <FaListUl fontSize={"1.3rem"} />
                </Button>
              </Tooltip>
            </Box>
            <Box display={"none"}>
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
                  <option value="fixedPrice+1">Price (Low {">"} High)</option>
                  <option value="fixedPrice+-1">Price (High {">"} Low)</option>
                </Select>
              </Flex>
            </Box>
          </Flex>
          <Divider borderColor={"gray.400"} />
        </Box>
        <Flex
          mt="1rem"
          w={["100%", "100%"]}
          justify="center"
          // gap={"20px"}
          // align="center"
          mx="auto"
          // wrap={"wrap"}
          minHeight={"100vh"}
          // border={"1px"}
        >
          <Flex
            direction={listStyle === "grid" ? "row" : "column"}
            width={listStyle === "grid" ? "100%" : "90%"}
            // border={"1px"}
            wrap={"wrap"}
            justify={"center"}
            paddingBottom={"1rem"}
            // mx="auto"
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

            {searchProduct.map((items) => {
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
                  {/* /plastic-surgery-instruments/${Slug}/${url} */}
                  <Link href={`/plastic-surgery-instruments/${url}`}>
                    <CardBody>
                      <Box
                        position={"relative"}
                        // width={listStyle === "grid" ? "none" : "270px"}
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
                        borderColor={colorMode == "light" ? "#153A5B" : "white"}
                        my={"2rem"}
                      />
                      <Stack mt="6">
                        <Heading
                          size="sm"
                          color={colorMode == "light" ? "#153A5B" : "white"}
                        >
                          {items.title}
                        </Heading>

                        <Flex justify={"space-between"} align="center">
                          <Text
                            color={colorMode == "light" ? "#153A5B" : "white"}
                            fontSize={[14, 15, 17, 20]}
                          >
                            {items.priceType !== "fixed"
                              ? `$${items.minPrice} - $${items.maxPrice}`
                              : `$${items.fixedPrice}`}
                          </Text>

                          <Text
                            fontSize={"0.8rem"}
                            fontWeight={"light"}
                            bg={colorMode == "light" ? "#153A5B" : "white"}
                            color={colorMode == "light" ? "white" : "#153A5B"}
                            // py="0.3rem"
                            px="0.2rem"
                            // borderRadius={"5px"}
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
                        borderRadius={"none"}
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
  );
}
