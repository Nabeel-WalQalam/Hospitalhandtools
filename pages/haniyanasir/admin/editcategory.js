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
  FormControl,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { AiFillPicture } from "react-icons/ai";
import { useRouter } from "next/router";
export default function Editcategory({ product }) {
  const [imagePreviews, setImagePreviews] = useState([]);
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
  const Router = useRouter();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategory",
  });
  // console.log(product);
  const toast = useToast();

  console.log("category", imagePreviews);

  const onSubmit = async (data) => {
    // console.log("asdasd", data);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/editCategory`,
      {
        method: "POST",

        body: JSON.stringify({ data, key: product._id }),
      }
    );
    const data2 = await response.json();

    if (data2.success) {
      toast({
        title: "Update Category Successfully",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      Router.push("/haniyanasir/admin/allcategory");
    } else {
      toast({
        title: "error Occured",
        status: "error",
        duration: 5000,
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
      <Box width={"100%"} height="100vh" bg={"gray.200"}>
        <Box bg={"gray.300"} p="0.4rem">
          <Center>
            <Heading>Edit Category</Heading>
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
                <Flex
                  direction={"column"}
                  my={"1rem"}
                  // w="100%"
                  // border={"1px"}
                  // p="1rem"
                  // borderColor={"gray.300"}
                >
                  {fields.map((item, index) => {
                    return (
                      <Flex
                        // justify={"space-evenly"}
                        justify={"center"}
                        my={"1rem"}
                        key={item.id}
                        gap={"2rem"}
                        wrap={"wrap"}
                        align="center"
                        border={"1px"}
                        borderColor={"gray.200"}
                        // w={"100%"}
                      >
                        <Flex gap={"5rem"} width={"50%"}>
                          <FormControl>
                            <FormLabel>Category Name</FormLabel>
                            <Input
                              borderColor="#153A5B"
                              // width={"30%"}
                              placeholder="name "
                              {...register(`subCategory.${index}.name`, {
                                required: true,
                              })}
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Picture</FormLabel>

                            <label htmlFor={`subCategory.${index}.picture`}>
                              {" "}
                              <AiFillPicture fill="green" fontSize={"3rem"} />
                            </label>
                            <Input
                              display={"none"}
                              id={`subCategory.${index}.picture`}
                              // w={"30%"}
                              type={"file"}
                              onChangeCapture={(e) =>
                                handleImageUpload(e, index)
                              }
                              {...register(`subCategory.${index}.image`)}
                            />
                          </FormControl>
                        </Flex>

                        <Box border="1px" borderColor={"gray.300"}>
                          {imagePreviews[index] && (
                            <>
                              <Image
                                src={imagePreviews[index]}
                                alt="preview"
                                width={150}
                                height={100}
                              />
                              <Button
                                // width={"100%"}
                                colorScheme="red"
                                size="sm"
                                borderRadius={"none"}
                                onClick={() => handleImageDelete(index)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                          {product.subCategory[index] && (
                            <>
                              <Image
                                src={product.subCategory[index].image}
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
                </Flex>
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
