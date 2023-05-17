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
} from "@chakra-ui/react";
import { FaSearch, FaArrowDown } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import axios from "axios";
// import { useCookies } from "react-cookie";
import { useToast } from "@chakra-ui/react";
// import Vouchers from "../admindashboard/vouchers";
function VoucherSearch() {
  // const [cookie, setCookie] = useCookies(["token"]);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const [keyword, setkeyword] = useState("");
  const [agentname, setagentname] = useState("All");
  const [category, setcategory] = useState("");

  const getCategory = (e) => {
    // console.log(e);
    setcategory(e);
    let words = e.split(" ");
    let firstWord = words[0];
    setagentname(firstWord);
  };

  // console.log(agentname);
  // console.log(keyword);

  function handleReset() {
    setagentname("All");
    setkeyword("");
    // keyword.current
  }

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

  return (
    <>
      <Flex
        // borderRadius={"8px"}
        // border={"1px"}
        // borderRadius="40%"
        // borderColor="gray.300"
        // py="5px"
        // bg="#153A5B"
        display={["block", "block", "none", "none", "block"]}
        // w={["unset", "unset", "10%", "20%"]}
        // px="1rem"
      >
        <Flex
          // border="1px"
          // gap={"0.6rem"}
          justify={"center"}
          // direction={["column", "column", "row", "row"]}
        >
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
                // color={colorMode === "light" ? "#153A5B" : "#153A5B"}
                bg={colorMode === "light" ? "#153A5B" : "white"}
                color={colorMode == "light" ? "white" : "#153A5B"}
                position={"relative"}
                height={"100%"}
                // _hover={{
                //   bg: "#153A5B",
                //   color: "white",
                //   border: "1px",
                //   borderColor: "white",
                // }}
                // variant={"filled"}
                // as={Button}
                // rightIcon={<FaArrowDown />}

                _hover={{
                  bg: colorMode == "light" ? "white" : "#153A5B",
                  color: colorMode === "light" ? "#153A5B" : "white",
                  border: "1px",
                  borderColor: colorMode === "light" ? "#153A5B" : "white",
                }}
                w={"50px"}
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
            <Input
              border={colorMode === "light" ? "1px" : "none"}
              borderColor={colorMode == "light" ? "gray.300" : "white"}
              borderRadius="none"
              borderTopRightRadius={"none"}
              borderBottomRightRadius={"none"}
              // _hover={{ border: "2px", borderColor: "#153A5B" }}
              // type={"search"}
              // colorMode === "light" ? "#153A5B" : "white"
              // _focus={{ border: "1px solid white", color: "white" }}
              variant={"none"}
              placeholder="Search here..."
              value={keyword}
              onChange={(e) => {
                setkeyword(e.target.value);
              }}

              // ref={keyword}
              // color={colorMode === "light" ? "#153A5B" : "white"}
              // fontcolor={colorMode === "light" ? "white" : "153A5B"}
            />
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
      </Flex>
    </>
  );
}

export default VoucherSearch;
