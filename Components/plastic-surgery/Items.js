import { Box, Flex, Center, Text, useColorMode } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SortingProducts } from "../Sorting/SortingProducts";
import { motion } from "framer-motion";

const Items = ({ categoryList, slug }) => {
  // console.log("listfinal", categoryList);
  const { colorMode } = useColorMode();
  return (
    <>
      {/* <Box mt={"2rem"}>
        <SortingProducts />
      </Box> */}
      <Flex
        // border={"2px"}
        justify="center"
        gap={"3rem"}
        // align={"center"}
        // borderColor="gray.300"
        wrap={"wrap"}
        py="3rem"
      >
        {categoryList
          ? categoryList[0].subCategory.map((items) => {
              console.log(items);
              let url1 = items.name.replace(/\s/g, "-");
              // let url2 = categoryList[0].mainCategory.replaceAll(" ", "-");
              return (
                <Flex
                  justify={"center"}
                  gap={"5rem"}
                  key={items.name}
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  border={"1px"}
                  borderColor={"gray.200"}
                >
                  <Link href={`/${slug}/${url1}`}>
                    <div id="DIV_1">
                      <article id="ARTICLE_2">
                        <header
                          style={{
                            position: "relative",
                            width: "250px",
                            height: "250px",
                          }}
                          id="HEADER_3"
                        >
                          <Image
                            src={
                              items.image
                                ? `${items.image}`
                                : "/assets/dummy.png"
                            }
                            alt={items.name}
                            layout="fill"
                          />
                        </header>
                        <div id="DIV_7">
                          <Text
                            textAlign={"center"}
                            as={"h1"}
                            mt={"0.4rem"}
                            id="H1_8"
                            bg={"#153A5B"}
                            color={colorMode === "light" ? "white" : "white"}
                          >
                            {" "}
                            {items.name ? items.name : ""}
                          </Text>
                        </div>
                      </article>
                    </div>
                  </Link>
                </Flex>
              );
            })
          : ""}
      </Flex>
    </>
  );
};

export default Items;
