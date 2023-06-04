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
  Badge,
} from "@chakra-ui/react";
import dbConnect from "@/Middleware/connectDb";
import Category from "@/models/Category";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Allcategory({ products }) {
  console.log("products", products);
  return (
    <>
      <Box width="100%">
        <Box bg="gray.200">
          <Center>
            <Heading color={"#153A5B"}>All Categorys</Heading>
          </Center>
        </Box>
        <Flex
          // border={"1px"}
          // mt="2rem"
          // w={"90%"}
          // width={"100%"}
          justify="center"
          align="center"
          // gap={"15px"}
          mx="auto"
          // wrap={"wrap"}
          // display="flex"
          flexDirection="column"
        >
          {products.map((items) => {
            // console.log("items", items);
            // let url = items.title.replace(/\s/g, "-");
            return (
              <Card
                _hover={{ shadow: "xl", filter: "auto", brightness: "98%" }}
                key={items._id}
                // maxW={["300px"]}
                width="80%"
                mx="1rem"
                my="1rem"
                border={"1px"}
                borderColor={"rgba(21, 58, 91, 0.3)"}
              >
                <CardBody direction="column">
                  <Stack mt="6" spacing="3">
                    <Heading my="0.5rem" size="md" color={"#153A5B"}>
                      {items.mainCategory}
                    </Heading>
                  </Stack>
                  <Flex gap="2rem" width="100%" wrap="wrap">
                    {items.subCategory
                      ? items.subCategory.map((subItems) => {
                          return (
                            <Box key={subItems.name}>
                              <Badge fontSize="1rem">{subItems.name}</Badge>
                            </Box>
                          );
                        })
                      : "No Subcategory Added"}
                  </Flex>
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
                        variant="solid"
                        colorScheme="facebook"
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
