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
  Radio,
  RadioGroup,
  Stack,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { Texteditor } from "@/Components/QuillEditor/TextEditor";
import CloudinaryUploader from "@/Components/CloudinaryUploader";

import dbConnect from "@/Middleware/connectDb";
import Attribute from "@/models/Attribute";
import { Tags } from "@/Components/ProductsTag/Tags";
import { Variant } from "@/Components/ProductVariant/Variant";
import Product from "@/models/Product";

export default function Addproduct({ attrubutes, product }) {
  // console.log(product);
  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      combinationList: [
        product && product.options && product.options.map((item) => item),
      ],
    },
  });

  const [disableButton2, setdisableButton2] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const Router = useRouter();
  const [tags, setTags] = useState([]);
  const toast = useToast();
  const [getCategory, setgetCategory] = useState(
    product ? product.category : ""
  );
  const [filterCategory, setfilterCategory] = useState([]);

  const [AttributeName, setAttributeName] = useState([
    product && product.combination_set,
  ]);
  const [combinations, setCombinations] = useState([]);
  const [CombinationList, setCombinationList] = useState([
    product && product.combination,
  ]);
  const [backOrder, setbackOrder] = useState("true");
  const [priceType, setpriceType] = useState(
    product ? product.priceType : "fixed"
  );
  const [variants, setvariants] = useState(product ? product.variants : "no");
  const [shortDescription, setshortDescription] = useState(
    product && product.short_description
  );
  const [longDescription, setlongDescription] = useState(
    product && product.long_description
  );
  const [ispost, setispost] = useState(false);

  const [images, setImages] = useState([]);

  const onSubmit = async (data) => {
    console.log(
      "send data",
      data,
      variants,
      backOrder,
      priceType,
      images,
      tags,
      shortDescription,
      longDescription,
      CombinationList,
      AttributeName
    );

    // setdisableButton2(true);

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_HOST}/api/addProduct`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       data: data,
    //       shortDes: shortDescription,
    //       longDes: longDescription,
    //       picture: images,
    //       isBackOrder: backOrder,
    //       pricetype: priceType,
    //       variants: variants,
    //       combination_set: AttributeName,
    //       tags: tags,
    //       combination: CombinationList,
    //     }),
    //   }
    // );
    // const data2 = await response.json();

    // if (data2.success == true) {
    //   toast({
    //     title: "Product Publish.",
    //     description: "Item have been registerd ",
    //     status: "success",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   reset();
    //   setTags([]);
    //   setshortDescription("");
    //   setlongDescription("");
    //   setCombinations([]);
    //   setAttributeName([]);
    //   setsizeAttribute([]);
    //   setallAttribute([]);
    //   settypeAttribute([]);
    //   setcolorAttribute([]);

    //   setSelectedImages([]);
    //   setispost(true);
    //   setImages([]);
    //   setdisableButton2(false);
    //   // Router.push("/admin");
    // } else {
    //   toast({
    //     title: "error",
    //     description: data2.msg,
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   reset();
    //   setTags([]);
    //   setshortDescription("");
    //   setlongDescription("");
    //   setCombinations([]);
    //   setAttributeName([]);
    //   setsizeAttribute([]);
    //   setallAttribute([]);
    //   settypeAttribute([]);
    //   setcolorAttribute([]);

    //   setSelectedImages([]);
    //   setispost(true);
    //   setdisableButton2(false);
    // }
  };

  const handleCategory = (e) => {
    // console.log(e.target.value);
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

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("model", product.model);
      setValue("weight", product.weight);
      setValue("quantity", product.quantity);
      setValue("minPrice", product.minPrice);
      setValue("fixedPrice", product.fixedPrice);
      setValue("maxPrice", product.maxPrice);
      setValue("category", product.category);
      setValue("slug", product.slug);
      setTags(product.tags);
      setValue("combinationList", product.options);
      setImages(product.image);
      setbackOrder(product.backOrder ? "true" : "false");
      setvariants(product.variants);
      setshortDescription(product.short_description);
      setlongDescription(product.long_description);

      // product.options &&
      //   setValue(
      //     "combinationList",
      //     product.options.map((item, INDEX) => item)
      //   );
    } else {
      reset();
    }
  }, []);
  useEffect(() => {
    if (!product) {
      reset();
    }
  }, []);

  return (
    <>
      <Box
        width={"100%"}
        // height="100vh"
        bg={"gray.200"}
      >
        <Box bg={"gray.300"} p="0.2rem">
          <Center>
            <Heading color={"#153A5B    "}>Add Products</Heading>
          </Center>
        </Box>

        <Flex
          align={"center"}
          direction="column"
          // border={"1px"}
          // borderColor="gray.200"
          // width="90%"
          marginInline={"auto"}
          bg="white"
          borderRadius={"8px"}
          justify="center"
        >
          <Box width={"100%"} my={"1rem"}>
            <form>
              <Flex width={"100%"} direction={"column"} p="1rem">
                <Box width={"100%"} my={"1rem"}>
                  <Flex
                    direction={"row"}
                    // border="1px "
                    wrap={"wrap"}
                    gap="6rem"
                    justify="center"
                    width={"100%"}
                  >
                    <Box
                      border={"1px"}
                      borderRadius={"9px"}
                      borderColor={"gray.300"}
                      p={"1rem"}
                    >
                      <Box my="0.5rem">
                        <FormLabel>Product Name</FormLabel>
                        <Input
                          w={"100%"}
                          type="text"
                          placeholder="Product name"
                          {...register("title", {
                            // required: true,
                            maxLength: 80,
                          })}
                          // my="1rem"
                        />
                      </Box>

                      <Box my="3rem" w={"100%"}>
                        <FormLabel>Product Short Description</FormLabel>
                        <Texteditor
                          isposted={ispost}
                          setText={setshortDescription}
                          editText={shortDescription}
                        />
                      </Box>
                      <Flex
                        justify={"center"}
                        wrap={"wrap"}
                        gap={"3rem"}
                        my={"2rem"}
                      >
                        <Box my="0.5rem">
                          <FormLabel>Product Quantity</FormLabel>
                          <Input
                            step={"0"}
                            type="number"
                            placeholder="Quantity 5 - 8"
                            {...register("quantity", {
                              // required: true,
                            })}
                            // my="1rem"
                          />
                        </Box>
                        <Flex
                          justify={"center"}
                          direction={"column"}
                          // align={"center"}
                        >
                          <FormLabel>Accept BackOrder ? </FormLabel>
                          <RadioGroup onChange={setbackOrder} value={backOrder}>
                            <Stack direction="row" gap={"1rem"}>
                              <Radio value="true">Yes</Radio>
                              <Radio value="false">No</Radio>
                            </Stack>
                          </RadioGroup>
                        </Flex>

                        <Flex
                          justify={"center"}
                          direction={"column"}
                          // align={"center"}
                        >
                          <FormLabel>Product Price Type ? </FormLabel>
                          <RadioGroup onChange={setpriceType} value={priceType}>
                            <Stack direction="row" gap={"1rem"}>
                              <Radio value="fixed">fixed</Radio>
                              <Radio value="range">range</Radio>
                            </Stack>
                          </RadioGroup>
                        </Flex>

                        {priceType !== "fixed" ? (
                          <>
                            <Box my="0.5rem">
                              <FormLabel>Product Min-Price</FormLabel>
                              <InputGroup>
                                <InputLeftAddon children="$" />
                                <Input
                                  step="0.01"
                                  type="number"
                                  placeholder="Min-Price"
                                  {...register("minPrice", {
                                    // required: true,
                                  })}
                                  // my="1rem"
                                />
                              </InputGroup>
                            </Box>
                            <Box my="0.5rem">
                              <FormLabel>Product Max-Price</FormLabel>
                              <InputGroup>
                                <InputLeftAddon children="$" />
                                <Input
                                  step="0.01"
                                  type="number"
                                  placeholder="Max-Price"
                                  {...register("maxPrice")}
                                  // my="1rem"
                                />
                              </InputGroup>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box my="0.5rem">
                              <FormLabel>Product Price</FormLabel>
                              <InputGroup>
                                <InputLeftAddon children="$" />
                                <Input
                                  type="number"
                                  placeholder="Price"
                                  {...register("fixedPrice", {
                                    // required: true,
                                  })}
                                  // my="1rem"
                                />
                              </InputGroup>
                            </Box>
                            <Box my="0.5rem">
                              <FormLabel>Sale Price</FormLabel>
                              <InputGroup>
                                <InputLeftAddon children="$" />
                                <Input
                                  type="number"
                                  placeholder="Sale Price"
                                  {...register("salePrice")}
                                  // my="1rem"
                                />
                              </InputGroup>
                            </Box>
                          </>
                        )}
                      </Flex>

                      <Box my="1rem" height={"400px"} w={"100%"}>
                        <FormLabel>Product Long Description</FormLabel>

                        <Texteditor
                          isposted={ispost}
                          setText={setlongDescription}
                          editText={longDescription}
                        />
                      </Box>
                    </Box>

                    <Box
                      border={"1px"}
                      borderRadius={"9px"}
                      borderColor={"gray.200"}
                      p={"1rem"}
                    >
                      <Box my="0.5rem">
                        <FormLabel>Product Model</FormLabel>
                        <Input
                          type="text"
                          placeholder="Model"
                          {...register("model", {
                            // required: true,
                            maxLength: 100,
                          })}
                          // my="1rem"
                        />
                      </Box>

                      <Box my="0.5rem">
                        <FormLabel>Product Category</FormLabel>
                        <Select
                          onChangeCapture={handleCategory}
                          {...register("category", {
                            // required: true,
                          })}
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
                          <option value="ent instruments">
                            ent instruments
                          </option>
                        </Select>
                      </Box>
                      <Box my="1rem">
                        <FormLabel>Product Sub-category</FormLabel>
                        <Select
                          placeholder="Select Sub Category"
                          w={"100%"}
                          {...register("slug", {
                            // required: true,
                          })}
                        >
                          filterCategory ?
                          {filterCategory.map((items) => {
                            return (
                              <option key={items.name} value={items.name}>
                                {items.name}
                              </option>
                            );
                          })}
                          :""
                        </Select>
                      </Box>
                      <Box my="0.5rem">
                        <FormLabel>Product Weigth</FormLabel>
                        <Input
                          step="0.01"
                          type="number"
                          placeholder="Weight : 0.16kg"
                          {...register("weight", {
                            // required: true,
                          })}
                          // my="1rem"
                        />
                      </Box>
                    </Box>
                    <Tags tags={tags} setTags={setTags} />
                  </Flex>

                  <Variant
                    attrubutes={attrubutes}
                    variants={variants}
                    setvariants={setvariants}
                    register={register}
                    setValue={setValue}
                    reset={reset}
                    setCombination={setCombinationList}
                    productCombination={product ? product.options : null}
                    productAttributes={
                      product == null ? null : product.combination_set
                    }
                    productAttributesValue={
                      product == null ? null : product.combination
                    }
                    setAttriName={setAttributeName}
                    loading={disableButton2}
                    // errors={errors}
                  />
                  <Flex
                    justify={"space-between"}
                    w={"70%"}
                    mx="auto"
                    direction={"column"}
                    marginY={"1rem"}
                    align={"center"}
                    borderColor={"gray.400"}
                    marginTop={"2rem"}
                  >
                    <CloudinaryUploader
                      setImages2={setImages}
                      images={images}
                      loading={disableButton2}
                    />
                  </Flex>
                </Box>
                <Box my={"1rem"}></Box>
                <Button
                  isLoading={disableButton2}
                  loadingText="Submitting"
                  isDisabled={disableButton2}
                  variant={"solid"}
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

  if (context.query.id) {
    const key = context.query.id;
    try {
      const res = await Attribute.find({});
      const posts = await JSON.parse(JSON.stringify(res));
      const res2 = await Product.findById({ _id: key });
      const singleProduct = await JSON.parse(JSON.stringify(res2));

      return {
        props: { attrubutes: posts, product: singleProduct }, // will be passed to the page component as props
      };
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const res = await Attribute.find({});
      const posts = await JSON.parse(JSON.stringify(res));

      return {
        props: { attrubutes: posts, product: null }, // will be passed to the page component as props
      };
    } catch (error) {
      console.log(error);
    }
  }
}
