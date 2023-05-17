import { Table } from "@/Components/Table/Table";
import dbConnect from "@/Middleware/connectDb";
import Order from "@/models/Order";

import { Center, Box, Heading } from "@chakra-ui/react";
import React from "react";

export default function allorders({ allOrder }) {
  console.log("order", allOrder);
  return (
    <>
      <Box width={"100%"} height="100vh">
        <Box bg={"#153A5B"} py="0.5rem">
          <Center>
            <Heading color={"white"}>All Orders</Heading>
          </Center>
        </Box>
        <Box my={"2rem"}>
          <Table allOrder={allOrder} />
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  let allOrders = await Order.find();
  const posts = await JSON.parse(JSON.stringify(allOrders));

  return {
    props: { allOrder: posts },
  };
}
