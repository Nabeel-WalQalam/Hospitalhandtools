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
import Category from "@/models/Category";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Allcategory({ products }) {
  // console.log("products", products);
  return (
    <>
      <Box height={"100vh"} width="100%">
        <Box bg="#153A5B">
          <Center>
            <Heading color={"white"}>All Categorys</Heading>
          </Center>
        </Box>
        <Flex
          // border={"1px"}
          mt="2rem"
          // w={"90%"}
          width={"100%"}
          justify="center"
          align="center"
          gap={"15px"}
          mx="auto"
          wrap={"wrap"}
        >
          {products.map((items) => {
            // console.log("items", items);
            // let url = items.title.replace(/\s/g, "-");
            return (
              <Card
                _hover={{ shadow: "xl", filter: "auto", brightness: "98%" }}
                key={items._id}
                maxW={["300px"]}
                mx="1rem"
                my="2rem"
                border={"1px"}
                borderColor={"rgba(21, 58, 91, 0.3)"}
              >
                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading size="sm" color={"#153A5B"}>
                      {items.mainCategory}
                    </Heading>
                  </Stack>
                </CardBody>

                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Link
                      href={`/haniyanasir/admin/editcategory?id=${items._id}`}
                    >
                      <Button
                        _hover={{
                          bg: "white",
                          color: "#153A5B",
                          border: "1px solid #153A5B",
                          fill: "red",
                        }}
                        variant="outline"
                        color="#153A5B"
                      >
                        Edit Category
                      </Button>
                    </Link>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const { params } = context;
  // console.log(params.slug);

  const res = await Category.find();
  const posts = await JSON.parse(JSON.stringify(res));
  // console.log(posts);

  return {
    props: { products: posts }, // will be passed to the page component as props
  };
}
