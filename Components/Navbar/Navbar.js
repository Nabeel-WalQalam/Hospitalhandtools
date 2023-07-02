import React, { useMemo, useEffect, useState } from "react";
// import Image from "next/image";
import {
  Box,
  Divider,
  Stack,
  useColorMode,
  Flex,
  useDisclosure,
  Menu,
  MenuList,
  Text,
  MenuButton,
  MenuItem,
  Button,
  Tooltip,
  Badge,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

import { motion } from "framer-motion";
import { HamburgerMobile } from "./HamburgerMobile";
import NavList from "./NavList";
import Link from "next/link";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";

import VoucherSearch from "../ProductSearch/VoucherSearch";
import secureLocalStorage from "react-secure-storage";
import { NavbarCat } from "./NavbarCat";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { RiUserSharedLine } from "react-icons/ri";
import { BsSuitHeart } from "react-icons/bs";
import { MdCompareArrows } from "react-icons/md";
// import { useSelector } from "react-redux";
const Navbar = ({ isOpen, onToggle }) => {
  const compareProduct = useSelector((state) => state.compare.product);
  const wishListProduct = useSelector((state) => state.wishList.wishList);
  // console.log("new", compareProduct.length);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // console.log("user", user);
  const Router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen, onClose } = useDisclosure();
  const [username, setusername] = useState();
  const isDesktop = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });

  useEffect(() => {
    if (secureLocalStorage.getItem("token")) {
      setusername(secureLocalStorage.getItem("username"));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    Router.push("/");
  };

  // console.log(props);

  // Navbar, cart, addtoCart, removeFromCart

  // useEffect(() => {
  //   console.log("hi im from Navbar");
  //   console.log(cart);
  // }, []);

  // const search = useMemo(() => <VoucherSearch colorMode={colorMode} />, []);

  return (
    <>
      {isDesktop ? (
        <Flex
          // py={"0.5rem"}
          // display={["flex", "flex", "none", "none"]}
          justify={"space-between"}
          align="center"
          // border={"2px solid red"}
          // position={"sticky"}
          // p="1rem"
          // border={"1px"}
          direction={"row-reverse"}
          // borderColor={"gray.200"}
          boxShadow={"base"}
        >
          <Flex mr={"0.5rem"} align={"center"} gap={"0.5rem"}>
            <Box>
              <HamburgerMobile colorMode={colorMode} />
            </Box>
            <Box>
              <Link href={"/wishlist"}>
                <Flex
                  cursor={"pointer"}
                  // mr={"0.4rem"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  fontWeight="semibold"
                  _hover={{ textDecor: "underline", color: "black" }}
                  // border={"1px"}
                  align={"center"}
                  pos={"relative"}
                >
                  <Badge
                    pos={"absolute"}
                    bg="red.500"
                    borderRadius={"55px"}
                    top={"-3px"}
                    color={"white"}
                    // top={"3rem"}
                    left={"1rem"}
                    zIndex={"99"}
                  >
                    {wishListProduct.length}
                  </Badge>
                  <Box pos={"relative"}>
                    <BsSuitHeart fontSize={"28px"} />
                  </Box>
                </Flex>
              </Link>
            </Box>
            <Box
              // border={"1px"}
              // borderColor={"#153A5B"}
              height={"100%"}
              // mx={"1rem"}
              // bg={"#153A5B"}
              // py={"0.5rem"}
              // px="0.5rem"
            >
              <NavbarCat paddingGap={false} color={"#153A5B"} />
            </Box>
          </Flex>
          <Box>
            <Link href={"/"}>
              <Image
                src={
                  colorMode === "light"
                    ? "/assets/logo.png"
                    : "/assets/logoWhite.svg"
                }
                alt="Hospital-Hand-Tools -Logo"
                objectFit={"cover"}
                boxSize={"250px"}
                height={"80px"}

                // style={{ fill: "pink", color: "pink" }}
              />
            </Link>
          </Box>
        </Flex>
      ) : (
        <Flex
          // display={["none", "none", "flex", "flex"]}
          justify={"center"}
          align="center"
          gap={"3rem"}
          border={"1px"}
          borderColor={colorMode === "light" ? "gray.200" : "gray.300"}
          // py={"1.2rem"}
          // w={"100%"}
          // marginInline="auto"
          // pos={"sticky"}
          // top={"0px"}
          bg={colorMode === "light" ? "white" : "#153A5B"}
          // zIndex={"999"}
        >
          {Router.pathname === "/checkout" ? (
            <>
              <Box>
                <Link href={"/"}>
                  <Image
                    src={
                      colorMode === "light"
                        ? "/assets/logo.png"
                        : "/assets/logoWhite.svg"
                    }
                    alt="Hospital-Hand-Tools -Logo"
                    width={230}
                    height={100}
                  />
                </Link>
              </Box>
            </>
          ) : (
            <>
              <Link href={"/"}>
                <Image
                  src={
                    colorMode === "light"
                      ? "/assets/logo.png"
                      : "/assets/logoWhite.svg"
                  }
                  alt="Logo"
                  objectFit={"cover"}
                  boxSize={"280px"}
                  height={"100px"}
                />
              </Link>
              <Box width={("100px", "250px", "550px")}>
                <VoucherSearch colorMode={colorMode} />
              </Box>
              <Flex
                // border={"1px"}
                listStyleType="none"
                align={"center"}
                justify={"center"}
                // mr={"1rem"}
                gap={"1rem"}
              >
                <Box>
                  {!user ? (
                    <Link href={"/Auth"}>
                      <Flex
                        color={colorMode === "light" ? "#153A5B" : "white"}
                        fontWeight="semibold"
                        align={"center"}
                        _hover={{ textDecor: "underline", color: "black" }}
                      >
                        <Box>
                          <RiUserSharedLine fontSize={"28px"} />
                        </Box>
                        <Box mx={"0.5rem"}>
                          <Text>Account</Text>
                          <Text
                            fontSize={"10px"}
                            color={colorMode === "light" ? "gray.500" : "white"}
                            fontWeight={"medium"}
                          >
                            Login / Register
                          </Text>
                        </Box>
                      </Flex>
                    </Link>
                  ) : (
                    <Box>
                      <Menu>
                        <MenuButton
                          fontWeight={"semibold"}
                          cursor={"pointer"}
                          pos={"relative"}
                        >
                          {/* <Button
                          textTransform={"capitalize"}
                          color={colorMode === "light" ? "#153A5B" : "white"}
                          cursor={"pointer"}
                          // as={"button"}
                        >
                        </Button> */}
                          <Flex pos={"relative"} align={"center"}>
                            <Avatar
                              name={user.displayName ? user.displayName : ""}
                              src="https://bit.ly/broken-link"
                            />
                            <Box
                              _hover={{
                                textDecor: "underline",
                                color: "black",
                              }}
                              mx={"0.5rem"}
                            >
                              <Text>Account</Text>
                              <Text
                                fontSize={"10px"}
                                color={
                                  colorMode === "light" ? "gray.500" : "white"
                                }
                                fontWeight={"medium"}
                              >
                                Edit/logout
                              </Text>
                            </Box>
                          </Flex>
                        </MenuButton>
                        <MenuList
                          w={"10%"}
                          position={"absolute"}
                          right={"18rem"}
                          top={"0px"}
                        >
                          <Link href={"/myaccount"}>
                            <MenuItem>My Account </MenuItem>
                          </Link>

                          <Link href={"/my-orders"}>
                            <MenuItem>Orders</MenuItem>
                          </Link>
                          <MenuItem onClick={logout}>Logout</MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  )}
                </Box>
                <Link href={"/wishlist"}>
                  <Flex
                    cursor={"pointer"}
                    // mr={"0.4rem"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    fontWeight="semibold"
                    _hover={{ textDecor: "underline", color: "black" }}
                    // border={"1px"}
                    align={"center"}
                    pos={"relative"}
                  >
                    <Badge
                      pos={"absolute"}
                      bg="red.500"
                      borderRadius={"55px"}
                      top={"2px"}
                      color={"white"}
                      // top={"3rem"}
                      left={"1rem"}
                      zIndex={"99"}
                    >
                      {wishListProduct.length}
                    </Badge>
                    <Box pos={"relative"}>
                      <BsSuitHeart fontSize={"28px"} />
                    </Box>
                    <Box mx={"0.5rem"}>
                      <Text>Wishlist</Text>
                      <Text
                        fontSize={"10px"}
                        color={colorMode === "light" ? "gray.500" : "white"}
                        fontWeight={"medium"}
                      >
                        Edit Your Wishlist
                      </Text>
                    </Box>
                  </Flex>
                </Link>
                <Link href={"/compare"}>
                  <Flex
                    // mr={"0.4rem"}
                    cursor={"pointer"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    _hover={{ textDecor: "underline", color: "black" }}
                    fontWeight="semibold"
                    align={"center"}
                    pos={"relative"}
                  >
                    <Badge
                      pos={"absolute"}
                      bg="red.500"
                      borderRadius={"50px"}
                      top={"2px"}
                      color={"white"}
                      // top={"3rem"}
                      left={"1.3rem"}
                      zIndex={"99"}
                    >
                      {compareProduct.length}
                    </Badge>
                    <Box
                      border={"1px"}
                      borderWidth={"2px"}
                      pos={"relative"}
                      borderRadius={"50%"}
                    >
                      <MdCompareArrows fontSize={"28px"} />
                    </Box>

                    <Box mx={"0.5rem"}>
                      <Text>Compare</Text>
                      <Text
                        fontSize={"10px"}
                        color={colorMode === "light" ? "gray.500" : "white"}
                        fontWeight={"medium"}
                      >
                        Product Comparison
                      </Text>
                    </Box>
                  </Flex>
                </Link>
              </Flex>
            </>
          )}
        </Flex>
      )}

      {/* //desktop */}
    </>
  );
};

export default Navbar;
