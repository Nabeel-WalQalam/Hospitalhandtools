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
import { AiFillPicture } from "react-icons/ai";
import axios from "axios";
export default function Addcategory() {
  const [imageUrls, setImageUrls] = useState([]);
  const Router = useRouter();
  const toast = useToast();
  const [imagePreviews, setImagePreviews] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
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
    // const extractedData = data.subCategory.map(({ name, picture }) => ({
    //   name,
    //   picture,
    // }));
    // // console.log(extractedData);
    // data.subCategory = extractedData;
    console.log(data);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/addCategory`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data; ",
        // },
        body: JSON.stringify({
          data,
        }),
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
      setImagePreviews([]);
      reset();
      // Router.push("/haniyanasir/admin/");
    } else {
      toast({
        title: data2.msg,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      setImageUrls([]);
      reset();
    }
    // Router.push("/haniyanasir/admin/allcategory");
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];

    // Create a new FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mbqw8fjf");

    try {
      fetch("https://api.cloudinary.com/v1_1/dexc7zdm4/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setImagePreviews((prevImageUrls) => {
            const newImageUrls = [...prevImageUrls];
            newImageUrls[index] = data.url;
            return newImageUrls;
          });

          // Set the image URL to the React Hook Form field value
          setValue(`subCategory.${index}.image`, "");
          setValue(`subCategory.${index}.image`, data.url);
        })
        .catch((error) => {
          console.error("Error uploading image: ", error);
        });

      // Get the uploaded image URL from the response

      // Set the image URL to the corresponding index in the imageUrls state
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageDelete = (index) => {
    setImagePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews[index] = null;
      return newPreviews;
    });
    setValue(`subCategory.${index}.image`, "");
  };

  return (
    <>
      <Box width={"100%"} bg={"gray.200"}>
        <Box bg={"gray.200"} p="0.4rem">
          <Center>
            <Heading color={"#153A5B"}>Add Category</Heading>
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

                    <option value="ent instruments">Ent instruments</option>

                    <option value="plastic surgery instruments">
                      Plastic surgery instruments
                    </option>

                    <option value="instruments by procedures">
                      Instruments by procedures
                    </option>
                    <option value="instruments sets">instruments sets</option>
                    <option value="liposuction cannula and accessories">
                      Liposuction cannula and accessories
                    </option>
                  </Select>
                </Box>
                <Box my={"1rem"}>
                  {fields.map((item, index) => {
                    return (
                      <Flex
                        justify={"space-evenly"}
                        my={"1rem"}
                        key={item.id}
                        border="1px"
                        borderColor={"gray.200"}
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
                        <Flex
                          direction={"column-reverse"}
                          justify={"center"}
                          align={"center"}
                        >
                          <Text>Upload picture </Text>
                          <label htmlFor={`subCategory.${index}.image`}>
                            {" "}
                            <AiFillPicture fill="green" fontSize={"3rem"} />
                          </label>
                          <Input
                            display={"none"}
                            id={`subCategory.${index}.image`}
                            w={"30%"}
                            type={"file"}
                            onChangeCapture={(e) => handleImageUpload(e, index)}
                            {...register(`subCategory.${index}.image`)}
                          />
                        </Flex>

                        <Box border="1px" borderColor={"gray.300"}>
                          {imagePreviews[index] && (
                            <>
                              <Image
                                src={imagePreviews[index]}
                                alt="preview"
                                width={100}
                                height={100}
                              />
                              <Button
                                width={"100%"}
                                colorScheme="red"
                                size="sm"
                                borderRadius={"none"}
                                onClick={() => handleImageDelete(index)}
                              >
                                Delete
                              </Button>
                            </>
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
                      add category +
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
