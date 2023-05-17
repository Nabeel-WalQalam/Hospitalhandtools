import {
  Box,
  UnorderedList,
  ListItem,
  Button,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

import { Checkbox, Stack, useColorModeValue } from "@chakra-ui/react";

import {
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useToast, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
// import { EncryptStorage } from "encrypt-storage";

function Auth({ user }) {
  const dispatch = useDispatch();
  const [SignLoading, setSignLoading] = useState(false);
  const [loginLoading, setloginLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  // localStorage.getItem("chakra-ui-color-mode")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const Router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);

  const [loginFields, setloginFields] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const onSubmit = async (data) => {
    try {
      setSignLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );
      const data2 = await response.json();
      // enter you logic when the fetch is successful
      // console.log(data2);
      if (data2.success) {
        toast({
          title: "Successful",
          description: data2.msg,
          status: "success",
          position: "top-left",
          duration: 4000,
          isClosable: true,
        });
        var hangoutButton = document.getElementById("signIn");
        reset();
        setSignLoading(false);
        hangoutButton.click();
        Router.push("/Auth");
      } else {
        toast({
          title: "error",
          description: data2.msg,
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
        reset();
        setSignLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      // enter you logic when the fetch is successful
      // console.log(data);
      // setloginFields({});
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

  // const inputChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   // console.log(name, value);
  //   setsignupFields({ ...signupFields, [name]: value });
  // };

  const inputChangeHandler2 = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setloginFields({ ...loginFields, [name]: value });
  };
  // console.log("Fields", signupFields);

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    return () => {};
  }, []);

  return (
    <>
      <style jsx>{`
        h1 {
          font-weight: bold;
          margin: 0;
        }

        h2 {
          text-align: center;
        }

        p {
          font-size: 14px;
          font-weight: 100;
          line-height: 20px;
          letter-spacing: 0.5px;
          margin: 20px 0 30px;
        }

        span {
          font-size: 12px;
        }

        a {
          // color: #333;
          font-size: 14px;
          text-decoration: none;
          margin: 15px 0;
        }

        .main-btn {
          border-radius: 20px;
          border: 1px solid #153a5b;
          background-color: #153a5b;
          color: #ffffff;
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 80ms ease-in;
        }

        button:active {
          transform: scale(0.95);
        }
        .main-btn:hover {
          border-color: 2px solid #153a5b;
          background-color: white;
          color: #153a5b;
        }
        button:focus {
          outline: none;
        }

        button.ghost {
          background-color: transparent;
          border-color: #ffffff;
          color: white;
        }
        button.ghost:hover {
          background-color: white;
          color: #153a5b;
          border-color: #153a5b 1px solid;
        }

        form {
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 63px;
          height: 100%;
          text-align: center;
        }

        input {
          /* background-color: #eee; */
          border-radius: 0.3rem;
          border: 0.01rem solid rgb(204, 204, 204);
          padding: 12px 15px;
          margin: 8px 0;
          width: 100%;
        }

        .container {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
          position: relative;
          overflow: hidden;
          width: 900px;
          /* max-width: 100%; */
          min-height: 600px;
          max-height: 600px;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }

        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .container.right-panel-active .sign-in-container {
          transform: translateX(100%);
        }

        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: show 0.6s;
        }

        @keyframes show {
          0%,
          49.99% {
            opacity: 0;
            z-index: 1;
          }

          50%,
          100% {
            opacity: 1;
            z-index: 5;
          }
        }

        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }

        .container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .overlay {
          background: #153a5b;

          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0 0;
          color: #ffffff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .container.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .overlay-left {
          transform: translateX(-20%);
        }

        .container.right-panel-active .overlay-left {
          transform: translateX(0);
        }

        .overlay-right {
          right: 0;
          transform: translateX(0);
        }

        .container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }

        .social-container {
          margin: 20px 0;
        }

        .social-container a {
          border: 1px solid #dddddd;
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
        }

        .signintbtn {
          background-color: rgb(99, 93, 255);
          border: none;
        }

        .signintbtn:hover {
          background-color: #483dff;
        }
        .mian-2:hover {
          background-color: white;
          border: 1px solid #153a5b;
          color: #153a5b;
        }
        .inputs:focus {
          outline: 0px;
          border-color: #153a5b;
          box-shadow: rgb(0 0 0 / 8%) 0px 0.1rem 0.1rem inset,
            rgb(21, 58, 91 / 60%) 0px 0px 0.8rem;
        }
        .inputs:hover {
          border-color: rgb(21, 58, 91);
        }
      `}</style>

      <Flex
        display={["none", "none", "flex", "flex"]}
        h="90vh"
        py={"3rem"}
        align={"center"}
        justify="center"
        bg={colorMode === "light" ? "facebook.100" : "facebook.200"}
        // minH={"700px"}
        // border="1px"
      >
        <div className="container" id="container">
          <div
            // display={"flex"}
            // flexDirection="column"
            className="form-container sign-up-container"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Heading
                color={colorMode === "light" ? "#153A5B" : "#153A5B"}
                size={"lg"}
              >
                Create Account
              </Heading>

              <FormControl isRequired>
                <FormLabel
                  color={colorMode === "light" ? "#153A5B" : "#153A5B"}
                >
                  Display-Name
                </FormLabel>

                <Input
                  bg={colorMode === "light" ? "white" : "#153A5B"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  dropShadow="outline"
                  name="displayName"
                  _hover={{
                    shadow: "base",
                    border: "1px",
                    borderColor: "#153A5B",
                  }}
                  as={"input"}
                  shadow="base"
                  type="text"
                  placeholder="Display Name"
                  {...register("displayName", {
                    required: true,
                    maxLength: 30,
                  })}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "gray",
                        }
                      : {
                          color: "lightgray",
                        }
                  }
                />
                <Text as={"span"} color="red.500">
                  {errors.displayName?.type === "required" && (
                    <p role="alert">displayName is required</p>
                  )}
                  {errors.displayName?.type === "maxLength" && (
                    <p role="alert">length must bt Between 5 - 30</p>
                  )}
                </Text>
              </FormControl>

              <FormControl my="0.3rem">
                <FormLabel
                  color={colorMode === "light" ? "#153A5B" : "#153A5B"}
                >
                  Address
                </FormLabel>

                <Input
                  bg={colorMode === "light" ? "white" : "#153A5B"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  dropShadow="outline"
                  name="address"
                  _hover={{
                    shadow: "base",
                    border: "1px",
                    borderColor: "#153A5B",
                  }}
                  as={"input"}
                  shadow="base"
                  type="text"
                  placeholder="Address"
                  {...register("address", {
                    maxLength: 50,
                  })}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "gray",
                        }
                      : {
                          color: "lightgray",
                        }
                  }
                />
                <Text as={"span"} color="red.500">
                  {errors.address?.type === "maxLength" && (
                    <p role="alert"> length must be 40 - 60</p>
                  )}
                </Text>
              </FormControl>
              <FormControl my="0.3rem">
                <FormLabel
                  color={colorMode === "light" ? "#153A5B" : "#153A5B"}
                >
                  Phone-Number
                </FormLabel>

                <Input
                  bg={colorMode === "light" ? "white" : "#153A5B"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  dropShadow="outline"
                  name="Phone-Number"
                  _hover={{
                    shadow: "base",
                    border: "1px",
                    borderColor: "#153A5B",
                  }}
                  as={"input"}
                  shadow="base"
                  type="number"
                  placeholder="Phone-Number"
                  {...register("number", {
                    maxLength: 13,
                  })}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "gray",
                        }
                      : {
                          color: "lightgray",
                        }
                  }
                />
                <Text as={"span"} color="red.500">
                  {errors.number?.type === "maxLength" && (
                    <p role="alert"> length must be 10 - 12</p>
                  )}
                </Text>
              </FormControl>
              <FormControl isRequired>
                <FormLabel
                  color={colorMode === "light" ? "#153A5B" : "#153A5B"}
                >
                  Email
                </FormLabel>

                <Input
                  bg={colorMode === "light" ? "white" : "#153A5B"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  dropShadow="outline"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  name="email"
                  _hover={{
                    shadow: "base",
                    border: "1px",
                    borderColor: "#153A5B",
                  }}
                  as={"input"}
                  shadow="base"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "gray",
                        }
                      : {
                          color: "lightgray",
                        }
                  }
                />
                <Text as={"span"} color="red.500">
                  {errors.email && (
                    <span>
                      This field is required and must be a valid email address.
                    </span>
                  )}
                </Text>
              </FormControl>
              <FormControl my="0.3rem" isRequired>
                <FormLabel
                  color={colorMode === "light" ? "#153A5B" : "#153A5B"}
                >
                  Password
                </FormLabel>

                <Input
                  bg={colorMode === "light" ? "white" : "#153A5B"}
                  color={colorMode === "light" ? "#153A5B" : "white"}
                  dropShadow="outline"
                  name="password"
                  _hover={{
                    shadow: "base",
                    border: "1px",
                    borderColor: "#153A5B",
                  }}
                  as={"input"}
                  shadow="base"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i,
                  })}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "gray",
                        }
                      : {
                          color: "lightgray",
                        }
                  }
                />
                {/* <Text as={"span"} color="red.500">
                  {errors.password && (
                    <span>
                      must be (at least one digit, one lowercase letter, one
                      uppercase letter, one special character, and a minimum
                      length of 8 characters).
                    </span>
                  )}
                </Text> */}
              </FormControl>
              {/* <button className="signintbtn">Sign Up</button> */}
              <Button
                isLoading={SignLoading}
                loadingText="Please Wait"
                mt="20px"
                px="45px"
                py="12px"
                bg={"#153a5b"}
                color="white"
                w="140px"
                className="mian-2"
                type="submit"
                _hover={{
                  bg: "white",
                  color: "#153A5B",
                  border: "1px solid #153A5B",
                }}
              >
                Sign Up
              </Button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={loginHandler}>
              <Heading color="#153A5B" size={"lg"}>
                Sign in
              </Heading>
              <div className="social-container">
                {/* <Button
                  bg={"#153A5B"}
                  color="white"
                  _hover={{
                    bg: "white",
                    color: "#153A5B",
                    border: "1px solid #153A5B",
                  }}
                  // onClick={signInWithGoogle}
                  // leftIcon={<FaGoogle fill="White" />}
                >
                  Continue With Google
                </Button> */}
              </div>
              {/* <span>or use your account</span> */}

              <Input
                bg={colorMode === "light" ? "white" : "#153A5B"}
                color={colorMode === "light" ? "#153A5B" : "white"}
                className="inputs"
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={inputChangeHandler2}
                // value={email2}
                _placeholder={
                  colorMode == "light"
                    ? {
                        color: "gray",
                      }
                    : {
                        color: "lightgray",
                      }
                }
              />

              <Input
                my={"1rem"}
                className="inputs"
                type="password"
                placeholder="Password"
                required
                name="password"
                onChange={inputChangeHandler2}
                // value={password2}
                bg={colorMode === "light" ? "white" : "#153A5B"}
                color={colorMode === "light" ? "#153A5B" : "white"}
                _placeholder={
                  colorMode == "light"
                    ? {
                        color: "gray",
                      }
                    : {
                        color: "lightgray",
                      }
                }
              />
              <Link href={"/forgot"}>
                <Text color={"black"} _hover={{ textDecoration: "underline" }}>
                  Forgot your password?
                </Text>
              </Link>
              {/* <button className="signintbtn">Sign In</button> */}
              <Button
                isLoading={loginLoading}
                loadingText="please wait"
                className="main-btn"
                px="45px"
                py="12px"
                my={"1rem"}
                // colorScheme={"guru"}
                w="140px"
                type="submit"
                bg={"#153A5B"}
                color="white"
                _hover={{
                  bg: "white",
                  color: "#153A5B",
                  border: "1px solid #153A5B",
                }}
              >
                {" "}
                Sign In
              </Button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div
                className="overlay-panel overlay-left"
                style={{ backgroundColor: "#153A5B" }}
              >
                <Heading>HospitalHandTools</Heading>

                {/* <button className="ghost" id="signIn">Sign In</button> */}
                <Button
                  my={"1rem"}
                  variant={"none"}
                  color="white"
                  borderColor={"white"}
                  border="1px"
                  className="ghost"
                  id="signIn"
                  px="45px"
                  py="12px"
                  w="140px"
                  _hover={{
                    bg: "white",
                    color: "#153A5B",
                    border: "1px solid #153A5B",
                  }}
                >
                  {" "}
                  Sign In
                </Button>
              </div>
              <div
                className="overlay-panel overlay-right"
                style={{ backgroundColor: "#153A5B" }}
              >
                <Heading mb={"1rem"}>New Customer?</Heading>
                <Text color={colorMode == "light" ? "white" : "white"}>
                  Create an account with us and you'll be able to:
                </Text>
                <Flex
                  direction={"column"}
                  // border="1px"
                  width={"80%"}
                  justify="left"
                  align={"self-start"}
                  color={colorMode == "light" ? "white" : "white"}
                >
                  <li color={colorMode == "light" ? "#153A5B" : "white"}>
                    Check out faster
                  </li>
                  <li color={colorMode == "light" ? "#153A5B" : "white"}>
                    Access your order history
                  </li>
                  <li color={colorMode == "light" ? "#153A5B" : "white"}>
                    Track new orders
                  </li>
                </Flex>
                {/* <button style={{backgroundColor: "rgb(99, 93, 255)" }} className="ghost" id="signUp">Sign Up</button> */}
                <Button
                  mt={"5rem"}
                  variant={"none"}
                  color="white"
                  borderColor={"white"}
                  border="1px"
                  className="ghost"
                  id="signUp"
                  px="45px"
                  py="12px"
                  w="140px"
                  _hover={{
                    bg: "white",
                    color: "#153A5B",
                    border: "1px solid #153A5B",
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Flex>

      <Flex
        display={["flex", "flex", "none", "none"]}
        // h="90vh"
        // py={"3rem"}
        // align={"center"}
        justify="center"
        bg={"facebook.100"}
        // minH={"700px"}
        // border="1px"
      >
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          // bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading
                fontSize={"4xl"}
                color={colorMode === "light" ? "#153A5B" : "#153A5B"}
              >
                Sign in to your account
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool{" "}
                <span color={"blue.400"}>features ✌️</span>
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              // p={8}
            >
              <Stack py="2rem">
                <form onSubmit={loginHandler}>
                  <Input
                    my={"1rem"}
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    color={colorMode === "light" ? "#153A5B" : "white"}
                    className="inputs"
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    onChange={inputChangeHandler2}
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
                  <ListItem
                    color={colorMode == "light" ? "#153A5B" : "#153A5B"}
                  >
                    Check out faster
                  </ListItem>
                  <ListItem
                    color={colorMode == "light" ? "#153A5B" : "#153A5B"}
                  >
                    Access your order history
                  </ListItem>
                  <ListItem
                    color={colorMode == "light" ? "#153A5B" : "#153A5B"}
                  >
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
    </>
  );
}

export default Auth;
