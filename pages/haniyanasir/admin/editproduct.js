import dbConnect from "@/Middleware/connectDb";
import Product from "@/models/Product";

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
import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

export default function Editproduct({ product }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadImages, setuploadImages] = useState([]);
  const Router = useRouter();
  const [tags, setTags] = useState(product.tags);
  const toast = useToast();
  const [getCategory, setgetCategory] = useState(product.category);
  const [filterCategory, setfilterCategory] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Variant: [product.options.map((item) => item)],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Variant",
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("model", product.model);
      setValue("weight", product.weight);
      setValue("quantity", product.quantity);
      setValue("minPrice", product.minPrice);
      setValue("maxPrice", product.maxPrice);
      setValue("category", product.category);
      setValue("slug", product.slug);
      setValue(
        "Variant",
        product.options.map((item, INDEX) => item)
      );
    }
  }, [product, setValue, filterCategory]);
  useEffect(() => {
    setSelectedImages(product.image);
    setuploadImages(product.image);
  }, []);

  // console.log(product);
  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(uploadImages);
    // console.log(tags);
    const formData = new FormData();

    for (let i = 0; i < uploadImages.length; i++) {
      if (uploadImages[i] instanceof File) {
        console.log(uploadImages[i]);
        formData.append("files[]", uploadImages[i]);
      } else {
        formData.append("files2[]", uploadImages[i]);
      }
    }
    formData.append("id", product._id);
    formData.append("options[]", JSON.stringify(data.Variant));
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("minPrice", data.minPrice);
    formData.append("maxPrice", data.maxPrice);
    formData.append("model", data.model);
    formData.append("quantity", data.quantity);
    formData.append("tags[]", JSON.stringify(tags));
    formData.append("weight", data.weight);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/editProduct`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data2 = await response.json();
    console.log(data2);
    if (data2.success == true) {
      toast({
        title: "Product Edit Successfully.",
        description: "Item have been registerd ",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      Router.push("/admin");
    } else {
      toast({
        title: "error",
        description: "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    setuploadImages((previousImages) =>
      previousImages.concat(event.target.files[0])
    );
    // console.log(selectedFiles);
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    // event.target.value = "";
  };

  async function deleteHandler(image, index2) {
    console.log(image);
    const urlPattern =
      /https:\/\/hospitalhandtools\.nyc3\.digitaloceanspaces\.com/;

    const isValidUrl = (url) => {
      return urlPattern.test(url);
    };
    // console.log(image, index);
    // console.log(isValidUrl(image));
    if (isValidUrl(image)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/deleteImage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: image,
          }),
        }
      );
      const data2 = await response.json();
      if (data2.success == true) {
        toast({
          title: "Image Delete Successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "error",
          description: "Error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      setuploadImages(uploadImages.filter((e, index) => index !== index2));
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    } else {
      setuploadImages(uploadImages.filter((e, index) => index !== index2));
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    }

    // // console.log(image);
  }

  const handleCategory = (e) => {
    console.log(e.target.value);
    setgetCategory(e.target.value);
  };

  useEffect(() => {
    const getAllSubCategory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getCategorys`,
        {
          method: "GET",
        }
      );

      const data2 = await response.json();
      // console.log(data2.getAll);
      const filterCategory = data2.getAll.filter((items) => {
        return items.mainCategory == getCategory;
      });

      // if(filterCategory[0])

      // console.log(filterCategory.length);
      if (filterCategory.length) {
        setfilterCategory(filterCategory[0].subCategory);
      }
    };

    getAllSubCategory();
  }, [getCategory]);

  return (
    <>
      <Box
        width={"100%"}
        // height="100vh"
        bg={"gray.200"}
      >
        <Box bg={"#153A5B"} p="0.4rem">
          <Center>
            <Heading color={"white"}>Edit Products</Heading>
          </Center>
        </Box>

        <Flex
          align={"center"}
          direction="column"
          border={"1px"}
          borderColor="gray.200"
          width="80%"
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
            <form>
              <Flex direction={"column"} p="1rem">
                <Box my={"1rem"}>
                  <Flex
                    direction={"row"}
                    // border="1px "
                    wrap={"wrap"}
                    justify="space-evenly"
                  >
                    <Box my="0.5rem">
                      <FormLabel>Product Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Product name"
                        {...register("title", {
                          required: true,
                          maxLength: 80,
                        })}
                        // my="1rem"
                      />
                    </Box>
                    <Box my="0.5rem">
                      <FormLabel>Product Description</FormLabel>
                      <Input
                        type="text"
                        placeholder="Description"
                        {...register("description", {
                          required: true,
                          maxLength: 100,
                        })}
                        // my="1rem"
                      />
                    </Box>
                    <Box my="0.5rem">
                      <FormLabel>Product Model</FormLabel>
                      <Input
                        type="text"
                        placeholder="Model"
                        {...register("model", {
                          required: true,
                          maxLength: 100,
                        })}
                        // my="1rem"
                      />
                    </Box>
                    <Box my="0.5rem">
                      <FormLabel>Product Category</FormLabel>
                      <Select
                        onChangeCapture={handleCategory}
                        {...register("category", { required: true })}
                      >
                        <option value="">Select Category</option>
                        <option value="plastic surgery instruments">
                          plastic surgery instruments
                        </option>
                        <option value="liposuction cannula and accessories">
                          liposuction cannula and accessories
                        </option>
                        <option value="instruments by procedures">
                          instruments by procedures
                        </option>
                        <option value="instruments sets">
                          instruments sets
                        </option>
                        <option value="ent instruments">ent instruments</option>
                      </Select>
                    </Box>
                    <Box my="0.5rem" w={"25%"}>
                      <FormLabel>Product Slug</FormLabel>
                      <Select
                        w={"100%"}
                        {...register("slug", { required: true })}
                      >
                        <option value="">Select slug</option>
                        filterCategory ?
                        {filterCategory.map((items) => {
                          return (
                            <option key={items.name} value={items.name}>
                              {items.name}
                            </option>
                          );
                        })}
                        :" "
                      </Select>
                    </Box>
                    <Box my="0.5rem">
                      <FormLabel>Product Category / Slug</FormLabel>
                      <Input
                        type="text"
                        placeholder="Fiber-Optic-Instruments"
                        {...register("slug", {
                          required: true,
                          maxLength: 100,
                        })}
                        // my="1rem"
                      />
                    </Box>

                    <Box my="0.5rem">
                      <FormLabel>Product Weigth</FormLabel>
                      <Input
                        step="0.01"
                        type="number"
                        placeholder="Weight : 0.16kg"
                        {...register("weight", {
                          required: true,
                        })}
                        // my="1rem"
                      />
                    </Box>
                    <Box my="0.5rem">
                      <FormLabel>Product Quantity</FormLabel>
                      <Input
                        type="number"
                        placeholder="Quantity 5 - 8"
                        {...register("quantity", {
                          required: true,
                        })}
                        // my="1rem"
                      />
                    </Box>
                    <Box my="0.5rem">
                      <FormLabel>Product Min-Price</FormLabel>
                      <Input
                        type="number"
                        placeholder="Min-Price"
                        {...register("minPrice", {
                          required: true,
                        })}
                        // my="1rem"
                      />
                    </Box>
                    <Box my="0.5rem">
                      <FormLabel>Product Max-Price</FormLabel>
                      <Input
                        type="number"
                        placeholder="Max-Price"
                        {...register("maxPrice")}
                        // my="1rem"
                      />
                    </Box>
                    <Divider my={"1rem"} />
                    <Box w={"100%"}>
                      <FormLabel ml={"2rem"}>Add Varients</FormLabel>
                      {fields.map((item, index) => {
                        return (
                          <Flex
                            justify={"space-evenly"}
                            my={"0.5rem"}
                            key={item.id}
                            // border="1px"
                            w={"100%"}
                          >
                            <Input
                              placeholder="Select Tip / Select Options"
                              w={"30%"}
                              {...register(`Variant.${index}.options`, {
                                required: true,
                              })}
                            />
                            <Input
                              placeholder="name of option"
                              w={"30%"}
                              {...register(`Variant.${index}.tag`, {
                                required: true,
                              })}
                            />
                            <Input
                              placeholder="name of option"
                              w={"30%"}
                              {...register(`Variant.${index}.price`, {
                                required: true,
                              })}
                            />

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
                              options: " ",
                              tag: " ",
                              price: " ",
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
                              options: "",
                              tag: "",
                              price: "",
                            })
                          }
                        >
                          Reset
                        </Button>
                      </Flex>
                    </Box>
                    <Divider my={"1rem"} />
                    <Box>
                      <FormLabel>Add Products-Tags</FormLabel>
                      <div className="tags-input-container">
                        {tags.map((tag, index) => (
                          <div className="tag-item" key={index}>
                            <span className="text">{tag}</span>
                            <span
                              className="close"
                              onClick={() => removeTag(index)}
                            >
                              &times;
                            </span>
                          </div>
                        ))}
                        <Input
                          onKeyDown={handleKeyDown}
                          type="text"
                          className="tags-input"
                          placeholder="Type somthing"
                        />
                      </div>
                    </Box>
                  </Flex>
                  <Box p={"1rem"}>
                    <section className="Psection">
                      <label className="Plabel">
                        + Add Images
                        <br />
                        <span className="Pspan">up to 10 images</span>
                        <Input
                          className="Pinput"
                          type="file"
                          name="images"
                          onChange={onSelectFile}
                          multiple
                          accept="image/png , image/jpeg, image/webp"
                        />
                      </label>
                      <br />

                      <Flex
                        border={"1px"}
                        borderColor="gray.300"
                        align={"center"}
                        justify="space-between"
                        my="1rem"
                        wrap={"wrap"}
                        className="images"
                      >
                        {selectedImages &&
                          selectedImages.map((image, index) => {
                            return (
                              <Box key={image} className="image">
                                <Image
                                  className="img"
                                  src={image}
                                  height={100}
                                  width={150}
                                  alt="upload"
                                />
                                <Button
                                  onClick={() => deleteHandler(image, index)}
                                >
                                  delete image
                                </Button>
                                <p>{index + 1}</p>
                              </Box>
                            );
                          })}
                      </Flex>

                      {/* {selectedImages.length > 0 &&
                        (selectedImages.length > 10 ? (
                          <p className="error">
                            You can't upload more than 10 images! <br />
                            <span>
                              please delete{" "}
                              <b> {selectedImages.length - 10} </b> of them{" "}
                            </span>
                          </p>
                        ) : (
                          <button
                            className="upload-btn"
                            onClick={() => {
                              console.log(selectedImages);
                            }}
                          >
                            UPLOAD {selectedImages.length} IMAGE
                            {selectedImages.length === 1 ? "" : "S"}
                          </button>
                        ))} */}
                    </section>
                  </Box>
                </Box>
                <Box my={"1rem"}></Box>
                <Button
                  variant={"outline"}
                  colorScheme="purple"
                  onClick={handleSubmit(onSubmit)}
                >
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

  // console.log(context.query.id);
  let id = context.query.id;
  // console.log(id);

  const res = await Product.findOne({ _id: id });
  const posts = await JSON.parse(JSON.stringify(res));
  // console.log(posts);

  return {
    props: { product: posts }, // will be passed to the page component as props
  };
}
