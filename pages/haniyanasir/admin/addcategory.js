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
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function Addcategory() {
  const Router = useRouter();
  const toast = useToast();
  const [imagePreviews, setImagePreviews] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subCategory: [{ name: "", image: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategory",
  });

  const onSubmit = async (data) => {
    // console.log(data);

    const formData = new FormData();

    for (let i = 0; i < data.subCategory.length; i++) {
      formData.append("files[]", data.subCategory[i].image[0]);
      formData.append("sunHeading", data.subCategory[i].name);
    }

    formData.append("field1", data.mainCategory);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/addCategory`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data; ",
        // },
        body: formData,
      }
    );
    const data2 = await response.json();
    if (data2.success) {
      toast({
        title: " Category Add Successfully",
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
      Router.push("/admin/allcategory");
    }

    console.log(data2);
  };

  const handleImage = (e, index) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImagePreviews((prev) => {
          const updatedPreviews = [...prev];
          updatedPreviews[index] = reader.result;
          return updatedPreviews;
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Box width={"100%"} height="100vh" bg={"gray.200"}>
        <Box bg={"#153A5B"} p="0.4rem">
          <Center>
            <Heading color={"white"}>Add Category</Heading>
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
                  <Select {...register("mainCategory", { required: true })}>
                    <option value="Select Option">Select Main Category</option>

                    <option value="ent instruments">ent instruments</option>

                    <option value="plastic surgery instruments">
                      plastic surgery instruments
                    </option>

                    <option value="instruments by procedures">
                      instruments by procedures
                    </option>
                    <option value="instruments sets">instruments sets</option>
                    <option value="liposuction cannula and accessories">
                      liposuction cannula and accessories
                    </option>
                  </Select>
                </Box>
                <Box my={"1rem"}>
                  {fields.map((item, index) => {
                    return (
                      <Flex
                        justify={"space-evenly"}
                        my={"0.5rem"}
                        key={item.id}
                        // border="1px"
                        align={"center"}
                        // w={"100%"}
                      >
                        <Input
                          w={"30%"}
                          placeholder="name "
                          {...register(`subCategory.${index}.name`, {
                            required: true,
                          })}
                        />
                        <Input
                          w={"30%"}
                          type={"file"}
                          onChangeCapture={(e) => handleImage(e, index)}
                          {...register(`subCategory.${index}.image`)}
                        />
                        <Box border="1px" borderColor={"gray.300"}>
                          {imagePreviews[index] && (
                            <Image
                              src={imagePreviews[index]}
                              alt="preview"
                              width={100}
                              height={100}
                            />
                          )}
                        </Box>

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
