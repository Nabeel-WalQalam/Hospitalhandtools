import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { clearCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

export const CartBottom = ({ subTotal }) => {
  const { onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  return (
    <Flex
      justify="flex-end"
      direction={["column", "column", "column", "column"]}
    >
      <Flex
        direction={"column"}
        mb={"2rem"}
        justify={"end"}
        // width={"90%"}
      >
        <Divider
          border={"1px"}
          borderColor="gray.200"
          width={"100%"}
          marginInline="auto"
        />
        <Flex
          mr={["0px", "3rem"]}
          mt={"1rem"}
          justify={"space-between"}
          // align={["none", "center"]}
          direction={["column", "row"]}
          gap={["1rem", "0px"]}
        >
          <Flex direction={"column"} ml={["0px", "2rem"]}>
            <Box
              color={colorMode === "light" ? "#153A5B" : "white"}
              fontWeight={"semibold"}
              fontSize={"1.5rem"}
            >
              Subtotal :
            </Box>
            <Text mr={["0px", "2rem"]} textDecor={"underline"}>
              Shipping and taxes calculated at checkout*
            </Text>
          </Flex>

          <Box
            color={colorMode === "light" ? "#153A5B" : "white"}
            fontWeight={"semibold"}
            fontSize={"1.5rem"}
            mx={"0.5rem"}
          >
            $ {(subTotal || 0).toFixed(2)}
          </Box>
        </Flex>
      </Flex>
      <Flex
        gap="1rem"
        justify={"center"}
        // align={"center"}
        direction={["column", "row"]}
      >
        <Button
          width={[80, 80, 80, 60]}
          variant="outline"
          color={"#153A5B"}
          bg="white"
          borderColor="#153A5B"
          _hover={{
            shadow: "base",
            textDecor: "underline",
          }}
          onClick={() => dispatch(clearCart(null))}
          // mr="1.5rem"
        >
          Clear Cart
        </Button>
        <Link href={"/checkout"}>
          <Button
            onClick={() => onClose()}
            width={[80, 80, 80, 60]}
            variant="outline"
            color={"white"}
            bg="#153A5B"
            // mr="1rem"
            _hover={{
              shadow: "base",
              textDecor: "underline",
            }}
          >
            Check Out Now
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
