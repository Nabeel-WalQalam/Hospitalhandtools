import React from "react";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
const SubTrendingProduct = () => {
  return (
    <>
      <Flex
        bgColor={"#153A5B"}
        border={"1px"}
        width={["100%", "80%", "70%", "70%"]}
        justify={"center"}
        direction={["column", "column", "row", "row"]}
        gap={["0rem", "0rem", "2rem", "10rem"]}
        marginInline={"auto"}
        align="center"
        p={["3rem", "3rem", "2rem", "3rem"]}
        mt={"4rem"}
      >
        <Box>
          <Image
            src={"/assets/banner2.png"}
            width={500}
            height={100}
            alt={"instrument sets"}
          />
        </Box>
        <Box>
          <Heading color="white">INSTRUMENTS SETS</Heading>
          <Text color="gray.300" my="1rem">
            Surgical excellence begins with <br /> the right instruments.
          </Text>
          <Link href={"/instruments-sets"}>
            <Button id="specialButton">Shop Now</Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default SubTrendingProduct;
