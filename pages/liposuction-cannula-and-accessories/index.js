import React from "react";
import dbConnect from "@/Middleware/connectDb";
import Category from "@/models/Category";
import PlasticSurgery from "@/Components/plastic-surgery/PlasticSurgery";
import {
  Center,
  Heading,
  Box,
  Text,
  Button,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";

import BreadCrumb from "@/Components/Shared/BreadCrumb";

export default function Index({ categoryList }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={colorMode == "light" ? "gray.100" : "gray.900"} p="1rem">
        <BreadCrumb>liposuction-cannula-and-accessories</BreadCrumb>
      </Box>
      <Box minH={"100vh"}>
        <Center bg="#153A5B" p={"1rem"}>
          <Heading
            textTransform={"Capitalize"}
            color={"white"}
            size={{ sm: "lg", md: "lg", lg: "lg" }}
          >
            Liposuction Cannula And Accessories
          </Heading>
        </Center>
        <Center mt={"1rem"}>
          <Text
            color={"grey.400"}
            textAlign="center"
            w={"70%"}
            fontSize={{ base: "11px", md: "15px", lg: "1rem" }}
          >
            Transform Your Body Shape and Achieve Your Dream Physique with the
            Precision, Safety, and Efficiency of Liposuction Cannulas and
            Accessories - The Ultimate Solution for Removing Excess Fat and
            Sculpting a Toned and Contoured Figure.
          </Text>
        </Center>
        {categoryList.length ? (
          <PlasticSurgery
            categoryList={categoryList}
            slug={"liposuction-cannula-and-accessories"}
          />
        ) : (
          <>
            <Flex justify="center" mt={"4rem"}>
              <Text fontSize={"3rem"} fontWeight={"semibold"}>
                Sorry ! No Product Found
              </Text>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  // let url = context.params.category.replaceAll("-", " ");

  try {
    const res = await Category.find({
      mainCategory: "liposuction cannula and accessories",
    });
    const posts = await JSON.parse(JSON.stringify(res));

    return {
      props: { categoryList: posts },
    };
  } catch (error) {
    console.log(error);
  }
}
