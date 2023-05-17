import React, { useMemo, useEffect, useState } from "react";
import Image from "next/image";
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
  Avatar,
} from "@chakra-ui/react";
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

  useEffect(() => {
    if (secureLocalStorage.getItem("token")) {
      setusername(secureLocalStorage.getItem("username"));
    }
  }, []);

  const logout = () => {
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("identity");
    secureLocalStorage.removeItem("cart");
    secureLocalStorage.removeItem("username");
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
      <Flex
        py={"0.5rem"}
        display={["flex", "flex", "none", "none"]}
        justify={"space-between"}
        align="center"
        // border={"2px solid red"}
        // position={"sticky"}
        // p="1rem"
        border={"1px"}
        borderColor={"gray.200"}
        boxShadow={"base"}
      >
        <Box ml={"0.5rem"}>
          <HamburgerMobile colorMode={colorMode} />
        </Box>
        <Box>
          <Link href={"/"}>
            <Image
              src={
                colorMode === "light"
                  ? "/assets/logo.svg"
                  : "/assets/logoWhite.svg"
              }
              alt="Hospital-Hand-Tools -Logo"
              width={(100, 200, 200, 200)}
              height="100"
              priority
              style={{ fill: "pink", color: "pink" }}
            />
          </Link>
        </Box>

        {/* <AiOutlineShoppingCart
          fontSize={"1.5rem"}
          fill={colorMode === "light" ? "#153A5B" : "white"}
          fontWeight="bold"
          onClick={onOpen}
        /> */}
      </Flex>
      {/* //desktop */}
      <Flex
        display={["none", "none", "flex", "flex"]}
        justify={"space-between"}
        align="center"
        border={"1px"}
        borderColor={colorMode === "light" ? "gray.200" : "gray.200"}
        // shadow={"base"}
        p="0.5rem"
        w={"100%"}
        marginInline="auto"
        // pos={"sticky"}
        // top={"0px"}
        bg={colorMode === "light" ? "white" : "#153A5B"}
        zIndex={"999"}
      >
        {Router.pathname === "/checkout" ? (
          <>
            <Link href={"/"}>
              <Image
                src={
                  colorMode === "light"
                    ? "/assets/logo.svg"
                    : "/assets/logoWhite.svg"
                }
                alt="Hospital-Hand-Tools -Logo"
                width={230}
                height={100}
                priority
              />
            </Link>
          </>
        ) : (
          <>
            <Link href={"/"}>
              <Image
                src={
                  colorMode === "light"
                    ? "/assets/logo.svg"
                    : "/assets/logoWhite.svg"
                }
                alt="Logo"
                width={230}
                height={100}
                priority
              />
            </Link>
            <VoucherSearch colorMode={colorMode} />
            <Flex
              // border={"1px"}
              listStyleType="none"
              align={"center"}
              justify={"center"}
              mr={"1rem"}
              gap={"1rem"}
            >
              <Box>
                {!user ? (
                  <Link href={"/Auth"}>
                    <Flex
                      // mr={"0.4rem"}
                      color={colorMode === "light" ? "#153A5B" : "white"}
                      fontWeight="semibold"
                      as={motion.div}
                      whileHover={{ scale: 1.1 }}
                      // whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      style={{ fontWeight: "bold" }}
                      // border={"1px"}
                      align={"center"}
                    >
                      <Box>
                        <RiUserSharedLine fontSize={"30px"} />
                      </Box>
                      <Box mx={"0.5rem"}>
                        <Text>Account</Text>
                        <Text
                          fontSize={"0.8rem"}
                          color={colorMode === "light" ? "gray.600" : "white"}
                          fontWeight={"medium"}
                        >
                          login/Register
                        </Text>
                      </Box>
                    </Flex>
                  </Link>
                ) : (
                  <Box>
                    <Menu>
                      <MenuButton
                        as={motion.div}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        style={{
                          color: colorMode === "light" ? "#153A5B" : "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
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
                          <Box mx={"0.5rem"}>
                            <Text>Account</Text>
                            <Text
                              mr={"1rem"}
                              fontSize={"0.8rem"}
                              color={
                                colorMode === "light" ? "gray.600" : "white"
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
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  style={{ fontWeight: "bold" }}
                  // border={"1px"}
                  align={"center"}
                  pos={"relative"}
                >
                  <Badge
                    pos={"absolute"}
                    bg="red.500"
                    borderRadius={"50%"}
                    top={"0px"}
                    color={"white"}
                    // top={"3rem"}
                    left={"1.4rem"}
                    zIndex={"99"}
                  >
                    {wishListProduct.length}
                  </Badge>
                  <Box pos={"relative"}>
                    <BsSuitHeart fontSize={"30px"} />
                  </Box>
                  <Box mx={"0.5rem"}>
                    <Text>Wishlist</Text>
                    <Text
                      fontSize={"0.8rem"}
                      color={colorMode === "light" ? "gray.600" : "white"}
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
                  fontWeight="semibold"
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  style={{ fontWeight: "bold", position: "relative" }}
                  // border={"1px"}
                  align={"center"}
                  // pos={"relative"}
                >
                  <Badge
                    pos={"absolute"}
                    bg="red.500"
                    borderRadius={"50%"}
                    top={"0px"}
                    color={"white"}
                    // top={"3rem"}
                    left={"1.4rem"}
                    zIndex={"99"}
                  >
                    {compareProduct.length}
                  </Badge>
                  <Box border={"1px"} pos={"relative"} borderRadius={"50%"}>
                    <MdCompareArrows fontSize={"30px"} />
                  </Box>

                  <Box mx={"0.5rem"}>
                    <Text>Compare</Text>
                    <Text
                      fontSize={"0.8rem"}
                      color={colorMode === "light" ? "gray.600" : "white"}
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
    </>
  );
};

export default Navbar;
