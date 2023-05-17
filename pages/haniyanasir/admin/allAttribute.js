import dbConnect from "@/Middleware/connectDb";
import Attribute from "@/models/Attribute";
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Center,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function AllAttribute({ data }) {
  const toast = useToast();
  const Router = useRouter();
  // const [allAttribute, setallAttribute] = useState([data]);

  // console.log(allAttribute);

  // useEffect(() => {
  //   setallAttribute(data);
  // }, [data]);

  const handleEdit = async (e, key) => {
    console.log(key);
    Router.push(`/admin/editAttribute?id=${key}`);
  };

  const handleDelete = async (e, key) => {
    console.log(key);
    // Router.push(`/admin/editAttribute?id=${key}`);
    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/deleteAttribute`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          id: key,
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
      Router.push("/admin/allAttribute");
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
    <Box height={"100vh"} width={"100%"}>
      <Center bg="#153A5B">
        <Heading color={"white"}>All Attribute</Heading>
      </Center>
      <Box>
        {data.length ? (
          <>
            <Flex my={"0.5rem"} justify={"space-between"} width="98%" mx="auto">
              <Box fontWeight={"semibold"} fontSize="1.2rem">
                Attribute Name
              </Box>
              <Box fontWeight={"semibold"} fontSize="1.2rem">
                Attribute values
              </Box>
              <Box fontWeight={"semibold"} fontSize="1.2rem">
                Action
              </Box>
            </Flex>
            <Flex direction="column">
              {data.map((items) => {
                console.log(items);
                return (
                  <Flex
                    my={"1rem"}
                    p="1rem"
                    border={"1px"}
                    borderColor={"gray.300"}
                    justify="space-between"
                    key={items._id}
                  >
                    <Text
                      fontWeight={"semibold"}
                      textTransform="uppercase"
                      fontSize="1.5rem"
                    >
                      {items.name} :
                    </Text>
                    <Flex border={"1px"} w="80%" borderColor={"gray.200"}>
                      {items.values.map((i) => {
                        return (
                          <Flex
                            mx={"0.2rem"}
                            wrap={"wrap"}
                            fontSize={"1rem"}
                            key={i}
                          >
                            {i} ,
                          </Flex>
                        );
                      })}
                    </Flex>
                    <Button
                      onClick={(e) => handleEdit(e, items._id)}
                      colorScheme={"green"}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => handleDelete(e, items._id)}
                      colorScheme={"red"}
                    >
                      Delete
                    </Button>
                  </Flex>
                );
              })}
            </Flex>
          </>
        ) : (
          <Flex justify={"center"}>
            <Box fontWeight={"bold"} fontSize="2rem">
              {" "}
              No Attribte Found ?
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  let AllAttriburtes = await Attribute.find();
  console.log(AllAttriburtes);
  if (AllAttriburtes) {
    return {
      props: { data: JSON.parse(JSON.stringify(AllAttriburtes)) },
    };
  } else {
    return {
      props: { data: null },
    };
  }
}
