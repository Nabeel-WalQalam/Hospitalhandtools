import React, { useState, useEffect } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Progress,
} from "@chakra-ui/react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
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
  Tooltip,
  Center,
  Avatar,
  MenuButton,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import Image from "next/image";
import {
  Box,
  Divider,
  Stack,
  useColorMode,
  useDisclosure,
  Flex,
  Badge,
  CloseButton,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import {
  addToCart,
  clearCart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "@/store/cartSlice";
export const NavbarCat = ({}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [subTotal, setsubTotal] = useState(0);
  // console.log(cart);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += 1;
    });
    return total;
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total = item.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    if (cart.length) {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        let stotal = cart[i].price * cart[i].quantity;
        total += stotal;
      }
      setsubTotal(total);
    }
  }, [cart]);

  // console.log("cart Total", subTotal);
  return (
    <>
      <Box>
        <Tooltip label="cart" aria-label="cart">
          <Flex
            as={motion.div}
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            style={{ color: "white", fontWeight: "bold" }}
            pos={"relative"}
          >
            <AiOutlineShoppingCart
              cursor={"pointer"}
              color="white"
              fontSize={"2rem"}
              fill={colorMode === "light" ? "white" : "white"}
              fontWeight="bold"
              id="cartBoxOpener"
              onClick={onOpen}
            />

            {cart.length ? (
              <>
                <Badge
                  pos={"absolute"}
                  top={"-10px"}
                  left={"2rem"}
                  // ml="1"
                  fontSize="1em"
                  colorScheme="facebook"
                  color={colorMode === "light" ? "#153A5B" : "white"}
                >
                  {getTotalQuantity() || 0}
                </Badge>
              </>
            ) : (
              ""
            )}
          </Flex>
        </Tooltip>

        <Drawer
          isOpen={isOpen}
          size="xl"
          placement="right"
          onClose={onClose}
          closeOnOverlayClick={true}
          closeOnEsc={true}
        >
          <DrawerOverlay />
          <DrawerContent zIndex={"9999"}>
            <DrawerCloseButton />
            <Flex align={"center"}>
              <Heading
                mt={"0.2rem"}
                ml="1rem"
                color={colorMode === "light" ? "#153A5B" : "white"}
              >
                Your Cart
              </Heading>
              <Box ml={"1rem"}>
                {cart.length ? (
                  <>
                    <Badge ml="1" fontSize="1.5rem" colorScheme="facebook">
                      {getTotalQuantity() || 0} items
                    </Badge>
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Flex>
            <Divider
              border={"1px"}
              borderColor={colorMode === "light" ? "#153A5B" : "white"}
            />

            {Object.keys(cart).length == 0 && (
              <Flex
                mt={"5rem"}
                justify={"center"}
                direction="column"
                align={"center"}
              >
                <Text color={colorMode === "light" ? "#153A5B" : "white"}>
                  You're $500.00 away from getting free shipping.
                </Text>
                <Center>
                  <Text
                    p={"0.2rem"}
                    fontSize={"2rem"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    fontWeight={"semibold"}
                    my="1rem"
                    w="100%"
                    mx={"auto"}
                  >
                    Oh, it appears your cart is empty
                  </Text>
                </Center>
                <Button
                  width={[80, 80, 80, 80]}
                  bg="#153A5B"
                  border={"1px"}
                  borderColor={colorMode === "light" ? "#153A5B" : "white"}
                  color={colorMode === "light" ? "white" : "white"}
                  _hover={{ bg: "white", color: "#153A5B", border: "1px" }}
                >
                  SHOP NOW
                </Button>
              </Flex>
            )}

            {Object.keys(cart).length != 0 && (
              <>
                <Flex
                  // border={"1px"}
                  direction={"column"}
                  height={["none", "90%"]}
                  justify={"space-between"}
                >
                  <Flex
                    // border={"1px"}
                    // borderBottom={"1px"}
                    // borderColor="gray.400"
                    w={"100%"}
                    // justify={"center"}
                    // align="center"
                    my={"2rem"}
                    direction="column"
                    p={"1rem"}
                  >
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
                          <span
                            style={{ color: "#153A5B", fontWeight: "bold" }}
                          >
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
                              color:
                                colorMode === "light" ? "#153A5B" : "white",
                              fontWeight: "bold",
                            }}
                          >
                            - ${500 - subTotal} -
                          </span>{" "}
                          away from free
                          <span
                            style={{
                              color:
                                colorMode === "light" ? "#153A5B" : "white",
                              fontWeight: "bold",
                            }}
                          >
                            -shipping!
                          </span>
                        </>
                      )}
                    </Text>
                    <Flex
                      // border="1px"
                      // borderColor={"gray.400"}
                      direction={"column"}
                      // borderInline="1px"
                      // borderColor={"#153A5B"}
                    >
                      <Box mt={"1rem"} overflowY="scroll" maxH="500px">
                        <TableContainer>
                          <Table
                            // variant="simple"

                            // colorScheme={"#153A5B"}
                            // _hover={{ bg: "none" }}
                            size={"md"}
                            border="1px"
                            // height={"200px"}
                            borderColor={
                              colorMode == "light" ? "gray.300" : "gray.400"
                            }
                            // overflowY={"scroll"}
                            // maxH={"600px"}
                          >
                            <Thead>
                              <Tr>
                                <Th
                                  color={
                                    colorMode === "light" ? "#white" : "white"
                                  }
                                  fontWeight="bold"
                                >
                                  Image
                                </Th>
                                <Th
                                  color={
                                    colorMode === "light" ? "#white" : "white"
                                  }
                                  fontWeight="bold"
                                >
                                  Title
                                </Th>
                                <Th
                                  color={
                                    colorMode === "light" ? "#white" : "white"
                                  }
                                  fontWeight="bold"
                                >
                                  Qty
                                </Th>
                                <Th
                                  color={
                                    colorMode === "light" ? "#white" : "white"
                                  }
                                  fontWeight="bold"
                                >
                                  Unit Price
                                </Th>
                                <Th
                                  color={
                                    colorMode === "light" ? "#white" : "white"
                                  }
                                  fontWeight="bold"
                                >
                                  Total Price
                                </Th>
                                <Th
                                  color={
                                    colorMode === "light" ? "#white" : "white"
                                  }
                                  fontWeight="bold"
                                ></Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {Object.keys(cart).map((k, index) => {
                                // console.log(cart);
                                const item = cart[k];
                                const key = `${item.title}-${index}`;
                                // settotalWeigth(totalWeight);

                                // let totalWeight = Weight;
                                // totalWeight = Weight

                                return (
                                  <Tr key={key}>
                                    <Td>
                                      {cart[k].image == null ? (
                                        <Image
                                          src={cart[k].image}
                                          alt={cart[k].productName}
                                          width={70}
                                          height={20}
                                        />
                                      ) : (
                                        <Image
                                          src={
                                            colorMode === "light"
                                              ? "/assets/logo.svg"
                                              : "/assets/logoWhite.svg"
                                          }
                                          alt="Logo"
                                          width={230}
                                          height={100}
                                        />
                                      )}
                                    </Td>
                                    <Td
                                      color={
                                        colorMode === "light"
                                          ? "#153A5B"
                                          : "white"
                                      }
                                    >
                                      <Tooltip
                                        label={cart[k].title}
                                        aria-label="A tooltip"
                                      >
                                        Hover me...
                                      </Tooltip>
                                      <Text
                                        fontWeight={"semibold"}
                                        color={
                                          colorMode === "light"
                                            ? "#153A5B"
                                            : "white"
                                        }
                                      >
                                        {cart[k].options ? "Options" : ""}
                                      </Text>

                                      {cart[k].options ? cart[k].options : ""}
                                    </Td>
                                    <Td>
                                      <Flex align={"center"}>
                                        <Button
                                          size={"sm"}
                                          cursor={"pointer"}
                                          onClick={() => {
                                            dispatch(
                                              decrementQuantity(cart[k].Slug)
                                            );
                                          }}
                                          _hover={{
                                            bg: "#153A5B",
                                            color: "white",
                                          }}
                                          fontSize={"1.1rem"}
                                        >
                                          -
                                        </Button>
                                        <Text
                                          mx={"1rem"}
                                          fontWeight={"semibold"}
                                          // variant="unstyled"
                                          // fontSize="1rem"
                                          color={
                                            colorMode === "light"
                                              ? "#153A5B"
                                              : "white"
                                          }
                                        >
                                          {cart[k].quantity
                                            ? cart[k].quantity
                                            : ""}
                                        </Text>
                                        <Button
                                          _hover={{
                                            bg: "#153A5B",
                                            color: "white",
                                          }}
                                          size={"sm"}
                                          fontSize={"1rem"}
                                          cursor={"pointer"}
                                          onClick={() => {
                                            dispatch(
                                              incrementQuantity(cart[k].Slug)
                                            );
                                          }}
                                          // fontSize={"1.5rem"}
                                        >
                                          +
                                        </Button>
                                      </Flex>
                                    </Td>
                                    <Td
                                      color={
                                        colorMode === "light"
                                          ? "#153A5B"
                                          : "white"
                                      }
                                    >
                                      ${cart[k].price}
                                    </Td>
                                    <Td
                                      color={
                                        colorMode === "light"
                                          ? "#153A5B"
                                          : "white"
                                      }
                                    >
                                      $
                                      {(
                                        cart[k].price * cart[k].quantity
                                      ).toFixed(2)}
                                    </Td>
                                    <Td
                                      color={
                                        colorMode === "light"
                                          ? "#153A5B"
                                          : "white"
                                      }
                                    >
                                      <CloseButton
                                        onClick={() =>
                                          dispatch(removeItem(cart[k].Slug))
                                        }
                                      />
                                    </Td>
                                  </Tr>
                                );
                              })}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Flex>
                  </Flex>

                  {/* <Divider
                    border={"1px"}
                    borderColor="gray"
                    width={"95%"}
                    marginInline="auto"
                  /> */}

                  <Flex
                    justify="flex-end"
                    direction={["column", "column", "column", "column"]}
                  >
                    <Flex
                      direction={"column"}
                      mb={"4rem"}
                      justify={"end"}
                      // width={"90%"}
                    >
                      <Divider
                        border={"1px"}
                        borderColor="gray"
                        width={"100%"}
                        marginInline="auto"
                      />
                      <Flex
                        mr={["0px", "3rem"]}
                        my={"1.5rem"}
                        justify={"space-between"}
                        align={["none", "center"]}
                        direction={["column", "row"]}
                        gap={["1rem", "0px"]}
                      >
                        <Box ml={["0px", "2rem"]}>
                          <Text mr={["0px", "2rem"]} textDecor={"underline"}>
                            Shipping and taxes calculated at checkout*
                          </Text>
                        </Box>
                        <Flex>
                          <Box
                            color={colorMode === "light" ? "#153A5B" : "white"}
                            fontWeight={"semibold"}
                            fontSize={"1.5rem"}
                          >
                            Subtotal :
                          </Box>
                          <Box
                            color={colorMode === "light" ? "#153A5B" : "white"}
                            fontWeight={"semibold"}
                            fontSize={"1.5rem"}
                            mx={"0.5rem"}
                          >
                            $ {(subTotal || 0).toFixed(2)}
                          </Box>
                        </Flex>
                      </Flex>
                      <Divider
                        border={"1px"}
                        borderColor="gray"
                        width={"100%"}
                        // marginInline="auto"
                      />
                    </Flex>
                    <Flex
                      gap="1rem"
                      justify={["center", "center", "end"]}
                      align={"center"}
                      direction={["column", "row"]}
                    >
                      <Button
                        width={[80, 80, 80, 60]}
                        variant="outline"
                        color={"#153A5B"}
                        bg="white"
                        borderColor="#153A5B"
                        _hover={{
                          bg: "#153A5B",
                          color: "white",
                          border: "1px",
                          borderColor: "#153A5B",
                        }}
                        onClick={() => dispatch(clearCart(null))}
                        // mr="1.5rem"
                      >
                        Clear Cart
                      </Button>
                      <Link href={"/checkout"}>
                        <Button
                          onClick={onClose}
                          width={[80, 80, 80, 60]}
                          variant="outline"
                          color={"white"}
                          bg="#153A5B"
                          // mr="1rem"
                          _hover={{
                            bg: "white",
                            color: "#153A5B",
                            border: "1px",
                            borderColor: "#153A5B",
                          }}
                        >
                          Check Out Now
                        </Button>
                      </Link>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};
