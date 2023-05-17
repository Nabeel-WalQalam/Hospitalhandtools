import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
  Flex,
  Center,
  color,
} from "@chakra-ui/react";
import dbConnect from "@/Middleware/connectDb";
import Zone from "@/models/Zone";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
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
} from "@chakra-ui/react";

export default function allproducts({ Zones }) {
  console.log("products", Zones);
  return (
    <>
      <Box bg={"gray.300"} height={"100vh"} width="100%">
        <Box bg="#153A5B">
          <Center>
            <Heading color={"white"}>All Zones</Heading>
          </Center>
        </Box>
        <Flex
          // border={"1px"}
          mt="2rem"
          // w={"90%"}
          width={"100%"}
          justify="space-evenly"
          align="center"
          mx="auto"
          wrap={"wrap"}
        >
          <TableContainer>
            <Table variant="striped" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th color={"white"}>Zone</Th>
                  <Th color={"white"}>Country</Th>
                  <Th color={"white"}>Weight / Price</Th>
                  <Th color={"white"}>Edit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Zones.map((items) => {
                  return (
                    <Tr key={items._id}>
                      <Td>{items.zone}</Td>
                      <Td>
                        <Flex>
                          {items.country.map((con) => {
                            return (
                              <Box mx={"0.5rem"} key={con}>
                                {con}
                              </Box>
                            );
                          })}
                        </Flex>
                      </Td>

                      <Td>
                        <Flex wrap={"wrap"}>
                          {items.weights.map((con) => {
                            return (
                              <Box mx={"0.5rem"} key={con.weight}>
                                {con.weight}Kg -- ${con.price}
                              </Box>
                            );
                          })}
                        </Flex>
                      </Td>
                      <Td>
                        <Link href={`/admin/editzone?id=${items._id}`}>
                          <Button colorScheme={"green"}>Edit</Button>
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const { params } = context;
  // console.log(params.slug);

  const res = await Zone.find();
  const posts = await JSON.parse(JSON.stringify(res));
  // console.log(posts);

  return {
    props: { Zones: posts }, // will be passed to the page component as props
  };
}
