import { Button, Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

const CartTop = () => {
  const { colorMode } = useColorMode();
  return (
    <React.Fragment>
      <Flex mt={"5rem"} justify={"center"} direction="column" align={"center"}>
        <Text color={colorMode === "light" ? "#153A5B" : "white"}>
          You're $500.00 away from getting free shipping.
        </Text>
        <Center>
          <Text
            p={"0.2rem"}
            fontSize={"2rem"}
            color={colorMode === "light" ? "#153A5B" : "white"}
            fontWeight={"semibold"}
            my="1rem"
            w="100%"
            mx={"auto"}
          >
            Oh, it appears your cart is empty
          </Text>
        </Center>
        <Button
          width={[80, 80, 80, 80]}
          bg="#153A5B"
          border={"1px"}
          borderColor={colorMode === "light" ? "#153A5B" : "white"}
          color={colorMode === "light" ? "white" : "white"}
          _hover={{ bg: "white", color: "#153A5B", border: "1px" }}
        >
          SHOP NOW
        </Button>
      </Flex>
    </React.Fragment>
  );
};

export default CartTop;
