import dbConnect from "@/Middleware/connectDb";
import Attribute from "@/models/Attribute";
import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Flex,
  Select,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function EditAttribute({ data }) {
  const Router = useRouter();
  const toast = useToast();
  const select = useRef();
  const { register, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      test: [
        data.values.map((i) => {
          name: i;
        }),
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  useEffect(() => {
    setValue(
      "test",
      data.values.map((item) => {
        return { name: item };
      })
    );
  }, [setValue]);

  const onSubmit = async (data2) => {
    console.log("data", data2, select.current.value);

    let attA = [];
    for (let i = 0; i < data2.test.length; i++) {
      // console.log(data.test[i].name);
      attA.push(data2.test[i].name);
    }

    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/editAttribute`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          id: data._id,
          name: select.current.value,
          data: attA,
        }),
      }
    );

    let result = await responce.json();
    console.log(result);
    if (result.success) {
      toast({
        title: result.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      Router.push("/admin");
    } else {
      toast({
        title: result.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg={"gray.100"} minH={"100vh"} width={"100%"}>
      <Center bg={"#153A5B"}>
        <Heading color={"white"}>Edit Attribute</Heading>
      </Center>
      <Flex mt={"5rem"} justify="center" direction={"column"}>
        <Box my={"3rem"} ml="2rem">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box width="40%" marginInline={"auto"}>
              <Text fontWeight={"semibold"} fontSize="1.6rem">
                Select Attribute Name
              </Text>
              <Select
                ref={select}
                required
                defaultValue={data.name}
                placeholder="Select Name"
                border={"1px"}
              >
                <option value="size">Size</option>
                <option value="type">Type</option>
                <option value="color">Color</option>
              </Select>
            </Box>
            <Flex direction={"column"}>
              {fields.map((item, index) => {
                return (
                  <Flex
                    border={"1px"}
                    borderColor="gray.300"
                    w="80%"
                    py={"0.5rem"}
                    mx="auto"
                    my="0.5rem"
                    justify={"center"}
                    gap="2rem"
                    key={item.id}
                    align="center"
                  >
                    <Text fontWeight={"medium"} fontSize="1.2rem">
                      Enter Name of Attribute
                    </Text>
                    <Input
                      _hover={{ border: "1px", borderColor: "#153A5B" }}
                      width={"30%"}
                      border={"1px"}
                      {...register(`test.${index}.name`, { required: true })}
                    />

                    <Button
                      colorScheme={"red"}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </Button>
                  </Flex>
                );
              })}
            </Flex>

            <Flex justify={"center"}>
              <Button
                type="button"
                colorScheme={"green"}
                onClick={() => {
                  append({ name: "" });
                }}
                mx="1rem"
                width={"30%"}
              >
                Add more
              </Button>

              <Button
                width={"30%"}
                type="button"
                onClick={() =>
                  reset({
                    test: [{ name: "" }],
                  })
                }
                colorScheme="orange"
              >
                reset
              </Button>
            </Flex>
            <Button
              mt={"2rem"}
              w="90%"
              marginInline={"auto"}
              colorScheme={"facebook"}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  console.log(context.query.id);
  let id = context.query.id;

  let Attributedata = await Attribute.findById({ _id: id });
  console.log(Attributedata);

  if (Attributedata) {
    return {
      props: { data: JSON.parse(JSON.stringify(Attributedata)) },
    };
  } else {
    return {
      props: { data: null },
    };
  }
}
