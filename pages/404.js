// 404.js
import Link from "next/link";
import { Center, Heading, Box, Text, Button , Flex} from "@chakra-ui/react";
import Image from "next/image";

export default function FourOhFour() {
  return (
    <>
      <Flex
        // display={"flex"}
justify={'center'}
align={'center'}
        flexDirection="column"
        textAlign="center"
        // py={10}
        // px={6}
        height="90vh"
      >
        <Image src={'/assets/404.jpg'} alt="not-found" width={450} height={100} />

        {/* <Heading
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
        </Text> */}
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
            width={'100%'}
            fontSize={'1.2rem'}
          >
            Go Home
          </Button>
        </Link>
      </Flex>
    </>
  );
}
