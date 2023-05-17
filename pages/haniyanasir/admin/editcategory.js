import dbConnect from "@/Middleware/connectDb";
import Category from "@/models/Category";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Select,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
export default function Editcategory({ product }) {
  // console.log(product.subCategory);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subCategory: [product.subCategory.map((item) => item)],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategory",
  });
  // console.log(product);
  const toast = useToast();

  const onSubmit = async (data) => {
    // console.log(data);

    const formData = new FormData();

    for (let i = 0; i < data.subCategory.length; i++) {
      if (data.subCategory[i].image[0] instanceof File) {
        // console.log("file", data.subCategory[i].image[0]);
        // console.log("data", data.subCategory[i].name);
        formData.append("files[]", data.subCategory[i].image[0]);
        formData.append("sunHeading", data.subCategory[i].name);
      } else {
        formData.append("files2[]", data.subCategory[i].image);
        formData.append("sunHeading2", data.subCategory[i].name);
      }
    }

    formData.append("field1", data.mainCategory);
    formData.append("id", product._id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/editCategory`,
      {
        method: "POST",

        body: formData,
      }
    );
    const data2 = await response.json();

    console.log(data2);
    if (data2.success) {
      toast({
        title: "Update Category Successfully",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setValue("mainCategory", product.mainCategory);
    setValue(
      "subCategory",
      product.subCategory.map((item) => item)
    );
  }, [setValue]);

  return (
    <>
      <Box width={"100%"} height="100vh" bg={"gray.200"}>
        <Box bg={"#153A5B"} p="0.4rem">
          <Center>
            <Heading color={"white"}>Edit Category</Heading>
          </Center>
        </Box>

        <Flex
          // align={"center"}
          direction="column"
          border={"1px"}
          borderColor="gray.200"
          // width="100%"
          marginInline={"auto"}
          bg="white"
          borderRadius={"8px"}
          justify="center"
        >
          <Box mt={"1rem"} ml="1rem">
            <Text color={"#153A5B"} fontWeight="semibold">
              Category Info
            </Text>
          </Box>
          <Divider />
          <Box my={"1rem"}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <Flex direction={"column"} p="1rem">
                <Box my={"1rem"}>
                  <FormLabel>Main Category</FormLabel>
                  <Select
                    {...register("mainCategory", { required: true })}
                    borderColor="#153A5B"
                  >
                    <option value="Select Option">Select Main Category</option>
                    <option value="ent instruments">ent instruments</option>
                    <option value="plastic surgery instruments">
                      plastic surgery instruments
                    </option>
                    <option value="liposuction cannula and accessories">
                      liposuction cannula and accessories
                    </option>
                  </Select>
                </Box>
                <Box
                  my={"1rem"}
                  w="100%"
                  border={"1px"}
                  p="1rem"
                  borderColor={"gray.300"}
                >
                  {fields.map((item, index) => {
                    return (
                      <Flex
                        justify={"space-evenly"}
                        my={"1rem"}
                        key={item.id}
                        align="center"

                        // w={"100%"}
                      >
                        <Input
                          borderColor="#153A5B"
                          width={"30%"}
                          placeholder="name "
                          {...register(`subCategory.${index}.name`, {
                            required: true,
                          })}
                        />
                        <Input
                          borderColor="#153A5B"
                          width={"30%"}
                          type={"file"}
                          {...register(`subCategory.${index}.image`)}
                        />

                        {/* <Image
                          borderColor="#153A5B"
                          src={product.subCategory[index].image}
                          alt="pictures"
                          width={60}
                          height={100}
                        /> */}

                        <Button
                          colorScheme={"red"}
                          type="button"
                          px={"1rem"}
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      </Flex>
                    );
                  })}
                  <Flex justify={"end"} mr="2.5rem" mt={"1rem"}>
                    <Button
                      colorScheme={"green"}
                      type="button"
                      onClick={() => {
                        append({
                          name: "",
                          image: "",
                        });
                      }}
                      mr="1rem"
                    >
                      add
                    </Button>

                    <Button
                      colorScheme={"blue"}
                      type="button"
                      onClick={() =>
                        reset({
                          name: "",
                          image: "",
                        })
                      }
                    >
                      Reset
                    </Button>
                  </Flex>
                </Box>
                <Button variant={"outline"} colorScheme="purple" type="submit">
                  Submit
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  console.log(context.query.id);
  let id = context.query.id;
  console.log(id);
  if (!id) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  const res = await Category.findOne({ _id: id });
  const posts = await JSON.parse(JSON.stringify(res));
  // console.log(posts);
  {
    return {
      props: { product: posts }, // will be passed to the page component as props
    };
  }
}
