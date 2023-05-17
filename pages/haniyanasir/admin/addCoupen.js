import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  Center,
  Input,
  Divider,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function AddCoupen() {
  const Router = useRouter();
  const toast = useToast();
  const [coupen, setcoupen] = useState("");
  const [coupenFreeShipping, setcoupenFreeShipping] = useState();
  const coupenType = useRef();
  const coupenAmount = useRef();

  const handleCoupen = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let generatedcoupon = "";

    for (let i = 0; i < 8; i++) {
      generatedcoupon += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    // console.log(generatedcoupon);
    setcoupen(generatedcoupon);
  };

  const handlechange = (e) => {
    // console.log(e);
    setcoupen(e.target.value);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(
      coupen,
      coupenType.current.value,
      coupenAmount.current.value,
      coupenFreeShipping
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/addCoupen`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
        body: JSON.stringify({
          coupen: coupen,
          coupenType: coupenType.current.value,
          coupenAmount: coupenAmount.current.value,
          coupenFreeShipping: coupenFreeShipping,
        }),
      }
    );
    const data2 = await response.json();
    if (data2.success) {
      toast({
        title: data2.msg,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      Router.push("/admin");
    } else {
      toast({
        title: data2.msg,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const handleFreeShipping = async (e) => {
    console.log(e.target.checked);
    setcoupenFreeShipping(e.target.checked);
  };

  return (
    <>
      <Box height={"100vh"} w={"100%"}>
        <Center bg={"#153A5B"}>
          <Heading color={"white"}>Add Coupens</Heading>
        </Center>
        <form onSubmit={handleForm}>
          <Flex mt={"1rem"} justify={"center"} align="center">
            <Box>
              <Text fontWeight={"bold"}>Add Coupen</Text>
              <Input
                required
                onChange={handlechange}
                value={coupen}
                type={"text"}
                placeholder="add Coupen"
                border={"1px"}
              />
              <Button
                my={"1rem"}
                colorScheme={"facebook"}
                onClick={handleCoupen}
              >
                Generate Random Coupen
              </Button>
            </Box>
          </Flex>
          <Divider />
          <Flex justify={"center"} direction="column">
            <Heading fontWeight={"bold"} align="center" mt={"2rem"}>
              Coupen Data
            </Heading>
            <Box width={"50%"} marginInline="auto">
              <Text fontWeight={"bold"} align="center" mt={"2rem"}>
                Coupen Type
              </Text>
              <Select ref={coupenType} required border={"1px"}>
                <option value="">Select-Option</option>
                <option value="percentage discount">percentage discount</option>
              </Select>
            </Box>
            <Box width={"50%"} marginInline="auto">
              <Text fontWeight={"bold"} align="center" mt={"2rem"}>
                Coupen amount
              </Text>
              <Input ref={coupenAmount} border={"1px"} type={"number"} />
            </Box>
            <Box width={"50%"} marginInline="auto">
              <Checkbox onChange={handleFreeShipping} my={"1rem"} required>
                free shipping ?
              </Checkbox>
            </Box>
            <Button
              type="submit"
              colorScheme={"green"}
              marginInline="auto"
              w={"50%"}
            >
              Save Coupen
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}
