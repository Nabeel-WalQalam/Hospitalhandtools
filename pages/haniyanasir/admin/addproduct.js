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
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputLeftAddon,
  VStack,
  Image,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
// import Image from "next/image";
import { Upload } from "react-feather";
import { CloudinaryContext, Image as CloudinaryImage } from "cloudinary-react";
import Head from "next/head";

import { AddAttributes } from "@/Components/SelectAttributes";
import { Texteditor } from "@/Components/QuillEditor/TextEditor";
import CloudinaryUploader from "@/Components/CloudinaryUploader";

import { AiFillPicture } from "react-icons/ai";
import dbConnect from "@/Middleware/connectDb";
import Attribute from "@/models/Attribute";
import { Tags } from "@/Components/ProductsTag/Tags";
import { Variant } from "@/Components/ProductVariant/Variant";

// import { Varinats } from "@/Components/Varinats";

export default function Addproduct({ attrubutes }) {
  const [disableButton2, setdisableButton2] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadImages, setuploadImages] = useState([]);
  const Router = useRouter();
  const [tags, setTags] = useState([]);
  const toast = useToast();
  const [getCategory, setgetCategory] = useState("");
  const [filterCategory, setfilterCategory] = useState([]);
  const selectAttribute = useRef();
  const [disableButton, setdisableButton] = useState(false);
  const [allAttribute, setallAttribute] = useState([]);

  //set attibute data in Api reques

  const [AttributeName, setAttributeName] = useState([]);
  const [sizeAttribute, setsizeAttribute] = useState([]);
  const [typeAttribute, settypeAttribute] = useState([]);
  const [colorAttribute, setcolorAttribute] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [weight, setweight] = useState("");
  const [listWeight, setlistWeight] = useState([]);
  const [getSizeList, setgetSizeList] = useState([]);
  const [getTypeList, setgetTypeList] = useState([]);
  const [getColorList, setgetColorList] = useState([]);
  const [CombinationList, setCombinationList] = useState([]);
  const [combinationImage, setcombinationImage] = useState([]);
  const [combinationimageselected, setcombinationimageselected] = useState([]);
  const [backOrder, setbackOrder] = useState("true");
  const [priceType, setpriceType] = useState("fixed");
  const [variants, setvariants] = useState("no");
  const [shortDescription, setshortDescription] = useState("");
  const [longDescription, setlongDescription] = useState("");
  const [ispost, setispost] = useState(false);

  const [images, setImages] = useState([]);

  // console.log("images", images);

  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      combinationList: [
        {
          combination: "",
          weight: "",
          price: "",
          image: "",
        },
      ],
    },
  });

  // const { fields, append, remove, update } = useFieldArray({
  //   control,
  //   name: "combinationList",
  // });

  const onSubmit = async (data) => {
    console.log(
      "send data",
      data,
      backOrder,
      priceType,
      images,
      tags,
      shortDescription,
      longDescription,
      CombinationList,
      AttributeName
    );
    setdisableButton2(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/addProduct`,
      {
        method: "POST",
        body: JSON.stringify({
          data: data,
          shortDes: shortDescription,
          longDes: longDescription,
          picture: images,
          isBackOrder: backOrder,
          pricetype: priceType,
          variants: variants,
          combination_set: AttributeName,
          tags: tags,
          combination: CombinationList,
        }),
      }
    );
    const data2 = await response.json();

    if (data2.success == true) {
      toast({
        title: "Product Publish.",
        description: "Item have been registerd ",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      setTags([]);
      setshortDescription("");
      setlongDescription("");
      setCombinations([]);
      setAttributeName([]);
      setsizeAttribute([]);
      setallAttribute([]);
      settypeAttribute([]);
      setcolorAttribute([]);

      setSelectedImages([]);
      setispost(true);
      setImages([]);
      setdisableButton2(false);
      // Router.push("/admin");
    } else {
      toast({
        title: "error",
        description: data2.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      reset();
      setTags([]);
      setshortDescription("");
      setlongDescription("");
      setCombinations([]);
      setAttributeName([]);
      setsizeAttribute([]);
      setallAttribute([]);
      settypeAttribute([]);
      setcolorAttribute([]);

      setSelectedImages([]);
      setispost(true);
      setdisableButton2(false);
    }
  };

  // const updateFields = () => {
  //   finalCombinations.forEach((combination, index) => {
  //     setValue(
  //       `combinationList[${index}].combination`,
  //       combination.combination
  //     );
  //     setValue(`combinationList[${index}].weight`, combination.weight);
  //     setValue(`combinationList[${index}].price`, combination.price);
  //   });
  // };

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

  function deleteHandler(image, index2) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    setuploadImages(uploadImages.filter((e, index) => index !== index2));
    URL.revokeObjectURL(image);
  }

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

  const handleAttribute = async () => {
    setdisableButton(true);

    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getAttributes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          id: selectAttribute.current.value,
        }),
      }
    );

    let result = await responce.json();
    // console.log(result);
    if (result.success) {
      setdisableButton(false);
      toast({
        title: "Attribute Successfully Added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // setAttributeName((prev) => [...prev, result.msg.name]);

      if (result.msg.name == "size") {
        setsizeAttribute(result.msg.values);
        setallAttribute((oldValues) => [...oldValues, result.msg.values]);
        setAttributeName((prev) => [...prev, result.msg.name]);
      } else if (result.msg.name == "type") {
        settypeAttribute(result.msg.values);
        setallAttribute((oldValues) => [...oldValues, result.msg.values]);
        setAttributeName((prev) => [...prev, result.msg.name]);
      } else if (result.msg.name == "color") {
        setcolorAttribute(result.msg.values);
        setallAttribute((oldValues) => [...oldValues, result.msg.values]);
        setAttributeName((prev) => [...prev, result.msg.name]);
      }

      // setAttributeName((oldValues) => [...oldValues, result.msg.name]);
    } else {
      setdisableButton(false);
      toast({
        title: "Attribute Not added please add one",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // console.log("size", combinations);
  // console.log(typeAttribute);
  // console.log(backOrder);

  const handleAddButton = (e, index) => {
    // console.log(i);
    let flag = false;
    if (listWeight.length) {
      const newArr = [...listWeight];

      newArr.map((items) => {
        if (items.index == index) {
          flag = true;
          // console.log("find", items);
          items.weight = weight;

          // console.log("newList", newArr);
          return setlistWeight(newArr);
        }
      });
      if (!flag) {
        return setlistWeight((prev) => [...prev, { weight, index }]);
      }
    } else {
      // console.log("new added");
      setlistWeight((prev) => [...prev, { weight, index }]);
    }
  };

  // console.log("images", images);
  // console.log("list", combinationImage);

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
                        {/* <Textarea
                          height={"200px"}
                          type="text"
                          placeholder="Product Short Description"
                          {...register("short_description", {
                            required: true,
                            maxLength: 1000,
                          })}
                          // my="1rem"
                        /> */}
                        <Texteditor
                          isposted={ispost}
                          setText={setshortDescription}
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
                        {/* <Textarea
                          height={"300px"}
                          type="text"
                          placeholder="Product Long Description"
                          {...register("long_description", {
                            required: true,
                            maxLength: 1000,
                          })}
                          // my="1rem"
                        /> */}
                        <Texteditor
                          isposted={ispost}
                          setText={setlongDescription}
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
                          w={"100%"}
                          {...register("slug", {
                            // required: true,
                          })}
                        >
                          <option value="">Select Product Sub-category</option>
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

  try {
    const res = await Attribute.find({});
    const posts = await JSON.parse(JSON.stringify(res));
    // console.log(posts);
    return {
      props: { attrubutes: posts }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
  }
}
