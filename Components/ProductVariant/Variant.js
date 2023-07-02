import {
  Button,
  Flex,
  FormLabel,
  Heading,
  RadioGroup,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Radio,
  Text,
  useToast,
  Input,
  CloseButton,
  Image,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
// import { DropVariant } from "../DropVariant";
import { SelectAttributes } from "../SelectAttributes";
import { AiFillPicture } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";

export const Variant = ({
  setvariants,
  variants,
  attrubutes,
  register,
  setValue,
  reset,
  setCombination,
  setAttriName,
  loading,
  //for edit product
  productCombination,
  productAttributes,
  productAttributesValue,
}) => {
  const selectAttribute = useRef();
  const [combinationList, setCombinationList] = useState([]);
  const [attributeValue, setattributeValue] = useState([]);
  const [finalCombination, setfinalCombination] = useState(
    productCombination ? productCombination : []
  );
  const [categoryImage, setCategoryImages] = useState([]);
  const [disableButton2, setdisableButton2] = useState(false);
  const toast = useToast();

  // console.log("final", finalCombination);

  const handleGetValue = () => {
    if (selectAttribute.current.value != "") {
      let filterAttributeValue;

      // console.log(
      //   selectAttribute.current.value,
      //   typeof selectAttribute.current.value
      // );
      if (attributeValue.length > 0) {
        const result = attributeValue.some((items) => {
          return items.name == selectAttribute.current.value;
        });
        // console.log("result", !result);

        if (!result) {
          filterAttributeValue = attrubutes.filter(
            (items) => items.name === selectAttribute.current.value
          );
          // console.log("value2", filterAttributeValue[0].name);
          setAttriName((prevArray) => [
            ...prevArray,
            filterAttributeValue[0].name,
          ]);
          setattributeValue((prevArray) => [
            ...prevArray,
            filterAttributeValue[0],
          ]);
        } else {
          toast({
            title: "attribute already added",

            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        filterAttributeValue = attrubutes.filter(
          (items) => items.name === selectAttribute.current.value
        );
        // console.log("value", filterAttributeValue[0].name);
        setattributeValue((prevArray) => [
          ...prevArray,
          filterAttributeValue[0],
        ]);
        setAttriName((prevArray) => [
          ...prevArray,
          filterAttributeValue[0].name,
        ]);
      }
    } else {
      return;
    }
  };

  function handleAttributeChange(index, values) {
    setCombinationList((prevCombinationList) => {
      const updatedCombinationList = [...prevCombinationList];
      updatedCombinationList[index] = values;
      return updatedCombinationList;
    });
    setCombination((prevCombinationList) => {
      const updatedCombinationList = [...prevCombinationList];
      updatedCombinationList[index] = values;
      return updatedCombinationList;
    });
  }
  // console.log("combination List", combinationList);

  const handleFilter = (id, index) => {
    console.log(id, index);
    const filterArray = attributeValue.filter((items) => {
      return items._id != id;
    });
    // console.log("filter", filterArray);

    setattributeValue(filterArray);

    const attributeNames = filterArray.map((item) => item.name);
    setAttriName(attributeNames);

    // console.log(filterArray, combinationList);

    // let filteredArray = combinationList.filter((arr) => arr.length > 0);
    let filteredArray2 = combinationList
      .slice(0, index)
      .concat(combinationList.slice(index + 1));
    // let filteredArray2 = combinationList.splice(index, 1);
    // console.log("filterArray", filteredArray2);
    setCombinationList(filteredArray2);
    setCombination(filteredArray2);
  };

  const generateCombination = () => {
    setdisableButton2(true);
    const combinations = [];
    // console.log("combination", combinationList);

    generateCombinations(combinationList, 0, [], "", "", "", combinations);
    // const combinations = generateCombinations(combinationList);
    // console.log("after combination", combinations);
    setfinalCombination(combinations);
    setdisableButton2(false);

    toast({
      title: "combination generated successfully",

      status: "success",
      duration: 2000,
      isClosable: true,
    });
    // console.log("combination", combinations);
  };

  function generateCombinations(
    arrays,
    index = 0,
    current = [],
    weight = "",
    price = "",
    image = "",
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

  const handleReset = () => {
    setattributeValue([]);
    setCombinationList([]);
    setfinalCombination([]);
    reset();
    setCategoryImages([]);
  };

  const handleImageUpload = (event, index) => {
    // setdisableButton2(true);
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
        // setdisableButton2(false);
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
        // setdisableButton2(false);
      });
  };

  const handleImageDel = (index) => {
    setValue(`combinationList.${index}.image`, "");
    setCategoryImages((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews[index] = null;
      return newPreviews;
    });
  };

  const updateFields = () => {
    // console.log("finalcombination set", finalCombination);
    setValue("combinationList", []);

    finalCombination.forEach((combination, index) => {
      setValue(
        `combinationList[${index}].combination`,
        combination.combination
      );
      setValue(`combinationList[${index}].weight`, combination.weight);
      setValue(`combinationList[${index}].price`, combination.price);
      setValue(`combinationList[${index}].image`, "");
    });
  };

  useEffect(() => {
    updateFields();
  }, [finalCombination]);

  useEffect(() => {
    if (productAttributes) {
      // const array = productAttributes.map((items) => {
      //   return attrubutes.filter((list) => {
      //     return list.name == items;
      //   });
      // });

      const filteredArray1 = attrubutes.filter((subArray) => {
        const propertyName = subArray.name;
        return productAttributes.includes(propertyName);
      });

      // console.log("filter array", filteredArray1);
      setattributeValue(filteredArray1);

      // for (let i = 0; i < productAttributes.length; i++) {
      //   if(productAttributes[i])

      // }

      // console.log("attribute items", array, productAttributesValue);
      // setattributeValue(array);
    }
    // if (productAttributesValue) {
    // }
  }, [productCombination, productAttributes]);

  // useEffect(() => {
  //   if (productCombination) {
  //     setfinalCombination(productCombination);
  //   }
  // }, []);

  useEffect(() => {
    if (productCombination == null) {
      setCombinationList([]);
      setfinalCombination([]);
      setCategoryImages([]);
      setattributeValue([]);
      reset();
    }
  }, [loading]);

  useEffect(() => {
    if (productCombination) {
      let temp = [];
      productCombination.map((images, index) => {
        if (images.image) {
          temp.push(images.image);
        } else {
          temp.push("");
        }
      });
      console.log("temp", temp);
      setCategoryImages(temp);
    }
  }, []);

  // console.log("data", attributeValue, productAttributes);

  return (
    <React.Fragment>
      <Flex
        mt={"2rem"}
        width={"100%"}
        align="center"
        direction={"column"}
        // border={"1px"}
      >
        <Flex
          justify={"start"}
          direction={"column"}
          align={"start"}
          width={"90%"}
        >
          <FormLabel fontWeight={"semibold"} fontSize={"1.2rem"}>
            Do You Want To Add Variants ?
          </FormLabel>
          <RadioGroup my={"1rem"} onChange={setvariants} value={variants}>
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
              position={"relative"}
              border={"1px"}
              borderColor="gray.400"
              width="100%"
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
                      <Flex justify={"center"} gap="1rem" wrap={"wrap"}>
                        <Select
                          ref={selectAttribute}
                          w={"50%"}
                          placeholder="Select Attributes"
                        >
                          {attrubutes &&
                            attrubutes.map((items) => {
                              return (
                                <option key={items.name} value={items.name}>
                                  {items.name}
                                </option>
                              );
                            })}
                        </Select>
                        <Button
                          colorScheme="green"
                          onClick={() => handleGetValue()}
                        >
                          Add attribute
                        </Button>
                        <Button colorScheme="red" onClick={() => handleReset()}>
                          reset
                        </Button>
                      </Flex>
                    </Box>
                    <Flex
                      direction={"column"}
                      justify={"center"}
                      align={"center"}
                      mt="2rem"
                      gap={"1rem"}
                    >
                      {attributeValue &&
                        attributeValue.map((items, index) => {
                          // console.log("items", items);
                          return (
                            <Flex
                              width={"100%"}
                              justify={"center"}
                              key={index}
                              gap="1rem"
                            >
                              <Text
                                fontWeight={"semibold"}
                                fontSize={"1.2rem"}
                                textTransform={"capitalize"}
                              >
                                {items.name}
                              </Text>
                              <SelectAttributes
                                data={items.values}
                                onAttributeChange={handleAttributeChange}
                                index={index}
                                setProductData={
                                  productAttributesValue
                                    ? productAttributesValue[index]
                                    : null
                                }
                                combinationList={combinationList[index]}
                              />
                              <Button
                                colorScheme="red"
                                onClick={() => handleFilter(items._id, index)}
                              >
                                Remove
                              </Button>
                            </Flex>
                          );
                        })}

                      {combinationList.length > 0 && (
                        <Button
                          isLoading={disableButton2}
                          disabled={disableButton2}
                          spinnerPlacement="end"
                          loadingText="generating"
                          colorScheme="purple"
                          onClick={() => generateCombination()}
                        >
                          Generate all possible Variants
                        </Button>
                      )}
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Box width={"100%"}>
                      {finalCombination ? (
                        <>
                          {finalCombination.map((field, index) => {
                            // console.log(field);
                            return (
                              <Flex
                                key={`${field.id}-${index}`}
                                justify="center"
                                gap={"4rem"}
                                my="4rem"
                                align={"center"}
                              >
                                <Flex gap={"4rem"}>
                                  <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                      disabled={true}
                                      // color={"black"}
                                      _disabled={{
                                        color: "black",
                                        border: "1px",
                                        borderColor: "gray.300",
                                      }}
                                      // defaultValue={field.combination}
                                      {...register(
                                        `combinationList.${index}.combination`
                                      )}
                                    />
                                  </FormControl>

                                  <FormControl>
                                    <FormLabel>Weight</FormLabel>
                                    <NumberInput max={50.01} min={0.15}>
                                      <NumberInputField
                                        {...register(
                                          `combinationList.${index}.weight`
                                        )}
                                        // defaultValue={field.weight}
                                      />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                  </FormControl>

                                  <FormControl>
                                    <FormLabel>Amount</FormLabel>
                                    <NumberInput max={750.0} min={2.0}>
                                      <NumberInputField
                                        {...register(
                                          `combinationList.${index}.price`
                                        )}
                                        // defaultValue={field.price}
                                      />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                  </FormControl>

                                  <label htmlFor={`image-${index}`}>
                                    <FormControl position={"relative"}>
                                      <FormLabel>picture</FormLabel>
                                      <BiImageAdd
                                        size={"3rem"}
                                        cursor={"pointer"}
                                      />
                                    </FormControl>

                                    <Input
                                      // width={"25%"}
                                      type="file"
                                      // name="photos"
                                      onChangeCapture={(event) =>
                                        handleImageUpload(event, index)
                                      }
                                      cursor={"pointer"}
                                      display={"none"}
                                      accept="image/png , image/jpeg, image/webp"
                                      // required={true}
                                      id={`image-${index}`}
                                      {...register(
                                        `combinationList.${index}.image`
                                      )}
                                      // defaultValue={field.image}
                                    />
                                  </label>
                                </Flex>
                                <Flex
                                  gap="2rem"
                                  // margin={"2rem"}
                                  // border={"1px"}
                                  position={"relative"}
                                >
                                  {categoryImage[index] && (
                                    <>
                                      <Box
                                        border={"1px"}
                                        // w={"100%"}
                                        borderColor={"gray.200"}
                                        // pos={"absolute"}
                                        // right={"-2rem"}
                                        // top={"0rem"}
                                        key={index}
                                      >
                                        <Image
                                          border={"1px"}
                                          borderColor={"gray.300"}
                                          width={"100px"}
                                          height={"100px"}
                                          src={categoryImage[index]}
                                          alt="images"
                                        />
                                        <CloseButton
                                          // border={"1px"}
                                          // borderColor={"gray.200"}
                                          bg="red.400"
                                          borderRadius={"40px"}
                                          // colorScheme="red"
                                          // color={"blue"}
                                          zIndex={"9999"}
                                          position={"absolute"}
                                          top={"-1rem"}
                                          right="-1rem"
                                          onClick={() => handleImageDel(index)}
                                        />
                                      </Box>
                                    </>
                                  )}
                                  {/* {productCombination[index] && (
                                    <>
                                      <Flex direction={"column"}>
                                        <Image
                                          src={productCombination[index].image}
                                          alt="preview"
                                          width={100}
                                          height={100}
                                        />
                                        <Button
                                          width={"100%"}
                                          colorScheme="red"
                                          size="sm"
                                          borderRadius={"none"}
                                          onClick={() => handleImageDel(index)}
                                        >
                                          Delete
                                        </Button>
                                      </Flex>
                                    </>
                                  )} */}
                                </Flex>
                              </Flex>
                            );
                          })}
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
        ) : null}
      </Flex>
    </React.Fragment>
  );
};
