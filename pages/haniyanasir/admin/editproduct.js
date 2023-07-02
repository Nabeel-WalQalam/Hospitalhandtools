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
import crypto from "crypto";
import { AiFillPicture } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import dbConnect from "@/Middleware/connectDb";
import Product from "@/models/Product";

// import { Varinats } from "@/Components/Varinats";

export default function Editproduct({ product }) {
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
  const [finalCombinations, setfinalCombinations] = useState([]);
  const [combinationImage, setcombinationImage] = useState([]);
  const [combinationimageselected, setcombinationimageselected] = useState([]);
  const [backOrder, setbackOrder] = useState("false");
  const [priceType, setpriceType] = useState(product.priceType);
  const [variants, setvariants] = useState(product.variants);
  const [shortDescription, setshortDescription] = useState(
    product && product.short_description
  );
  const [longDescription, setlongDescription] = useState(
    product && product.long_description
  );
  const [ispost, setispost] = useState(false);

  const [images, setImages] = useState([]);
  const [categoryImage, setCategoryImages] = useState([]);

  // console.log("images", images);

  const handleUpload = (imageUrl) => {
    setUploadedImages((prevImages) => [...prevImages, imageUrl]);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Variant: [product.options && product.options.map((item) => item)],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "combinationList",
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
      setTags(product.tags);
      setCombinations(product.options);
      setImages(product.image);
      setbackOrder(product.backOrder ? "true" : "false");
      setvariants(product.variants);
      // setfinalCombinations(product);
      // setshortDescription(ReactHtmlParser(product.short_description));
      product.options &&
        setValue(
          "Variant",
          product.options.map((item, INDEX) => item)
        );
    }
  }, [product, setValue, filterCategory]);

  const [tagss, setTagss] = useState([]);

  const onSubmit = async (data) => {
    // console.log("send data", data);
    // setdisableButton2(true);
    const filteredArray = combinations.filter(function (arr) {
      return arr.length > 0;
    });
    // console.log(filteredArray);

    // console.log(data, tags);
    // // console.log(data.combinationList);
    // console.log(shortDescription, longDescription);
    // console.log(backOrder, priceType, variants, images);

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
    //       combination: filteredArray,
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
    //   setfinalCombinations([]);
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
    //   setfinalCombinations([]);
    //   setSelectedImages([]);
    //   setispost(true);
    //   setdisableButton2(false);
    // }
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

  useEffect(() => {
    // Update the default values when the finalCombinations array changes
    reset({
      combinationList: finalCombinations.map((combination) => ({
        combination: combination.combination,
        weight: "",
        price: "",
        image: "",
      })),
    });
  }, [finalCombinations, reset]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  // console.log("tages", tags);

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

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  // console.log("allAttr", allAttribute);

  // console.log("getlist of size for combination", getSizeList, getTypeList);

  useEffect(() => {
    if (getSizeList.length || getTypeList.length || getColorList.length) {
      setCombinations([
        getSizeList ? getSizeList : null,
        getTypeList ? getTypeList : null,
        getColorList ? getColorList : null,
      ]);
    }
  }, [getSizeList, getTypeList, getColorList]);
  // console.log("combination ", combinations);

  //get Combinations

  function generateCombinations(
    arrays,
    index = 0,
    current = [],
    weight = "",
    price = "",
    image = null,
    result = []
  ) {
    if (index === arrays.length) {
      result.push({ combination: current.join("-"), weight, price, image });
      return;
    }

    for (let i = 0; i < arrays[index].length; i++) {
      const element = arrays[index][i];
      const newCurrent = current.concat(element);
      generateCombinations(
        arrays,
        index + 1,
        newCurrent,
        weight,
        price,
        image,
        result
      );
    }
  }
  useEffect(() => {
    if (combinations.length) {
      const combinationss = [];
      const combinedArrays = combinations.filter((arr) => arr.length !== 0);

      generateCombinations(combinedArrays, 0, [], "", "", null, combinationss);
      // console.log("combinationss", combinationss);
      setfinalCombinations(combinationss);
    }
  }, [combinations]);

  const handleImageUpload = (event, index) => {
    setdisableButton2(true);
    // console.log("run", index);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mbqw8fjf"); // Replace with your Cloudinary upload preset

    fetch("https://api.cloudinary.com/v1_1/dexc7zdm4/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setCategoryImages((prevImageUrls) => {
          const newImageUrls = [...prevImageUrls];
          newImageUrls[index] = data.url;
          return newImageUrls;
        });
        setValue(`combinationList.${index}.image`, "");
        setValue(`combinationList.${index}.image`, data.url);
        // setCategoryImages((prevImages) => [...prevImages, data]);
        setdisableButton2(false);
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
        setdisableButton2(false);
      });
  };
  // console.log("images", images);
  // console.log("list", combinationImage);

  const generateSHA1 = (data) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const handleImageDel = (index) => {
    setValue(`combinationList.${index}.image`, "");
    setCategoryImages((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews[index] = null;
      return newPreviews;
    });
  };

  const handleImageDelete = async (Public_id, signature2, id, deleteToken) => {
    setdisableButton2(true);
    const timestamp = new Date().getTime();
    const Latestsignature = generateSHA1(
      generateSignature(Public_id, "cE_mxtg1AcfO-3q8A84vGy0v2Kg")
    );
    try {
      await fetch(`https://api.cloudinary.com/v1_1/dexc7zdm4/image/destroy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: Public_id,
          signature: Latestsignature,
          api_key: "196271779257317",
          timestamp: timestamp,
        }),
      });

      setImages((prevImages) => prevImages.filter((image) => image.id !== id));
      // setCategoryImages((prevImages) =>
      //   prevImages.filter((image) => image.id !== id)
      // );

      // setValue(`subCategory.${index}.image`, "");
      setdisableButton2(false);
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  return (
    <>
      <Box
        width={"100%"}
        // height="100vh"
        bg={"gray.200"}
      >
        <Box bg={"gray.300"} p="0.2rem">
          <Center>
            <Heading color={"#153A5B    "}>Edit Products</Heading>
          </Center>
        </Box>

        <Flex
          align={"center"}
          direction="column"
          border={"1px"}
          borderColor="gray.200"
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
                          w={"100%"}
                          {...register("slug", {
                            // required: true,
                          })}
                          value={product.category}
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
                    <Box
                      border={"1px"}
                      p={"1rem"}
                      borderColor={"gray.300"}
                      borderRadius={"9px"}
                    >
                      <FormLabel fontSize={"1.5rem"}>
                        Add Products-Tags
                      </FormLabel>
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

                    <Flex
                      width={"100%"}
                      align="center"
                      direction={"column"}
                      // border={"1px"}
                    >
                      <Flex
                        justify={"start"}
                        direction={"column"}
                        align={"start"}
                        // border={"1px"}
                        width={"80%"}
                      >
                        <FormLabel fontWeight={"semibold"} fontSize={"1.2rem"}>
                          Do You Want To Add Variants ?{" "}
                        </FormLabel>
                        <RadioGroup
                          my={"1rem"}
                          onChange={setvariants}
                          value={variants}
                        >
                          <Stack direction="row" gap={"1rem"}>
                            <Radio size={"lg"} value="yes">
                              yes
                            </Radio>
                            <Radio size={"lg"} value="no">
                              no
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </Flex>

                      {variants === "yes" ? (
                        <>
                          <Heading my={"1rem"} size={"lg"} color="#153A5B">
                            Add Varients
                          </Heading>
                          <Box
                            border={"1px"}
                            borderColor="gray.400"
                            width="80%"
                          >
                            <Tabs>
                              <TabList>
                                <Tab>Select Attribute </Tab>
                                <Tab>Variations</Tab>
                                {/* <Tab>Three</Tab> */}
                              </TabList>

                              <TabPanels>
                                <TabPanel>
                                  <Box>
                                    <Flex justify={"center"} gap="5rem">
                                      <Select
                                        ref={selectAttribute}
                                        w={"50%"}
                                        placeholder="Select Attributes"
                                      >
                                        <option
                                          disabled={AttributeName.includes(
                                            "size"
                                          )}
                                          value={"size"}
                                        >
                                          Size
                                        </option>
                                        <option
                                          disabled={AttributeName.includes(
                                            "type"
                                          )}
                                          value={"type"}
                                        >
                                          Type
                                        </option>
                                        <option
                                          disabled={AttributeName.includes(
                                            "color"
                                          )}
                                          value={"color"}
                                        >
                                          Color
                                        </option>
                                      </Select>
                                      {AttributeName.includes(
                                        "color" || "size" || "type"
                                      ) ? (
                                        <Button
                                          onClick={() => handleAttribute()}
                                          colorScheme={"green"}
                                          // isDisabled={disableButton}
                                          disabled={true}
                                        >
                                          Add Attribut
                                        </Button>
                                      ) : (
                                        <Button
                                          // disabled={true}
                                          onClick={() => handleAttribute()}
                                          colorScheme={"green"}
                                          // isDisabled={true}
                                          isDisabled={disableButton}
                                        >
                                          Add Attribut
                                        </Button>
                                      )}
                                    </Flex>
                                    <Box>
                                      <Text my={"1rem"}>
                                        List of Attributes that Selected
                                      </Text>
                                      <Flex
                                        // border={"1px"}
                                        direction={"column"}
                                        // justify={"center"}
                                        gap="1rem"
                                      >
                                        <Flex
                                          align={"center"}
                                          justify={"center"}
                                          gap="1rem"
                                          wrap={"wrap"}
                                          // border="1px"
                                        >
                                          {sizeAttribute.length ? (
                                            <Flex
                                              justify={"center"}
                                              // border={"1px"}
                                              w={"100%"}
                                              gap={"2rem"}
                                              align="center"
                                            >
                                              <Flex
                                                justify={"center"}
                                                align={"center"}
                                                width="70%"
                                                gap={"0.5rem"}
                                              >
                                                <Text>Select Size :</Text>
                                                <AddAttributes
                                                  setSizeList={setgetSizeList}
                                                  data={sizeAttribute}
                                                />
                                              </Flex>
                                            </Flex>
                                          ) : (
                                            ""
                                          )}

                                          {typeAttribute.length ? (
                                            <Flex
                                              justify={"center"}
                                              // border={"1px"}
                                              w={"100%"}
                                              gap={"2rem"}
                                              align="center"
                                            >
                                              <Flex
                                                justify={"center"}
                                                align={"center"}
                                                width="70%"
                                                gap={"0.5rem"}
                                              >
                                                <Text>Select Type :</Text>
                                                <AddAttributes
                                                  setSizeList={setgetTypeList}
                                                  data={typeAttribute}
                                                />
                                              </Flex>
                                            </Flex>
                                          ) : (
                                            ""
                                          )}

                                          {colorAttribute.length ? (
                                            <Flex
                                              justify={"center"}
                                              // border={"1px"}
                                              w={"100%"}
                                              gap={"2rem"}
                                              align="center"
                                            >
                                              <Flex
                                                justify={"center"}
                                                align={"center"}
                                                width="70%"
                                                gap={"0.5rem"}
                                              >
                                                <Text>Select Color :</Text>
                                                <AddAttributes
                                                  setSizeList={setgetColorList}
                                                  data={colorAttribute}
                                                />
                                              </Flex>
                                            </Flex>
                                          ) : (
                                            ""
                                          )}

                                          {/* <Box w={"100%"}>
                                      <AddAttributes data={sizeAttribute} />
                                    </Box> */}
                                        </Flex>
                                      </Flex>
                                    </Box>
                                  </Box>
                                </TabPanel>
                                <TabPanel>
                                  <Box width={"100%"}>
                                    {finalCombinations.length ? (
                                      <>
                                        {/* <Text>All Combination</Text> */}
                                        {finalCombinations.map(
                                          (field, index) => {
                                            return (
                                              <Flex
                                                key={`${field.id}-${index}`}
                                                justify="center"
                                                gap={"1.5rem"}
                                                my="1rem"
                                                align={"center"}
                                              >
                                                <label
                                                  htmlFor={`combination-${index}`}
                                                >
                                                  Combination
                                                </label>
                                                <Input
                                                  disabled={true}
                                                  _disabled={{
                                                    color: "black",
                                                    border: "none",
                                                  }}
                                                  width={"20%"}
                                                  type="text"
                                                  id={`combination-${index}`}
                                                  {...register(
                                                    `combinationList.${index}.combination`
                                                  )}
                                                  defaultValue={
                                                    field.combination
                                                  }
                                                />

                                                <label
                                                  htmlFor={`weight-${index}`}
                                                >
                                                  Weight
                                                </label>
                                                <Input
                                                  width={"20%"}
                                                  type="number"
                                                  step={0.1}
                                                  id={`weight-${index}`}
                                                  {...register(
                                                    `combinationList.${index}.weight`
                                                  )}
                                                  defaultValue={field.weight}
                                                />

                                                <label
                                                  htmlFor={`price-${index}`}
                                                >
                                                  Price
                                                </label>
                                                <Input
                                                  width={"20%"}
                                                  type="number"
                                                  step={0.01}
                                                  id={`price-${index}`}
                                                  {...register(
                                                    `combinationList.${index}.price`
                                                  )}
                                                  defaultValue={field.price}
                                                />

                                                <label
                                                  htmlFor={`image-${index}`}
                                                >
                                                  {/* image 📷 */}
                                                  <AiFillPicture
                                                    size={"3rem"}
                                                    cursor={"pointer"}
                                                  />

                                                  <Input
                                                    // width={"25%"}
                                                    type="file"
                                                    // name="photos"
                                                    onChangeCapture={(event) =>
                                                      handleImageUpload(
                                                        event,
                                                        index
                                                      )
                                                    }
                                                    cursor={"pointer"}
                                                    display={"none"}
                                                    accept="image/png , image/jpeg, image/webp"
                                                    required={true}
                                                    id={`image-${index}`}
                                                    {...register(
                                                      `combinationList.${index}.image`
                                                    )}
                                                    defaultValue={field.image}
                                                  />
                                                </label>
                                                <Flex
                                                  gap="1rem"
                                                  margin={"2rem"}
                                                  position={"relative"}
                                                >
                                                  {categoryImage[index] && (
                                                    <Box
                                                      border={"1px"}
                                                      // w={"100%"}
                                                      pos={"relative"}
                                                      left={"0px"}
                                                      key={index}
                                                    >
                                                      <Image
                                                        border={"1px"}
                                                        borderColor={"gray.300"}
                                                        width={"150px"}
                                                        height={"100px"}
                                                        src={
                                                          categoryImage[index]
                                                        }
                                                        alt="images"
                                                      />
                                                      <CloseButton
                                                        // border={"1px"}
                                                        // borderColor={"gray.200"}
                                                        bg="gray.100"
                                                        // color={"blue"}
                                                        zIndex={"9999"}
                                                        position={"absolute"}
                                                        top={"0px"}
                                                        right="0rem"
                                                        onClick={() =>
                                                          handleImageDel(index)
                                                        }
                                                      />
                                                    </Box>
                                                  )}
                                                </Flex>
                                              </Flex>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      "Select Attribute First"
                                    )}
                                  </Box>
                                </TabPanel>
                              </TabPanels>
                            </Tabs>
                          </Box>
                        </>
                      ) : (
                        ""
                      )}
                    </Flex>
                  </Flex>
                  {/* <label className="Plabel">
                    + Add Images
                    <br />
                    <Input
                      className="Pinput"
                      type="file"
                      name="images"
                      onChange={onSelectFile}
                      // multiple
                      accept="image/png , image/jpeg, image/webp"
                    />
                  </label> */}
                  {/* <Box p={"1rem"}>
                    <section className="Psection">
                      <FormLabel fontSize={"1.5rem"}>
                        Add Products-Images
                      </FormLabel>
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
                        justify="center"
                        gap={"1.5rem"}
                        my="1rem"
                        wrap={"wrap"}
                        // className="images"
                      >
                        {selectedImages &&
                          selectedImages.map((image, index) => {
                            return (
                              <Flex
                                border={"1px"}
                                borderColor="gray.300"
                                // height={"160px"}
                                key={image}
                                // className="image"
                                direction={"column"}
                              >
                                <Image
                                  className="img"
                                  src={image}
                                  height={100}
                                  width={150}
                                  alt="upload"
                                />
                                <Flex
                                  my={"0.2rem"}
                                  // border={"1px"}
                                  justify={"center"}
                                  align="center"
                                >
                                  <Button
                                    colorScheme={"red"}
                                    onClick={() => deleteHandler(image, index)}
                                  >
                                    delete image
                                  </Button>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Flex>

                     
                    </section>
                  </Box> */}
                  <Flex
                    justify={"space-between"}
                    w={"70%"}
                    mx="auto"
                    // gap={"1rem"}
                    direction={"column"}
                    marginY={"1rem"}
                    // border={"1px"}
                    align={"center"}
                    borderColor={"gray.400"}
                    // p="1rem"
                    marginTop={"2rem"}
                  >
                    <Heading
                      color={"#153A5B"}
                      size={"lg"}
                      marginBottom={"0.5rem"}
                    >
                      Upload Product Images
                    </Heading>
                    <CloudinaryUploader setImages2={setImages} />
                    <Flex gap="1rem" margin={"2rem"}>
                      {images.length != 0
                        ? images.map((items) => (
                            <Box position={"relative"} key={items.id}>
                              <Image
                                border={"1px"}
                                borderColor={"gray.300"}
                                width={"150px"}
                                height={"150px"}
                                src={items.url}
                                alt="images"
                              />
                              <CloseButton
                                // border={"1px"}
                                // borderColor={"gray.200"}
                                bg="gray.100"
                                // color={"blue"}
                                zIndex={"9999"}
                                position={"absolute"}
                                top={"0px"}
                                right="0rem"
                                onClick={() =>
                                  handleImageDelete(
                                    items.public_id,
                                    items.signature,
                                    items.id,
                                    items.delete_token,
                                    null
                                  )
                                }
                              />
                            </Box>
                          ))
                        : null}
                    </Flex>
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
