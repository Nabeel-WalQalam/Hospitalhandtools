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
import Product from "@/models/Product";
import { useRouter } from "next/router";
import { ProductsTable } from "@/Components/Table/ProductsTable";

export default function Allproducts({ products }) {
  // console.log("products", products);
  return (
    <>
      <Box width="100%">
        <Box bg="gray.200">
          <Center>
            <Heading color={"#153A5B"}>All Products</Heading>
          </Center>
        </Box>
        <Box>
          <ProductsTable products={products} />
        </Box>
        {/* <Flex
          // border={"1px"}
          mt="2rem"
          // w={"90%"}
          width={"100%"}
          justify="space-evenly"
          align="center"
          mx="auto"
          wrap={"wrap"}
        >
          {products.map((items) => {
            // console.log("items", items);
            let url = items.title.replace(/\s/g, "-");
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
                  <Image
                    src="/assets/C_pic_1.png"
                    alt="Green double couch with wooden legs"
                    width={250}
                    height={200}
                    priority
                  />
                  <Divider border="1px" borderColor={"#153A5B"} />
                  <Stack mt="6" spacing="3">
                    <Heading size="sm" color={"#153A5B"}>
                      {items.title}
                    </Heading>

                    <Flex justify={"space-between"} align="center">
                      <Text color="#153A5B" fontSize="2xl">
                        ${items.minPrice} - ${items.maxPrice}
                      </Text>

                      <Text
                        bg={"rgba(21, 58, 91, 1 )"}
                        // py="0.3rem"
                        px="0.2rem"
                        color="white"
                        borderRadius={"5px"}
                      >
                        Model : {items.model}
                      </Text>
                    </Flex>
                  </Stack>
                </CardBody>

                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Link href={`/admin/editproduct?id=${items._id}`}>
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
                        Edit Product
                      </Button>
                    </Link>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
        </Flex> */}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const { params } = context;
  // console.log(params.slug);

  const res = await Product.find();
  const posts = await JSON.parse(JSON.stringify(res));
  // console.log(posts);

  return {
    props: { products: posts }, // will be passed to the page component as props
  };
}
