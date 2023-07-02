import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

export const MobilePage = () => {
  const [loginFields, setloginFields] = useState({
    email: "",
    password: "",
  });

  const { colorMode } = useColorMode();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setloginLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginFields }),
        }
      );
      const data = await response.json();

      if (data.success === true) {
        toast({
          title: "Login Success",
          description: "Welcome To Hospital-Hand-Tools",
          status: "success",
          position: "bottom",
          duration: 2000,
          isClosable: true,
        });
        dispatch(setUser(data.user));
        localStorage.setItem("token", data.token);
        setloginLoading(false);
        Router.push("/");
      } else {
        toast({
          description: data.message,
          status: "error",
          position: "bottom",
          duration: 5000,
          isClosable: true,
        });
        setloginLoading(false);
        // setloginFields({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler2 = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setloginFields({ ...loginFields, [name]: value });
  };

  return (
    <Flex justify="center" p={1} my={"1rem"}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        // bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"}>
          <Stack align={"center"}>
            <Heading
              fontSize={"3xl"}
              color={colorMode === "light" ? "#153A5B" : "#153A5B"}
            >
              Sign in to your account
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            // p={8}
          >
            <Stack py="2rem" width={"100%"}>
              <form
                style={{
                  padding: "10px",
                }}
                onSubmit={loginHandler}
              >
                <Input
                  border={"1px"}
                  my={"1rem"}
                  bg={colorMode === "light" ? "white" : "#153A5B"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  className="inputs"
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  onChange={(e) => inputChangeHandler2(e)}
                  // value={email2}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                />

                <Input
                  bg={colorMode === "light" ? "white" : "#153A5B"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  className="inputs"
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  onChange={inputChangeHandler2}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  // value={password2}
                />
                <Stack spacing={3}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"center"}
                  >
                    <Link
                      href={"/forgot"}
                      color={colorMode === "light" ? "#153A5B" : "black"}
                    >
                      <Text
                        color={colorMode == "light" ? "#153A5B" : "#153A5B"}
                      >
                        Forgot password?
                      </Text>
                    </Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"#153A5B"}
                    color="white"
                    _hover={{
                      bg: "white",
                      color: "#153A5B",
                      border: "1px solid #153A5B",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Flex
            bg={"white"}
            p={"1rem"}
            border={"1px"}
            borderColor="gray.200"
            direction="column"
          >
            <Box>
              <Text fontWeight={"bold"} color={"#153A5B"}>
                New Customer?
              </Text>
            </Box>
            <Box my="1rem">
              <Text color={colorMode == "light" ? "#153A5B" : "#153A5B"}>
                Create an account with us and you'll be able to:
              </Text>
              <UnorderedList>
                <ListItem color={colorMode == "light" ? "#153A5B" : "#153A5B"}>
                  Check out faster
                </ListItem>
                <ListItem color={colorMode == "light" ? "#153A5B" : "#153A5B"}>
                  Access your order history
                </ListItem>
                <ListItem color={colorMode == "light" ? "#153A5B" : "#153A5B"}>
                  Track new orders
                </ListItem>
              </UnorderedList>
            </Box>
            <Box>
              <Link href={"/registration"}>
                <Button
                  type="submit"
                  bg={"#153A5B"}
                  color="white"
                  _hover={{
                    bg: "white",
                    color: "#153A5B",
                    border: "1px solid #153A5B",
                  }}
                >
                  Create Account
                </Button>
              </Link>
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};
