import { useRef, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  HStack,
  useToast,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  PinInput,
  PinInputField,
  Spinner,
} from "@chakra-ui/react";
import secureLocalStorage from "react-secure-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/router";
// import { withAdminMiddleware } from "@/Middleware/adminMiddlware";
const JoinOurTeam = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();
  const email = useRef("");
  const password = useRef("");
  const [pin, setpin] = useState(0);
  const [loading, setloading] = useState(false);
  // console.log(pin);

  const { user, active } = useSelector((state) => state.user);
  console.log(user, active);

  const handleForm = async (e) => {
    e.preventDefault();
    setloading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/verifyadmin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
          pin: pin,
        }),
      }
    );
    const data = await response.json();
    // console.log(data);
    if (data.success) {
      toast({
        title: "Successfully Login",

        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch(setUser(data.user));
      localStorage.setItem("token", data.token);
      Router.push("/haniyanasir/admin");
    } else {
      toast({
        title: data.message,

        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setloading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setloading(true);
      console.log(1);
      if (user.role != "admin" && !active) {
        setloading(false);
        localStorage.clear();
        Router.push("/");
      } else {
        Router.push("/haniyanasir/admin");
      }
    }
  }, []);

  return loading ? (
    <>
      <Spinner />{" "}
    </>
  ) : (
    <>
      <Flex
        justify={"center"}
        align={"center"}
        border={"1px"}
        width={"100%"}
        height={"100vh"}
        position={"relative"}
      >
        <Flex justify={"center"} my={"5rem"} align={"center"}>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Log In
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                __________________________________________________________________
              </Text>
            </Stack>

            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Input
                  ref={email}
                  placeholder="email"
                  type="email"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  required
                />
                <Input
                  required
                  ref={password}
                  placeholder="password"
                  bg={"gray.100"}
                  type="password"
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Text color={"#153A5B"}>Enter Security Pin</Text>
                <HStack>
                  <PinInput onChange={(e) => setpin((prev) => e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Stack>
              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, purple.400,blue.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
                onClick={handleForm}
                isLoading={loading}
                loadingText="please wait..."
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};

export default JoinOurTeam;
