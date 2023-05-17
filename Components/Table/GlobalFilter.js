import React from "react";
import { Input, Box, Flex, Text } from "@chakra-ui/react";

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <>
      <Flex
        my={"2rem"}
        w={"100%"}
        // border="1px"
        // marginInline="auto"
        alignItems="center"
        justify={"center"}
        // bg="#153A5B"
      >
        <Input
          mx={"1rem"}
          w={"60%"}
          bg={"white"}
          border={"1px"}
          borderColor="#153A5B"
          placeholder="Search By Anything..."
          type="search"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Flex>
    </>
  );
}
