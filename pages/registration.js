import {
  Flex,
  Button,
  Text,
  Center,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast, useColorMode } from "@chakra-ui/react";
import secureLocalStorage from "react-secure-storage";
export default function Registration() {
  const Router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  // localStorage.getItem("chakra-ui-color-mode")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    const data2 = await response.json();
    // enter you logic when the fetch is successful
    console.log(data2);
    if (data2.success) {
      toast({
        title: "Successful",
        description: data2.msg,
        status: "success",
        position: "top-left",
        duration: 4000,
        isClosable: true,
      });
      //   var hangoutButton = document.getElementById("signIn");

      //   hangoutButton.click();

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
    }
  };

  useEffect(() => {
    if (secureLocalStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);

  return (
    <>
      <Box bg="#153A5B" w={"100%"}>
        <Center>
          <Heading size={"lg"} color="white">
            New Account
          </Heading>
        </Center>
      </Box>
      <FormControl as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Flex
          width="80%"
          mx={"auto"}
          justify={"center"}
          align="center"
          direction={"column"}
          py="2rem"
        >
          <FormControl
            // justifyContent="center"
            // alignItems={"center"}
            isRequired
            // my="0.3rem"
          >
            <FormLabel color={colorMode == "light" ? "black" : "black"}>
              Display-Name
            </FormLabel>

            <Input
              bg={"white"}
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
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i,
              })}
            />
            <Text as={"span"} color="red.500">
              {errors.password && (
                <span>
                  must be (at least one digit, one lowercase letter, one
                  uppercase letter, one special character, and a minimum length
                  of 8 characters).
                </span>
              )}
            </Text>
          </FormControl>

          <FormControl my="0.3rem">
            <FormLabel color={colorMode == "light" ? "black" : "black"}>
              Address
            </FormLabel>

            <Input
              bg={"white"}
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
            />
            <Text as={"span"} color="red.500">
              {errors.address?.type === "maxLength" && (
                <p role="alert"> length must be 40 - 60</p>
              )}
            </Text>
          </FormControl>
          <FormControl my="0.3rem">
            <FormLabel color={colorMode == "light" ? "black" : "black"}>
              Phone-Number
            </FormLabel>

            <Input
              bg={"white"}
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
            />
            <Text as={"span"} color="red.500">
              {errors.number?.type === "maxLength" && (
                <p role="alert"> length must be 10 - 12</p>
              )}
            </Text>
          </FormControl>
          <FormControl my="0.3rem" isRequired>
            <FormLabel color={colorMode == "light" ? "black" : "black"}>
              Email
            </FormLabel>

            <Input
              bg={"white"}
              dropShadow="outline"
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
                maxLength: 40,
              })}
            />
            <Text as={"span"} color="red.500">
              {errors.email?.type === "required" && (
                <p role="alert">email is required</p>
              )}
              {errors.displayName?.type === "maxLength" && (
                <p role="alert">length must bt Between 5 - 30</p>
              )}
            </Text>
          </FormControl>
          <FormControl my="0.3rem" isRequired>
            <FormLabel color={colorMode == "light" ? "black" : "black"}>
              Password
            </FormLabel>

            <Input
              bg={"white"}
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
                minLength: 7,
              })}
            />
            <Text as={"span"} color="red.500">
              {errors.password?.type === "required" && (
                <p role="alert">password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p role="alert">minimum length must be 8</p>
              )}
            </Text>
          </FormControl>
          {/* <button className="signintbtn">Sign Up</button> */}
          <Button
            mt="20px"
            px="45px"
            py="12px"
            bg={"#153a5b"}
            w={"100%"}
            borderRadius={"none"}
            color="white"
            // w="140px"
            // className="mian-2"
            type="submit"
            // _hover={{
            //   bg: "white",
            //   color: "#153A5B",
            //   border: "1px solid #153A5B",
            // }}
          >
            Sign Up
          </Button>
        </Flex>
      </FormControl>
    </>
  );
}
