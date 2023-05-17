import {
  SimpleGrid,
  Box,
  Center,
  Heading,
  Input,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast, useColorMode } from "@chakra-ui/react";

import { useRouter } from "next/router";

import secureLocalStorage from "react-secure-storage";

export default function Index() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const Router = useRouter();
  const [userUsername, setuserUsername] = useState("");
  const [user, setuser] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit2 = async (data) => {
    let rsult;
    // console.log(data.password2, data.password3);
    if (data.password2 === data.password3) {
      // console.log(data);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: secureLocalStorage.getItem("token"),
            password1: data.password1,
            password2: data.password2,
            password3: data.password3,
          }),
        }
      );
      rsult = await response.json();
    } else {
      rsult = { success: false };
    }
    if (rsult.success) {
      toast({
        title: "Password",
        description: "Successfully Updated",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Password",
        description: "Invalid Password",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    // console.log(data);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: secureLocalStorage.getItem("token"),
          address: data.Address,
          displayName: data.UserName,
          city: data.City,
          pincode: data.PostalCode,
          country: data.Country,
          aboutme: data.Aboutme,
          phonenumber: data.Mobilenumber,
          state: data.State,
        }),
      }
    );
    const rsult = await response.json();
    if (rsult.success) {
      toast({
        title: "Fields Update",
        description: "Successfully Updated",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
    // console.log(rsult.user);
  };
  //   console.log(errors);

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: secureLocalStorage.getItem("token"),
        }),
      }
    );
    const rsult = await response.json();
    // console.log(rsult.user);
    setValue("UserName", rsult.user.displayName);
    setValue("Address", rsult.user.address);
    setValue("City", rsult.user.city);
    setValue("PostalCode", rsult.user.pincode);
    setValue("Country", rsult.user.country);
    setValue("Mobilenumber", rsult.user.phonenumber);
    setValue("Aboutme", rsult.user.aboutme);
    setValue("State", rsult.user.state);

    // setuser("rsult.user.displayName");
  };

  useEffect(() => {
    const getEmail = async () => {
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: secureLocalStorage.getItem("token"),
        }),
      };

      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getEmail`,
        settings
      );
      const data = await fetchResponse.json();
      if (data.success == true) {
        setuserUsername(data.email);
      } else {
        toast({
          title: "error",
          description: data.error,
          status: "error",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        });
      }
      // console.log("data", data);
    };

    if (secureLocalStorage.getItem("token")) {
      getEmail();
      fetchUser();
    } else {
      Router.push("/");
    }
  }, []);

  // effect runs when user state is updated
  // useEffect(() => {
  //   if (user) {
  //     setuser([{ UserName: "xyz123" }]);
  //   }
  // }, [user]);

  return (
    <>
      <Box bg={"#153A5B"} mt={"1rem"}>
        <Center>
          <Heading color={"white"}>Update Account</Heading>
        </Center>
      </Box>
      <Box
        bg={"gray.100"}
        borderRadius="8px"
        w={["100%", "80%", "70%", "60%"]}
        marginInline={"auto"}
        p="2rem"
        boxShadow={"inner"}
        my="2rem"
      >
        <Flex direction={"column"}>
          <Box my={"1rem"} bg="#153A5B">
            <Text p={"1rem"} color={colorMode == "light" ? "white" : "white"}>
              User Information
            </Text>
          </Box>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid columns={2} spacingX="50px" spacingY="20px">
                <Box>
                  <Text
                    my="0.3rem"
                    color={colorMode == "light" ? "black" : "#153A5B"}
                  >
                    Username
                  </Text>
                  <Input
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    dropShadow="outline"
                    name="UserName"
                    _hover={{
                      shadow: "base",
                      border: "1px",
                      borderColor: "#153A5B",
                    }}
                    as={"input"}
                    shadow="base"
                    type="text"
                    placeholder="UserName"
                    {...register("UserName", { required: true, maxLength: 40 })}
                  />
                  <Text as={"span"} color="red.500">
                    {errors.UserName?.type === "required" && (
                      <p role="alert">User-Name is required</p>
                    )}
                    {errors.UserName?.type === "maxLength" && (
                      <p role="alert">length must bt Between 5 - 50</p>
                    )}
                  </Text>
                </Box>
                <Box>
                  <Text
                    my="0.3rem"
                    color={colorMode == "light" ? "black" : "#153A5B"}
                  >
                    Email
                  </Text>
                  <Input
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    border="#153A5B"
                    dropShadow="outline"
                    type="email"
                    color={"black"}
                    value={userUsername}
                    placeholder="Email"
                    disabled={true}
                    // {...register("Email")}
                  />
                </Box>
                <Box>
                  <Text
                    my="0.3rem"
                    color={colorMode == "light" ? "black" : "#153A5B"}
                  >
                    Phone-Number
                  </Text>
                  <Input
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    dropShadow="outline"
                    _hover={{
                      shadow: "base",
                      border: "1px",
                      borderColor: "#153A5B",
                    }}
                    as={"input"}
                    type="tel"
                    placeholder="Mobile number"
                    {...register("Mobilenumber", {
                      required: true,
                      minLength: 6,
                      maxLength: 15,
                    })}
                  />
                  <Text as={"span"} color="red.500">
                    {errors["Mobilenumber"]?.type === "required" && (
                      <p role="alert">Phone-Number is required</p>
                    )}
                    {errors["Mobilenumber"]?.type === "maxLength" && (
                      <p role="alert">Phone Number is inValid</p>
                    )}
                  </Text>
                </Box>
              </SimpleGrid>

              <Divider my={"1rem"} />
              <Box my={"1rem"} bg="#153A5B">
                <Text p={"1rem"} color={"white"}>
                  Contact Information
                </Text>
              </Box>

              <Box>
                <Text
                  my="0.3rem"
                  color={colorMode == "light" ? "black" : "#153A5B"}
                >
                  Address
                </Text>
                <Input
                  bg={colorMode === "light" ? "white" : "#153A5B"}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  dropShadow="outline"
                  _hover={{
                    shadow: "base",
                    border: "1px",
                    borderColor: "#153A5B",
                  }}
                  as={"input"}
                  type="text"
                  placeholder="Address"
                  {...register("Address", {
                    required: true,
                    minLength: 6,
                    maxLength: 55,
                  })}
                />
                <Text as={"span"} color="red.500">
                  {errors["Address"]?.type === "required" && (
                    <p role="alert">Address is required</p>
                  )}
                  {errors["Address"]?.type === "maxLength" && (
                    <p role="alert">Address is inValid</p>
                  )}
                </Text>
              </Box>
              <Flex justify={"space-around"} wrap="wrap" my="1rem">
                <Box>
                  <Text
                    my="0.3rem"
                    color={colorMode == "light" ? "black" : "#153A5B"}
                  >
                    City
                  </Text>
                  <Input
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    dropShadow="outline"
                    _hover={{
                      shadow: "base",
                      border: "1px",
                      borderColor: "#153A5B",
                    }}
                    as={"input"}
                    shadow="base"
                    type="text"
                    placeholder="City"
                    {...register("City", { required: true, maxLength: 30 })}
                  />
                  <Text as={"span"} color="red.500">
                    {errors.City?.type === "required" && (
                      <p role="alert">City is required</p>
                    )}
                  </Text>
                </Box>
                <Box>
                  <Text
                    my="0.3rem"
                    color={colorMode == "light" ? "black" : "#153A5B"}
                  >
                    Country
                  </Text>
                  <Input
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    dropShadow="outline"
                    _hover={{
                      shadow: "base",
                      border: "1px",
                      borderColor: "#153A5B",
                    }}
                    as={"input"}
                    shadow="base"
                    type="text"
                    placeholder="Country"
                    {...register("Country", { required: true, maxLength: 40 })}
                  />
                  <Text as={"span"} color="red.500">
                    {errors.UserName?.type === "required" && (
                      <p role="alert">Country is required</p>
                    )}
                  </Text>
                </Box>
                <Box>
                  <Text
                    my="0.3rem"
                    color={colorMode == "light" ? "black" : "#153A5B"}
                  >
                    State
                  </Text>
                  <Input
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    dropShadow="outline"
                    _hover={{
                      shadow: "base",
                      border: "1px",
                      borderColor: "#153A5B",
                    }}
                    as={"input"}
                    shadow="base"
                    type="text"
                    name="State"
                    placeholder="State"
                    {...register("State", { required: true, maxLength: 30 })}
                  />
                  <Text as={"span"} color="red.500">
                    {errors.State?.type === "required" && (
                      <p role="alert">State is required</p>
                    )}
                  </Text>
                </Box>
                <Box>
                  <Text
                    my="0.3rem"
                    color={colorMode == "light" ? "black" : "#153A5B"}
                  >
                    Post Code
                  </Text>
                  <Input
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    dropShadow="outline"
                    _hover={{
                      shadow: "base",
                      border: "1px",
                      borderColor: "#153A5B",
                    }}
                    as={"input"}
                    shadow="base"
                    type="tel"
                    placeholder="Post-Code"
                    {...register("PostalCode", {
                      required: true,
                      maxLength: 7,
                    })}
                  />
                  <Text as={"span"} color="red.500">
                    {errors.PostalCode?.type === "required" && (
                      <p role="alert">Post Code is required</p>
                    )}
                    {errors.PostalCode?.type === "maxLength" && (
                      <p role="alert">Post Code length must 6</p>
                    )}
                  </Text>
                </Box>
              </Flex>
              <Divider my={"1rem"} />
              <Box my={"1rem"} bg="#153A5B">
                <Text p={"1rem"} color={"white"}>
                  About Information
                </Text>
              </Box>
              <Box>
                <Text
                  my="0.3rem"
                  color={colorMode == "light" ? "black" : "#153A5B"}
                >
                  About me
                </Text>
                <Input
                  bg={colorMode === "light" ? "white" : "#153A5B"}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  dropShadow="outline"
                  _hover={{
                    shadow: "base",
                    border: "1px",
                    borderColor: "#153A5B",
                  }}
                  as={"textarea"}
                  shadow="base"
                  type="text"
                  placeholder="optional"
                  height={"100px"}
                  {...register("Aboutme", {
                    maxLength: 50,
                  })}
                />
                <Text as={"span"} color="red.500">
                  {errors["Aboutme"]?.type === "maxLength" && (
                    <p role="alert">
                      description length must be less than 50 character
                    </p>
                  )}
                </Text>
              </Box>

              <Box my={"1.5rem"}>
                <Input
                  as={"input"}
                  bg={colorMode === "light" ? "#153A5B" : "#153A5B"}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  color="white"
                  // border={"1px"}
                  cursor={"pointer"}
                  _hover={{
                    bg: "white",
                    color: "#153A5B",
                    border: "1px",
                    borderColor: "#153A5B",
                  }}
                  type="submit"
                />
              </Box>
            </form>

            <form onSubmit={handleSubmit(onSubmit2)}>
              <Divider
                border={"2px"}
                borderColor="#153A5B"
                my={"2.5rem"}
              ></Divider>

              <Box my={"1rem"} bg="#153A5B">
                <Text p={"1rem"} color={"white"}>
                  Change Password
                </Text>
              </Box>

              <Flex justify={"space-evenly"}>
                <Box>
                  <Text my="0.3rem">Password</Text>
                  <Input
                    width="100%"
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    dropShadow="outline"
                    _hover={{
                      shadow: "base",
                      border: "1px",
                      borderColor: "#153A5B",
                    }}
                    color="white"
                    as={"input"}
                    shadow="base"
                    type="password"
                    placeholder="Enter Password"
                    {...register("password1", {
                      maxLength: 20,
                      minLength: 6,
                    })}
                  />
                  <Text as={"span"} color="red.500">
                    {errors["password1"]?.type === "maxLength" && (
                      <p role="alert">password length must be grater than 8 </p>
                    )}
                  </Text>
                </Box>

                <Box>
                  <Text my="0.3rem">New Pawword</Text>
                  <Input
                    width="100%"
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    dropShadow="outline"
                    _hover={{
                      shadow: "base",
                      border: "1px",
                      borderColor: "#153A5B",
                    }}
                    as={"input"}
                    shadow="base"
                    type="password"
                    placeholder="New Password"
                    {...register("password2", {
                      maxLength: 20,
                      minLength: 6,
                    })}
                  />
                  <Text as={"span"} color="red.500">
                    {errors["password2"]?.type === "maxLength" && (
                      <p role="alert">password length must be grater than 8 </p>
                    )}
                  </Text>
                </Box>
                <Box>
                  <Text my="0.3rem">Confirm New Pawword</Text>
                  <Input
                    width="100%"
                    bg={colorMode === "light" ? "white" : "#153A5B"}
                    _placeholder={
                      colorMode == "light"
                        ? {
                            color: "black",
                          }
                        : {
                            color: "white",
                          }
                    }
                    dropShadow="outline"
                    _hover={{
                      shadow: "base",
                      border: "1px",
                      borderColor: "#153A5B",
                    }}
                    as={"input"}
                    shadow="base"
                    type="password"
                    placeholder="Confirm New Password"
                    {...register("password3", {
                      maxLength: 20,
                      minLength: 6,
                    })}
                  />
                  <Text as={"span"} color="red.500">
                    {errors["password3"]?.type === "maxLength" && (
                      <p role="alert">password length must be grater than 8 </p>
                    )}
                  </Text>
                </Box>
              </Flex>

              <Box my={"1.5rem"}>
                <Input
                  as={"input"}
                  bg={colorMode === "light" ? "#153A5B" : "#153A5B"}
                  _placeholder={
                    colorMode == "light"
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  color="white"
                  cursor={"pointer"}
                  _hover={{
                    bg: "white",
                    color: "#153A5B",
                    border: "1px",
                    borderColor: "#153A5B",
                  }}
                  type="submit"
                />
              </Box>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
