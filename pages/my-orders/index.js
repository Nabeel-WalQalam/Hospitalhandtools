import dbConnect from "@/Middleware/connectDb";
import Order from "@/models/Order";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box, Button, Center, Heading, useToast } from "@chakra-ui/react";
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
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

import secureLocalStorage from "react-secure-storage";
import { useSelector } from "react-redux";

export default function Index({ orders }) {
  const user = useSelector((state) => state.user.user);

  const { colorMode } = useColorMode();
  // console.log(orders);
  const Router = useRouter();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    let filterOrders = orders.filter((item) => {
      if (item.user) {
        return item;
      }
    });
    console.log(filterOrders);
    setOrder(filterOrders);

    if (!secureLocalStorage.getItem("token")) {
      Router.push("/");
    }
  }, [orders]);

  return (
    <>
      <Box height={"100vh"}>
        {order.length ? (
          <Box>
            <Center bg={"#153A5B"} mt="1rem">
              <Heading color={"white"}>My Orders</Heading>
            </Center>

            <TableContainer
              my={"2rem"}
              w={"70%"}
              marginInline="auto"
              border={"1px"}
              borderColor="gray.300"
            >
              <Table color={"#153A5B"}>
                <TableCaption>List of All Orders</TableCaption>
                <Thead>
                  <Tr>
                    <Th
                      color={colorMode == "light" ? "#153A5B" : "white"}
                      fontSize="1.2rem"
                    >
                      Order Id #
                    </Th>
                    <Th
                      color={colorMode == "light" ? "#153A5B" : "white"}
                      fontSize="1.2rem"
                    >
                      Amount
                    </Th>
                    <Th
                      color={colorMode == "light" ? "#153A5B" : "white"}
                      fontSize="1.2rem"
                    >
                      Status
                    </Th>
                    <Th
                      color={colorMode == "light" ? "#153A5B" : "white"}
                      fontSize="1.2rem"
                    >
                      Details
                    </Th>
                  </Tr>
                </Thead>
                <Tbody bg={colorMode == "light" ? "" : "grey"}>
                  {order.map((items) => {
                    return (
                      <Tr key={items._id}>
                        <Td color={colorMode == "light" ? "#153A5B" : "white"}>
                          {items.orderId}
                        </Td>
                        <Td color={colorMode == "light" ? "#153A5B" : "white"}>
                          ${items.amount}
                        </Td>
                        <Td color={colorMode == "light" ? "#153A5B" : "white"}>
                          {items.status}
                        </Td>

                        <Td>
                          <Link
                            href={`/my-orders/orderdetail?id=${items.orderId}`}
                          >
                            <Button colorScheme={"purple"}>Detail</Button>
                          </Link>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <>
            <Box>
              <Center bg={"#153A5B"} mt="1rem">
                <Heading color={"white"}>No Order Found yet!</Heading>
              </Center>
            </Box>
            <Box my={"2rem"}>
              <Link href={"/"}>
                <Button colorScheme={"facebook"}>Shop Now</Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log(context);
  await dbConnect();
  let orders = await Order.find();
  const posts = await JSON.parse(JSON.stringify(orders));
  // console.log(posts);
  return {
    props: { orders: posts },
  };
}
