import React, { useState } from "react";
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
  Image,
  Flex,
  Collapse,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";

import BreadCrumb from "@/Components/Shared/BreadCrumb";
import secureLocalStorage from "react-secure-storage";
import { ArrowDown, ArrowUp } from "react-feather";

export default function Index({ categoryList }) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box minH={"100vh"}>
        <Box bg={"#EFF1F4"} p="0.8rem">
          <BreadCrumb>plastic-surgery-instruments</BreadCrumb>
        </Box>
        {/* <Center bg="#153A5B" p={"1rem"}> */}
        <Heading
          w={"90%"}
          mx={"auto"}
          my={"1rem"}
          textTransform={"capitalize"}
          color={"#153A5B"}
          as={"h1"}
          // size={{ sm: "lg", md: "lg", lg: "lg" }}
        >
          Plastic Surgery Instruments
        </Heading>
        {/* </Center> */}
        <Flex
          direction={["column", "column", "row"]}
          justify={"center"}
          // align={"center"}
          gap={"2rem"}
          w={"90%"}
          mx="auto"
        >
          <Box mt={"1rem"}>
            <Image
              src="/assets/plastic-surgery-instruments.jpg"
              align={"plastic-surgery-instrument"}
              objectFit={"fill"}
              // width={"50%"}
              // height={"250px"}
              // mx={"auto"}
              border={"1px"}
              borderColor={"gray.100"}
            />
          </Box>
          <Box
            mt={"1rem"}
            width={"90%"}
            textTransform={"capitalize"}
            mx={"auto"}
          >
            <Collapse color="'gray.500" startingHeight={150} in={show}>
              At Hospital Hand Tool, we offer a wide range of high-quality
              <Text as={"span"} color={"black"} fontWeight={"semibold"}>
                {" "}
                plastic surgery instruments
              </Text>{" "}
              for professionals in the field of plastic and reconstructive
              surgery. <br />
              <br /> Our instruments are made of the finest materials, such as
              stainless steel and titanium, and are designed to be durable,
              precise, and easy to handle. Whether you're looking for
              <Text as={"span"} color={"black"} fontWeight={"semibold"}>
                {" "}
                forceps
              </Text>
              , scissors, retractors, or{" "}
              <Text as={"span"} color={"black"} fontWeight={"semibold"}>
                {" "}
                microsurgical instruments
              </Text>
              , we have you covered. Our products are organized into
              easy-to-navigate categories, making it easy for you to find the
              instruments you need for your procedures. <br />
              <br /> We pride ourselves on offering detailed product
              descriptions and clear, high-resolution images of our products, so
              you can make an informed decision when purchasing from us.
              Additionally, we offer customer reviews and ratings on our product
              pages, giving you an idea of what other professionals in the field
              think of our products. At Hospital Hand Tool, we're committed to
              providing you with the tools you need to perform successful
              plastic surgery procedures. Shop our selection of plastic surgery
              instruments today and experience the difference that high-quality
              tools can make.
            </Collapse>
            <Button
              mt="1rem"
              bg={"#153A5B"}
              rightIcon={
                show ? (
                  <ArrowUp fontSize={"6px"} />
                ) : (
                  <ArrowDown fontSize={"6px"} />
                )
              }
              color="white"
              // variant={"outline"}
              _hover={{
                shadow: "base",
              }}
              size="sm"
              borderRadius={"none"}
              onClick={() => handleToggle()}
              // mt="1rem"
            >
              Show {show ? "Less" : "More"}
            </Button>
          </Box>
        </Flex>

        {categoryList.length ? (
          <PlasticSurgery
            categoryList={categoryList}
            slug={"plastic-surgery-instruments"}
          />
        ) : (
          <>
            <Flex justify="center" mt={"4rem"}>
              <Text fontSize={"3rem"} color={"#153A5B"} fontWeight={"semibold"}>
                Sorry ! No Category Added Yet
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
      mainCategory: "plastic surgery instruments",
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
