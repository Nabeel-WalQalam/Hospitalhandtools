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
import { NotFound } from "@/Components/ProductNotFound/NotFound";

export default function Index({ categoryList }) {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(categoryList);
  return (
    <>
      <Box minH={"100vh"}>
        <Box bg={colorMode == "light" ? "gray.100" : "gray.900"} p="1rem">
          <BreadCrumb>ent-instruments</BreadCrumb>
        </Box>
        {categoryList.length ? (
          <>
        <Center bg="#153A5B" p={"1rem"}>
          <Heading
            textTransform={"Capitalize"}
            color={"white"}
            size={{ sm: "lg", md: "lg", lg: "lg" }}
          >
            Ent-Instruments
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
       
          <PlasticSurgery
            categoryList={categoryList}
            slug={"ent-instruments"}
          />
          </>
        ) : (
          <>
          <NotFound text={' Sorry ! No Category Posted Yet'} />
            
          </>
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  let posts = [];
  try {
    const res = await Category.find({
      mainCategory: "ent-instruments",
    });
    posts = await JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: { categoryList: posts },
  };
}
