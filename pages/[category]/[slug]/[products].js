import BreadCrumb from "@/Components/Shared/BreadCrumb";
import Link from "next/link";
import React from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ProductPage from "@/Components/plastic-surgery/ProductPage";
import Product from "@/models/Product";
import dbConnect from "@/Middleware/connectDb";
import { FaShippingFast } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function Instrument({ addtoCart, product }) {
  console.log("log out", product);
  const { colorMode, toggleColorMode } = useColorMode();
  // console.log("new", product);
  const Router = useRouter();
  const slug = Router.query;
  // console.log(slug);

  return (
    <>
      <Box minH={"100vh"}>
        {product ? (
          <>
            <Box bg={colorMode == "light" ? "gray.100" : "gray.900"} p="1rem">
              <BreadCrumb pgaeTitle={slug.category} pgaeTitle2={slug.slug}>
                {slug.products}
              </BreadCrumb>
            </Box>
            <Flex
              direction={["column", "row"]}
              justify={"center"}
              gap={"1rem"}
              py={"0.5rem"}
              bg={"#153A5B"}
            >
              <Button
                leftIcon={<FaShippingFast />}
                fontSize={["1rem", "1rem", "1.2rem"]}
                color={"gray.200"}
                fontWeight={"semibold"}
                variant={"ghost"}
                _hover={{
                  bg: "blue.700",
                }}
              >
                FREE SHIPPING
              </Button>
              <Button
                leftIcon={<FiPhoneCall />}
                fontSize={["1rem", "1rem", "1.2rem"]}
                color={"gray.200"}
                fontWeight={"semibold"}
                variant={"ghost"}
                _hover={{
                  bg: "blue.700",
                }}
              >
                CALL US NOW
              </Button>
              <Button
                leftIcon={<AiOutlineQuestionCircle />}
                fontSize={["1rem", "1rem", "1.2rem"]}
                color={"gray.200"}
                fontWeight={"semibold"}
                variant={"ghost"}
                _hover={{
                  bg: "blue.700",
                }}
              >
                ASK A QUESTION
              </Button>
            </Flex>
            <ProductPage product={product} />
          </>
        ) : (
          <Box
            display={"flex"}
            justifyContent="center"
            alignContent={"center"}
            flexDirection="column"
            textAlign="center"
            py={10}
            px={6}
            height="70vh"
          >
            <Heading
              display="inline-block"
              as="h2"
              size="4xl"
              bgGradient="linear(to-r, blue.400, purple.600)"
              backgroundClip="text"
            >
              404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
              Page Not Found
            </Text>
            <Text color={"gray.500"} mb={6}>
              The page you're looking for does not seem to exist
            </Text>
            <Link href={"/"}>
              <Button
                _hover={{
                  bg: "white",
                  color: "#153A5B",
                  border: "1px",
                  borderColor: "#153A5B",
                }}
                bg={"#153A5B"}
                color="white"
                variant="solid"
              >
                Go to Home
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  let slug = context.params.products.replaceAll("-", " ");
  // console.log("slug", slug);

  try {
    const res = await Product.findOne({ title: slug });
    if (res == null) {
      return {
        props: { product: 0 },
      };
    }
    const posts = await JSON.parse(JSON.stringify(res));
    // console.log(posts);
    if (posts) {
      return {
        props: { product: posts },
      };
    } else {
      return {
        props: { product: null },
      };
    }
  } catch (error) {
    console.log(error);
  }
}
