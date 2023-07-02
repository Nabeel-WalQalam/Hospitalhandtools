import React, { useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Menu,
  MenuList,
  Button,
  Text,
  Center,
  Progress,
  Box,
  Divider,
  useColorMode,
  useDisclosure,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import CartTable from "../Cart/CartTable";
import { CartBottom } from "../Cart/CartBottom";
import CartTop from "../Cart/CartTop";
export const NavbarCat = ({ color, paddingGap, totalQuantity, subTotal }) => {
  const cart = useSelector((state) => state.cart.cart);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log("run cart");
  }, []);

  return (
    <>
      <Flex
        // height={"100%"}
        align={"center"}
        fontWeight={"semibold"}
        pos={"relative"}
        px={!paddingGap ? "none" : "1rem"}
        py="0.5rem"
      >
        <AiOutlineShoppingCart
          cursor={"pointer"}
          // color="white"
          fontSize={"2rem"}
          fill={colorMode === "light" ? color : "white"}
          fontWeight="bold"
          id="cartBoxOpener"
          onClick={onOpen}
        />

        {cart.length ? (
          <>
            <Badge
              pos={"absolute"}
              top={"0px"}
              left={"2.5rem"}
              bg={"red.500"}
              // ml="1
              borderRadius={"50px"}
              // fontSize="1em"
              // colorScheme="facebook"
              color={colorMode === "light" ? color : "white"}
            >
              {totalQuantity}
            </Badge>
          </>
        ) : (
          ""
        )}
      </Flex>

      <Drawer
        isOpen={isOpen}
        size="lg"
        placement="right"
        onClose={onClose}
        closeOnOverlayClick={true}
        closeOnEsc={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Flex p={1} gap={"1rem"} align={"center"}>
            <Heading
              // mt={"0.2rem"}
              // ml="1rem"
              color={colorMode === "light" ? "#153A5B" : "white"}
            >
              Your Cart
            </Heading>
            <Box>
              {cart.length && (
                <Badge ml="1" fontSize="1.5rem" colorScheme="facebook">
                  {totalQuantity} item
                </Badge>
              )}
            </Box>
          </Flex>
          <Divider
            border={"1px"}
            borderColor={colorMode === "light" ? "#153A5B" : "white"}
          />

          {Object.keys(cart).length == 0 ? (
            <CartTop />
          ) : (
            <Flex
              // overflowY={"auto"}
              direction={"column"}
              justify={"space-between"}
              height={"90%"}
              // width={"100%"}
              // border={"1px"}
            >
              <Flex w={"100%"} direction="column" p={"1rem"}>
                <Box my={"1"}>
                  <Progress
                    borderRadius={"8px"}
                    value={subTotal || 0}
                    max={500}
                    size="sm"
                    colorScheme="facebook"
                    animation={"linear"}
                  />
                </Box>
                <Text my={"3"} align={"center"} fontSize={"1.2rem"}>
                  {subTotal >= 500 ? (
                    <>
                      <span style={{ color: "#153A5B", fontWeight: "bold" }}>
                        Congrats!
                      </span>{" "}
                      You're receiving free shipping in store credit on this
                      order!
                    </>
                  ) : (
                    <>
                      You're{" "}
                      <span
                        style={{
                          color: colorMode === "light" ? "#153A5B" : "white",
                          fontWeight: "bold",
                        }}
                      >
                        ${500 - subTotal}
                      </span>{" "}
                      away from free
                      <span
                        style={{
                          color: colorMode === "light" ? "#153A5B" : "white",
                          fontWeight: "bold",
                        }}
                      >
                        -shipping!
                      </span>
                    </>
                  )}
                </Text>

                <CartTable />
              </Flex>

              <CartBottom subTotal={subTotal} />
            </Flex>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
