import { Flex, Spinner, Text, Box } from "@chakra-ui/react";
import React from "react";

export const Loader = () => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      direction={"column"}
      border={"1px"}
      height={"100vh"}
    >
      <Box>
        <Spinner
          color="#153A5B"
          size={"xl"}
          width={"100px"}
          height={"100px"}
          thickness="5px"
        />
      </Box>
      <Text my={"1rem"} fontWeight={"bold"} color={"#153A5B"} fontSize={"2rem"}>
        Hospital Hand Tool
      </Text>
    </Flex>
  );
};
