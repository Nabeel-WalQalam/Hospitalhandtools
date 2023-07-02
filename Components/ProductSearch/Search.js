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
  useDisclosure,
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
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdOutlineArrowDropDown } from "react-icons/md";
// import Vouchers from "../admindashboard/vouchers";
function Search() {
  // const [cookie, setCookie] = useCookies(["token"]);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  useEffect(() => {
    console.log("run voucher search");
  }, []);
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

  const handleShowAllResults = () => {
    setSearchResults([]);
    setSearchQuery("");
    setShowAllResults(true);
  };

  return (
    <>
      <Flex
        w={"100%"}
        // border={"1px"}
        // display={["block", "block", "none", "none", "block"]}
        pos={"relative"}
      >
        <Flex w={"100%"} justify={"center"}>
          <Box>
            <Menu isOpen={isOpen}>
              <MenuButton
                as={Button}
                variant={"none"}
                rightIcon={<MdOutlineArrowDropDown fontSize={"20px"} />}
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
                // position={"relative"}
                height={"100%"}
                _hover={{
                  bg: colorMode == "light" ? "#153A5C" : "#153A5B",
                  // color: colorMode === "light" ? "#153A5B" : "white",
                  // border: "1px",
                  // borderColor: colorMode === "light" ? "#153A5B" : "white",
                }}
                // w={"50px"}
                // px={"1rem"}
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
              >
                {agentname}
              </MenuButton>
              <MenuList
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                // className="Nav_Menu"
                width={"20%"}
              >
                <MenuOptionGroup
                  onChange={(e) => getCategory(e)}
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

          <Flex
            // width={["100%", "100%", "100%", "100%"]}
            w={"100%"}
            // maxW={"400px"}
            // border={"1px"}
            flexGrow={"1"}
          >
            <InputGroup>
              <Input
                border={colorMode === "light" ? "1px" : "none"}
                borderColor={colorMode == "light" ? "gray.100" : "white"}
                borderRadius="none"
                bg="rgba(240, 242, 245, 1)"
                borderTopRightRadius={"none"}
                borderBottomRightRadius={"none"}
                variant={"none"}
                placeholder="Search here..."
                _placeholder={{
                  color: "gray.600",
                }}
                // value={keyword}
                value={searchQuery}
                // onChange={(e) => {
                //   setkeyword(e.target.value);
                // }}
                onChange={(e) => handleSearchChange(e)}
              />
              <InputRightElement>{loader ? <Spinner /> : ""}</InputRightElement>
            </InputGroup>
          </Flex>

          <Box>
            <ButtonGroup>
              <Button
                borderTopRightRadius={"40px"}
                borderBottomRightRadius={"40px"}
                leftIcon={<FaSearch />}
                // color={colorMode === "light" ? "#153A5B" : "#white"}
                bg={colorMode == "light" ? "#153A5B" : "white"}
                color={colorMode === "light" ? "white" : "#153A5B"}
                onClick={(e) => handleApi(e)}
                display={["block", "block", "none", "block", "block"]}
                // onClick={submitQuery}
                border="1px"
                borderColor="#153A5B"
                variant={"none"}
                borderTopLeftRadius={"none"}
                borderBottomLeftRadius={"none"}
              ></Button>
            </ButtonGroup>
          </Box>
        </Flex>
        <Box
          position="absolute"
          zIndex={9999}
          bg="white"
          border="1px"
          borderColor="gray.100"
          top={"2.5rem"}
          mt={2}
          p={2}
          width={"100%"}
          display={searchQuery.length ? "block" : "none"}
          borderRadius={"none"}
          boxShadow={"2xl"}
          // borderTopLeftRadius={"10px"}
        >
          {/* {renderSearchResults()} */}

          {!showAllResults && searchResults.length > 5 && (
            <Button
              textDecor={"underline"}
              variant="link"
              color="facebook"
              onClick={() => handleShowAllResults()}
            >
              <Link href="/Products">show more</Link>
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
}

export default Search;
