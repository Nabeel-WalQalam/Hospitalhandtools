// 404.js
import Link from "next/link";
import { Center, Heading, Box, Text, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";

export default function FourOhFour() {
  return (
    <>
      <Flex
        my="2rem"
        // display={"flex"}
        justify={"center"}
        align={"center"}
        flexDirection="column"
        textAlign="center"
        // py={10}
        // px={6}
        // height="90vh"
      >
        <Image
          src={"/assets/404.jpg"}
          alt="not-found"
          width={450}
          height={100}
        />

        <Box width="85%">
          <Link href={"/"}>
            <Button
              _hover={{
                shadow: "2xl",
              }}
              bg={"#153A5B"}
              color="white"
              variant="solid"
              width={"100%"}
              fontSize={"1.2rem"}
            >
              HOME
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
}
