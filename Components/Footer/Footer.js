import { ReactNode, useState } from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Button,
  FormControl,
  Heading,
  Flex,
  Input,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { MdCheckCircleOutline } from "react-icons/md";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("success" > "initial");
  const [error, setError] = useState(false);
  return (
    <Box bg={"#153A5B"} color={"whiteAlpha.800"}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"#"}>About Us</Link>
            <Link href={"#"}>Blog</Link>
            <Link href={"#"}>Careers</Link>
            <Link href={"#"}>Contact Us</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Safety Center</Link>
            <Link href={"#"}>Community Guidelines</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Link href={"#"}>Cookies Policy</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Law Enforcement</Link>
          </Stack>

          <Stack>
            <Flex
              // border={"1px"}
              // minH={"100vh"}
              align={"center"}
              justify={"center"}

              // bg={useColorModeValue("gray.50", "gray.800")}
            >
              <Container
                maxW={"xl"}
                // bg={useColorModeValue("white", "whiteAlpha.100")}
                // boxShadow={"xl"}
                rounded={"lg"}
                p={4}
                direction={"column"}
              >
                <Heading
                  as={"h4"}
                  fontSize={{ base: "lg", sm: "1xl" }}
                  color={"gray.300"}
                  textAlign={"center"}
                  mb={5}
                >
                  Subscribe to our Newsletter
                </Heading>
                <Stack
                  direction={{ base: "column", md: "column" }}
                  as={"form"}
                  spacing={"12px"}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setError(false);
                    setState("submitting");

                    // remove this code and implement your submit logic right here
                    setTimeout(() => {
                      if (email === "fail@example.com") {
                        setError(true);
                        setState("initial");
                        return;
                      }

                      setState("success");
                    }, 1000);
                  }}
                >
                  <FormControl>
                    <Input
                      variant={"solid"}
                      borderWidth={1}
                      borderRadius={"none"}
                      color={"gray.800"}
                      _placeholder={{
                        color: "gray.400",
                      }}
                      borderColor={useColorModeValue("gray.300", "gray.700")}
                      id={"email"}
                      type={"email"}
                      required
                      placeholder={"Your Email"}
                      aria-label={"Your Email"}
                      bg={""}
                      // value={email}
                      // disabled={state !== "initial"}
                      // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      //   setEmail(e.target.value)
                      // }
                    />
                  </FormControl>
                  <FormControl w={{ base: "100%", md: "100%" }}>
                    <Button
                      colorScheme={state === "success" ? "green" : "facebook"}
                      isLoading={state === "submitting"}
                      w="100%"
                      borderRadius={"none"}
                      type={state === "success" ? "button" : "submit"}
                    >
                      {state === "success" ? (
                        <MdCheckCircleOutline />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </FormControl>
                </Stack>
                <Text
                  mt={2}
                  textAlign={"center"}
                  color={error ? "red.500" : "gray.200"}
                >
                  {error
                    ? "Oh no an error occured! 😢 Please try again later."
                    : "You won't receive any spam! ✌️"}
                </Text>
              </Container>
            </Flex>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "purple.300")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2022 Hospital Hand Tools. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
