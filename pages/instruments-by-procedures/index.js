import React from "react";
import dbConnect from "@/Middleware/connectDb";
import Category from "@/models/Category";
import PlasticSurgery from "@/Components/plastic-surgery/PlasticSurgery";
import {
  Center,
  Flex,
  Heading,
  Box,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

import BreadCrumb from "@/Components/Shared/BreadCrumb";

export default function Index({ categoryList }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={colorMode == "light" ? "gray.100" : "gray.900"} p="1rem">
        <BreadCrumb>Instruments-By-Procedures</BreadCrumb>
      </Box>
      <Box minH={"90vh"}>
        <Center bg="#153A5B" p={"1rem"}>
          <Heading
            textTransform={"uppercase"}
            color={"white"}
            size={{ sm: "lg", md: "xl", lg: "xl" }}
          >
            Instruments By Procedures
          </Heading>
        </Center>
        <Center mt={"1rem"}>
          <Text
            color={"grey.400"}
            fontSize={{ base: "11px", md: "15px", lg: "1.2rem" }}
          >
            Go with the Best Preminum Quality of Instruments
          </Text>
        </Center>
        {categoryList.length ? (
          <PlasticSurgery
            categoryList={categoryList}
            slug={"Instruments-By-Procedures"}
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

  try {
    const res = await Category.find({
      mainCategory: "instruments by procedures",
    });
    const posts = await JSON.parse(JSON.stringify(res));

    return {
      props: { categoryList: posts },
    };
  } catch (error) {
    console.log(error);
  }
}
