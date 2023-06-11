import React from "react";
import dbConnect from "@/Middleware/connectDb";
import Category from "@/models/Category";
import PlasticSurgery from "@/Components/plastic-surgery/PlasticSurgery";
import {
  Center,
  Heading,
  Flex,
  Box,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

import BreadCrumb from "@/Components/Shared/BreadCrumb";
import { NotFound } from "@/Components/ProductNotFound/NotFound";

export default function Index({ categoryList }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box minH={"100vh"}>
        <Box bg={colorMode == "light" ? "gray.100" : "gray.900"} p="1rem">
          <BreadCrumb>instruments-sets</BreadCrumb>
        </Box>
        <Box>
        {categoryList.length ? ( 
          <>
          <Center bg="#153A5B" p={"1rem"}>
            <Heading
              textTransform={"Capitalize"}
              color={"white"}
              size={{ sm: "lg", md: "lg", lg: "lg" }}
            >
              instruments-sets
            </Heading>
          </Center>
          <Center mt={"1rem"}>
            <Text
              textAlign={"center"}
              width="60%"
              color={"grey.400"}
              fontSize={{ base: "11px", md: "15px", lg: "1.2rem" }}
            >
              Experience the Precision and Quality of Our Cutting-Edge Plastic
              Surgery Instruments - Empowering Your Beauty with Confidence
            </Text>
          </Center>

          
            <PlasticSurgery
              categoryList={categoryList}
              slug={"instruments-sets"}
            />

</>
          ) : (
            <>
              <NotFound text={' Sorry ! No Category Posted Yet'} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  // let url = context.params.category.replaceAll("-", " ");

  try {
    const res = await Category.find({
      mainCategory: "instruments sets",
    });
    const posts = await JSON.parse(JSON.stringify(res));
    // console.log(posts);
    return {
      props: { categoryList: posts }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
  }
}
