import react, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useAuth from "@/useAuth";
import secureLocalStorage from "react-secure-storage";
export default function Index() {
  useAuth();
  const Router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const toast = useToast();
  const handleinput = () => {};
  const [forgotLoading, setforgotLoading] = useState(false);

  useEffect(() => {
    if (secureLocalStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);
  // console.log(Router.query.token);

  const handlesendemail = async (e) => {
    e.preventDefault();

    try {
      setforgotLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            sendMail: true,
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      // console.log(data);
      // setloginFields({});
      if (data.success == true) {
        toast({
          title: "Email Successfully Send",
          description: "Check your Email for confirmation Link !",
          status: "success",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
        // setforgotLoading(false);
      } else if (data.success == false) {
        toast({
          title: "Error Occured",
          description: "Invalid Email Entered",
          status: "error",
          position: "top-left",
          duration: 2000,
          isClosable: true,
        });
        setforgotLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setpassword(e.target.value);
    }
    if (e.target.name == "cpassword") {
      setcpassword(e.target.value);
    }
  };

  const handleresetpassword = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/forgotPassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: password,
              token: Router.query.token,
              sendMail: false,
            }),
          }
        );
        const data = await response.json();
        // enter you logic when the fetch is successful
        // console.log(data);
        // setloginFields({});
        if (data.success) {
          toast({
            title: "Password has been changes",
            description: "You can login Now !",
            status: "success",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
          setforgotLoading(true);
          Router.push("/Auth");
        } else if (data.failed) {
          toast({
            title: "invalid Password",
            description: "Invalid Credentials",
            status: "error",
            position: "top-left",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    return;
  };

  return (
    <>
      <Flex minH={"80vh"} align={"center"} justify={"center"} bg="facebook.100">
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot your password?
          </Heading>
          {Router.query.token && (
            <Box>
              <form onSubmit={handleresetpassword}>
                <Text
                  fontSize={{ base: "sm", sm: "md" }}
                  color={useColorModeValue("gray.800", "gray.400")}
                >
                  Update your Password
                </Text>
                <FormControl>
                  <Input
                    value={password}
                    onChange={handleChange}
                    placeholder="password"
                    _placeholder={{ color: "gray.500" }}
                    type="password"
                    name="password"
                  />
                  <Input
                    value={cpassword}
                    onChange={handleChange}
                    my={"0.5rem"}
                    placeholder="confirm password"
                    _placeholder={{ color: "gray.500" }}
                    type="password"
                    name="cpassword"
                  />
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    confirm
                  </Button>
                </Stack>
                {password != cpassword && (
                  <Text color={"red.400"}>Password dont match</Text>
                )}
              </form>
            </Box>
          )}
          {!Router.query.token && (
            <>
              <form onSubmit={handlesendemail}>
                <Text
                  fontSize={{ base: "sm", sm: "md" }}
                  color={useColorModeValue("gray.800", "gray.400")}
                >
                  You&apos;ll get an email with a reset link
                </Text>
                <FormControl id="email" my={"1rem"}>
                  <Input
                    onChange={handleChange}
                    placeholder="your-email@example.com"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    name="email"
                  />
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    bg={"#153A5B"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    isLoading={forgotLoading}
                    loadingText="Please Wait"
                  >
                    Request Reset
                  </Button>
                </Stack>
              </form>
            </>
          )}
        </Stack>
      </Flex>
    </>
  );
}
