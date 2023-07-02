import {
  Button,
  CloseButton,
  Flex,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorMode,
  Box,
  Table,
} from "@chakra-ui/react";
import React from "react";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "@/store/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const CartTable = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { colorMode } = useColorMode();

  return (
    <Flex>
      <Box mt={"1rem"} overflowX="auto" w="100%" maxHeight="600px">
        <TableContainer>
          <Table
            // maxH={"90%"}
            // colorScheme={"#153A5B"}
            // _hover={{ bg: "none" }}
            size={"sm"}
            // height={"200px"}
            border={"1px"}
            borderColor={colorMode == "light" ? "gray.300" : "gray.400"}
            // overflowY={"scroll"}
            width={"100%"}
          >
            <Thead
              border={"1px"}
              borderColor={colorMode == "light" ? "gray.300" : "gray.400"}
            >
              <Tr>
                <Th
                  color={colorMode === "light" ? "#white" : "white"}
                  fontWeight="bold"
                >
                  Image
                </Th>
                <Th
                  color={colorMode === "light" ? "#white" : "white"}
                  fontWeight="bold"
                >
                  Title
                </Th>
                <Th
                  color={colorMode === "light" ? "#white" : "white"}
                  fontWeight="bold"
                >
                  Qty
                </Th>
                <Th
                  color={colorMode === "light" ? "#white" : "white"}
                  fontWeight="bold"
                >
                  Unit Price
                </Th>
                <Th
                  color={colorMode === "light" ? "#white" : "white"}
                  fontWeight="bold"
                >
                  Total Price
                </Th>
                <Th
                  color={colorMode === "light" ? "#white" : "white"}
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
                      {cart[k].image != null ? (
                        <Image
                          src={cart[k].image}
                          alt={cart[k].title}
                          width={70}
                          height={20}
                        />
                      ) : (
                        <Image
                          src={
                            colorMode === "light"
                              ? "/assets/logo.png"
                              : "/assets/logoWhite.svg"
                          }
                          alt="Logo"
                          width={70}
                          height={20}
                        />
                      )}
                    </Td>
                    <Td color={colorMode === "light" ? "#153A5B" : "white"}>
                      <Tooltip label={cart[k].title} aria-label="A tooltip">
                        Hover me...
                      </Tooltip>
                      <Text
                        fontWeight={"semibold"}
                        color={colorMode === "light" ? "#153A5B" : "white"}
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
                            dispatch(decrementQuantity(cart[k].Slug));
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
                          color={colorMode === "light" ? "#153A5B" : "white"}
                        >
                          {cart[k].quantity ? cart[k].quantity : ""}
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
                            dispatch(incrementQuantity(cart[k].Slug));
                          }}
                          // fontSize={"1.5rem"}
                        >
                          +
                        </Button>
                      </Flex>
                    </Td>
                    <Td color={colorMode === "light" ? "#153A5B" : "white"}>
                      ${cart[k].price}
                    </Td>
                    <Td color={colorMode === "light" ? "#153A5B" : "white"}>
                      ${(cart[k].price * cart[k].quantity).toFixed(2)}
                    </Td>
                    <Td color={colorMode === "light" ? "#153A5B" : "white"}>
                      <CloseButton
                        onClick={() => dispatch(removeItem(cart[k].Slug))}
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
  );
};

export default CartTable;
