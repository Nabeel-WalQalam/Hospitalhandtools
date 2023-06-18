import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  ButtonGroup,
  Stack,
  useMediaQuery,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  useColorMode,
  List,
  ListItem,
  Text,
  Spinner,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaArrowDown } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import axios from "axios";
// import { useCookies } from "react-cookie";
import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { setCategory, setProduct, setquery } from "@/store/searchProduct";
// import Vouchers from "../admindashboard/vouchers";
function VoucherSearch() {
  // const [cookie, setCookie] = useCookies(["token"]);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const [keyword, setkeyword] = useState("");
  const [agentname, setagentname] = useState("All");
  const [category, setcategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [loader, setloader] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);

  let dispatch = useDispatch();

  const getCategory = (e) => {
    // console.log(e);
    setcategory(e);
    let words = e.split(" ");
    let firstWord = words[0];
    setagentname(firstWord);
  };

  // console.log(agentname);
  // console.log(keyword);

  const handleApi = async (e) => {
    e.preventDefault();
    if (!keyword || !agentname) {
      return;
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/api/searchProduct`, {
        category: agentname,
        query: keyword,
      })
      .then((res) => {
        console.log("response came", res.data);
        setSearchResults(res.data);
        // if (res.data.success) {
        //   toast({
        //     title: "Welcome To THE GURU",
        //     status: "success",
        //   });
        //   reset();
        //   localStorage.setItem("token", res.data.payload.token);
        //   dispatch(setCurrentUser(res.data.payload.user));
        //   Router.push("/");
        // } else {
        //   toast({
        //     title: res.data.payload,
        //   });
        // }
      })
      .catch((err) => {
        console.log("error");
      });
  };

  useEffect(() => {
    let timer;

    if (searchQuery.length > 0) {
      timer = setTimeout(() => {
        setloader(true);
        axios
          .post(`${process.env.NEXT_PUBLIC_HOST}/api/searchProduct`, {
            category: agentname,
            query: searchQuery,
          })
          .then((res) => {
            console.log("response came", res.data);
            setSearchResults(res.data.msg);
            dispatch(setProduct(res.data.msg));
            dispatch(setquery(searchQuery));
            dispatch(setCategory(agentname));
            setloader(false);
            // if (res.data.success) {
            //   toast({
            //     title: "Welcome To THE GURU",
            //     status: "success",
            //   });
            //   reset();
            //   localStorage.setItem("token", res.data.payload.token);
            //   dispatch(setCurrentUser(res.data.payload.user));
            //   Router.push("/");
            // } else {
            //   toast({
            //     title: res.data.payload,
            //   });
            // }
          })
          .catch((err) => {
            console.log("error", err);
            setloader(false);
          });
      }, 400); // Adjust the debounce delay as needed
    } else {
      setSearchResults([]);
    }

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setloader(true);
    setSearchQuery(e.target.value);
    setloader(false);
  };

  const handleCloseMenu = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleShowAllResults = () => {
    setSearchResults([]);
    setSearchQuery("");
    setShowAllResults(true);
  };

  const visibleResults = showAllResults
    ? searchResults
    : searchResults.slice(0, 5);

  const renderSearchResults = () => {
    if (visibleResults.length > 0) {
      return (
        <List spacing={2}>
          {visibleResults.map((result) => {
            const category = result.category.replace(/\s+/g, "-");
            const slug = result.slug.replace(/\s+/g, "-");
            const tite = result.title.replace(/\s+/g, "-");
            console.log("result", result);

            return (
              <Link
                key={result.id}
                href={`/${category}/${slug}/${tite}`}
                onClick={handleCloseMenu}
              >
                <Flex gap={"1rem"} my={"0.5rem"}>
                  <Box
                    border={"1px"}
                    width={"50px"}
                    borderColor={"gray.300"}
                    height={"50px"}
                    pos={"relative"}
                  >
                    <Image
                      src={
                        result.image ? result.image[0].url : "/assets/150.png"
                      }
                      fill="fill"
                      objectFit="contain"
                      // alt={result.title}
                      // fill={true}
                    />
                  </Box>
                  <Flex direction={"column"}>
                    <ListItem>{result.title}</ListItem>
                    <ListItem>
                      {result.priceType !== "fixed"
                        ? `$${result.minPrice} - $${result.maxPrice} `
                        : `$${result.fixedPrice}`}
                    </ListItem>
                  </Flex>{" "}
                </Flex>
              </Link>
            );
          })}
        </List>
      );
    } else if (searchQuery.length > 0) {
      return <Text>No products found.</Text>;
    }
  };

  return (
    <>
      <Flex
        // border={"1px"}
        display={["block", "block", "none", "none", "block"]}
        pos={"relative"}
      >
        <Flex justify={"center"}>
          <Box position={"relative"}>
            <Menu w={"100%"} closeOnSelect={false}>
              <MenuButton
                border="1px"
                borderColor="#153A5B"
                borderTopLeftRadius={"40px"}
                borderBottomLeftRadius={"40px"}
                borderTopRightRadius={"none"}
                borderBottomRightRadius={"none"}
                // w={"100%"}

                textOverflow={"hidden"}
                overflow="hidden"
                bg={colorMode === "light" ? "#153A5B" : "white"}
                color={colorMode == "light" ? "white" : "#153A5B"}
                position={"relative"}
                height={"100%"}
                _hover={{
                  bg: colorMode == "light" ? "white" : "#153A5B",
                  color: colorMode === "light" ? "#153A5B" : "white",
                  border: "1px",
                  borderColor: colorMode === "light" ? "#153A5B" : "white",
                }}
                // w={"50px"}
                px={"1rem"}
              >
                {agentname}
              </MenuButton>
              <MenuList className="Nav_Menu">
                <MenuOptionGroup
                  onChange={getCategory}
                  defaultValue="All"
                  type="radio"
                >
                  <MenuItemOption value="All">ALL</MenuItemOption>
                  <MenuItemOption value="plastic surgery instruments">
                    plastic surgery instruments
                  </MenuItemOption>

                  <MenuItemOption value="liposuction cannula and accessories">
                    liposuction cannula
                  </MenuItemOption>

                  <MenuItemOption value="instruments by procedures">
                    instruments by procedures
                  </MenuItemOption>

                  <MenuItemOption value="instruments sets">
                    instruments sets
                  </MenuItemOption>

                  <MenuItemOption value="ent instruments">
                    ent instruments
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>

          <Box
            // width={["100%", "100%", "100%", "100%"]}
            w={["270px", "250px", "270px", "370px"]}
          >
            <InputGroup>
              <Input
                border={colorMode === "light" ? "1px" : "none"}
                borderColor={colorMode == "light" ? "gray.300" : "white"}
                borderRadius="none"
                borderTopRightRadius={"none"}
                borderBottomRightRadius={"none"}
                variant={"none"}
                placeholder="Search here..."
                // value={keyword}
                value={searchQuery}
                // onChange={(e) => {
                //   setkeyword(e.target.value);
                // }}
                onChange={handleSearchChange}
              />
              <InputRightElement>{loader ? <Spinner /> : ""}</InputRightElement>
            </InputGroup>
          </Box>

          <Box>
            <ButtonGroup>
              <Button
                borderTopRightRadius={"40px"}
                borderBottomRightRadius={"40px"}
                leftIcon={<FaSearch />}
                // color={colorMode === "light" ? "#153A5B" : "#white"}
                bg={colorMode == "light" ? "#153A5B" : "white"}
                color={colorMode === "light" ? "white" : "#153A5B"}
                onClick={handleApi}
                display={["block", "block", "none", "block", "block"]}
                // onClick={submitQuery}
                border="1px"
                borderColor="#153A5B"
                _hover={{
                  bg: colorMode == "light" ? "white" : "#153A5B",
                  color: colorMode === "light" ? "#153A5B" : "white",
                  border: "1px",
                  borderColor: colorMode === "light" ? "#153A5B" : "white",
                }}
                borderTopLeftRadius={"none"}
                borderBottomLeftRadius={"none"}
              ></Button>
              {/* <Button
                onClick={handleReset}
                display={["block", "block", "none", "none", "block"]}
                bg={"white"}
                color="#153A5B"
                border={"1px"}
                borderColor={"white"}
                _hover={{
                  bg: "white",
                  border: "1px",
                  borderColor: "#153A5B",
                  color: "#153A5B",
                }}
              >
                Reset
              </Button> */}
            </ButtonGroup>
          </Box>
        </Flex>
        <Box
          position="absolute"
          zIndex={9999}
          bg="white"
          border="1px"
          borderColor="gray.200"
          mt={2}
          p={2}
          width={"100%"}
          display={searchQuery.length ? "block" : "none"}
          borderRadius={"10px"}
          // borderTopLeftRadius={"10px"}
        >
          {renderSearchResults()}

          {!showAllResults && searchResults.length > 5 && (
            <Button
              textDecor={"underline"}
              variant="link"
              color="facebook"
              onClick={handleShowAllResults}
            >
              <Link href="/Products">show more</Link>
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
}

export default VoucherSearch;
