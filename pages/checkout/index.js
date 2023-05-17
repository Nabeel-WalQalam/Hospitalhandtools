import React, { useState, useEffect, useRef } from "react";
import { AiFillBank } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { CLIENT_ID } from "@/config/config";

import { useForm } from "react-hook-form";

import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Thead,
  Td,
  Tr,
  Th,
  Tbody,
  useDisclosure,
  FormLabel,
  FormControl,
  Input,
  Select,
  ListItem,
  List,
  ListIcon,
  Tooltip,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  CloseButton,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import secureLocalStorage from "react-secure-storage";

//latest
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  setCart,
} from "@/store/cartSlice";
import { BsTelephone } from "react-icons/bs";
import { MdLocationCity } from "react-icons/md";
import { BiUser } from "react-icons/bi";

export default function Index() {
  const cart = useSelector((state) => state.cart.cart);
  let totalWeight = 0;
  const cancelRef = useRef();
  const toast = useToast();
  const Router = useRouter();
  const [getCountry, setgetCountry] = useState([]);
  const [CountryState, setCountryState] = useState([]);
  const [CountryState2, setCountryState2] = useState([]);
  const [countryId, setcountryId] = useState("");
  const [countryId2, setcountryId2] = useState("");
  const [check, setcheck] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scriptLoaded, setscriptLoaded] = useState(false);
  const [paidfor, setpaidfor] = useState(false);
  const [error, seterror] = useState(null);
  const [disablePaypalBtn, setdisablePaypalBtn] = useState(true);
  const [oID, setoId] = useState("");
  const [zone, setzone] = useState("");
  const [getZoneData, setgetZoneData] = useState([]);
  const [totalWeigth, settotalWeigth] = useState(0);
  const [totalWeightPrice, settotalWeightPrice] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const [allCoupens, setallCoupens] = useState([]);
  const [UserCoupen, setUserCoupen] = useState("");
  const [GranPrice, setsetGranPrice] = useState(0);
  // const [{ isPending }] = usePayPalScriptReducer();

  //latest
  const [subTotal, setsubTotal] = useState(0);
  const [weight, setweight] = useState(0);
  const [total, settotal] = useState(0.0);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [BLOADING, setBLOADING] = useState(false);
  const [orderLoading, setorderLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoTimeOrder, settwoTimeOrder] = useState(0);

  // console.log("zon", getZoneData.weights);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (twoTimeOrder > 1) {
      console.log("run");
      localStorage.removeItem("cart");
      dispatch(setCart([]));
      Router.push("/");
    }
  }, [twoTimeOrder]);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      if (cart.length != 0) {
        try {
          const cartLength = JSON.parse(localStorage.getItem("cart"));
          // console.log(cartLength.length);
        } catch (error) {
          console.log(error);
          localStorage.clear();
          Router.push("/");
        }
      } else {
        Router.push("/");
      }
    } else {
      Router.push("/");
    }
  }, [cart, removeItem]);

  const onSubmit1 = async (data) => {
    console.log("hi");
    setBLOADING(true);

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
        orderId: oID,
        cart: cart,
        user: user ? user : null,
        subtotal: subTotal ? subTotal : null,
        payment: "PAYPAL",

        grandTotal: total ? total : null,
        WeightPrice: totalWeightPrice ? totalWeightPrice : null,
        isCoupenApplid: GranPrice ? true : false,
        discountPrice: GranPrice,
        coupenUsed: UserCoupen ? UserCoupen : null,
      }),
    };
    try {
      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/generateOrder`,
        settings
      );
      const data = await fetchResponse.json();
      // console.log(data);
      if (data.success) {
        setBLOADING(false);
        onOpen();
      } else {
        localStorage.clear();
        toast({
          title: "Error Occured!.",
          description: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setBLOADING(false);
        Router.push("/");
      }
    } catch (e) {
      localStorage.clear();
      setBLOADING(false);
      return e;
    }
  };

  //for normal bank***
  const onSubmit2 = async (data) => {
    setBLOADING(true);

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
        orderId: oID,
        cart: cart,
        user: user ? user : null,
        subtotal: subTotal ? subTotal : null,
        payment: "BANK",

        grandTotal: total ? total : null,
        WeightPrice: totalWeightPrice ? totalWeightPrice : null,
        isCoupenApplid: GranPrice ? true : false,
        discountPrice: GranPrice,
        coupenUsed: UserCoupen ? UserCoupen : null,
      }),
    };
    try {
      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/generateOrder`,
        settings
      );
      const data = await fetchResponse.json();
      console.log("responce", data);
      if (data.success) {
        toast({
          title: "Congratulation",
          description: "your Order has place successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        Router.push(`/order?orderId=${data.Orders._id}`);
        setBLOADING(false);
      } else {
        localStorage.clear();
        toast({
          title: "Error Occured!.",
          description: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setBLOADING(false);
        Router.push("/");
      }
    } catch (e) {
      localStorage.clear();
      setBLOADING(false);
      return e;
    }
  };

  useEffect(() => {
    const country = async () => {
      try {
        const res = await fetch(`/api/getCountry`);
        const con = await res.json();
        //   console.log(con);
        setgetCountry(await con);
      } catch (error) {
        console.log(error);
      }
    };

    country();
  }, []);

  const handleCountry = async (e) => {
    setcountryId(e.target.value);

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: e.target.value,
      }),
    };
    try {
      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getZone`,
        settings
      );
      const data = await fetchResponse.json();
      // console.log("resonce", data);
      setgetZoneData(data.Zone);
    } catch (e) {
      return e;
    }

    // console.log(e.target.value);
  };

  const handleCountry2 = (e) => {
    setcountryId2(e.target.value);
  };

  useEffect(() => {
    const States = async () => {
      const res = await fetch(`/api/getCountry`);
      const con = await res.json();
      // console.log(countryId, con);

      con.map((data) => {
        if (data.country_name === countryId) {
          totalWeight = 0;
          // settotalWeightPrice(0);
          setzone(data.zone);
          setCountryState(data.states);
        } else if (data.country_name === countryId2) {
          setCountryState2(data.states);
        }
        // console.log(countryId);
        // console.log(data.states);
      });
    };
    States();
  }, [countryId, countryId2]);
  // console.log(CountryState);

  const handleForm = (e) => {
    e.preventDefault();
  };

  // console.log(billingField, shippingField);

  const handleApprove = (orderId) => {
    setpaidfor(true);
  };

  // if (paidfor) {
  //   alert("thanks for purchasing");
  // }
  if (error) {
    alert("error");
  }

  //orders submission

  const handleChecked = () => {
    setcheck(!check);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: secureLocalStorage.getItem("token"),
          }),
        }
      );
      const rsult = await response.json();
      // console.log(rsult.user);
      setValue("billinguserName", rsult.user.displayName);
      setValue("billingaddressName1", rsult.user.address);
      setValue("billingcityName", rsult.user.city);
      setValue("billingpostName", rsult.user.pincode);
      // setValue("billingcountryName", rsult.user.country);
      setValue("billingNumber", rsult.user.phonenumber);
      // setValue("billingstateName", rsult.user.state);

      // setuser("rsult.user.displayName");
    };

    if (secureLocalStorage.getItem("token")) {
      fetchUser();
    }
  }, []);

  //calculating weight Price

  useEffect(() => {
    if (getZoneData) {
      if (Object.keys(getZoneData).length)
        // console.log("weight Price", handleNumberinRange(weight));
        settotalWeightPrice(handleNumberinRange(weight));
    }
    // if (getZoneData) {

    // }
  }, [getZoneData, weight, countryId, subTotal]);
  // console.log("totalWeightPrice", totalWeightPrice);

  // console.log("weigth", totalWeight);

  const handleNumberinRange = (num) => {
    // const num = parseFloat(num2).toFixed(2);
    // console.log("run run run", num);
    console.log(
      getZoneData.weights[0].weight,
      getZoneData.weights[getZoneData.weights.length - 1].weight,
      num
    );
    // Check if the given number is less than the smallest number or greater than the largest number in the array
    if (
      num < parseFloat(getZoneData.weights[0].weight) ||
      num >
        parseFloat(getZoneData.weights[getZoneData.weights.length - 1].weight)
    ) {
      console.log("found1");
      return parseFloat(0).toFixed(2);
    }

    // console.log("length", getZoneData.weights.length);

    // Iterate over the array to find the range
    for (let i = 0; i < getZoneData.weights.length - 1; i++) {
      // console.log(getZoneData.weights[i]);
      if (
        num >= parseFloat(getZoneData.weights[i].weight) &&
        num < parseFloat(getZoneData.weights[i + 1].weight)
      ) {
        console.log("found2");
        // settotalWeigth(getZoneData.weights[i].price);
        return parseFloat(getZoneData.weights[i].price).toFixed(2);
      }
    }
    // console.log(getZoneData.weights[getZoneData.weights.length - 1].weight);
    // If the given number is equal to the last element in the array, then it's also in the range
    if (
      num ===
      parseFloat(getZoneData.weights[getZoneData.weights.length - 1].weight)
    ) {
      console.log("found3");
      return parseFloat(0).toFixed(2);
    }

    // If the number is not in the range, return false
    return parseFloat(0).toFixed(2);
  };

  //paypal

  useEffect(() => {
    const randomNumber =
      Math.floor(Math.random() * 900000000000) + 100000000000;
    setoId(randomNumber);
  }, []);

  const initialOptions = {
    "client-id": CLIENT_ID,
  };

  useEffect(() => {
    const getcoupens = async () => {
      const res = await fetch(`/api/getCoupens`);
      const con = await res.json();
      // console.log("coupens", con.getAll);
      if (con.getAll) {
        setallCoupens(con.getAll);
      }
    };
    getcoupens();
  }, []);

  const handleCopen = (e) => {
    allCoupens.map((items) => {
      if (items.coupen === UserCoupen) {
        // console.log(items.coupenAmount);
        let discountedAmount =
          (subTotal + parseInt(totalWeightPrice)) * (items.coupenAmount / 100);
        // console.log(discountedAmount);
        setsetGranPrice(discountedAmount);
        toast({
          title: "Coupen Applied Successfuly",

          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // setUserCoupen("");
      } else {
        setUserCoupen("");
        setsetGranPrice(0);
        toast({
          title: "Coupen Expired or Invalid",

          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  const handleCouponInput = (e) => {
    setUserCoupen(e.target.value);
  };

  // useEffect(() => {
  //   console.log("hi im from checkout page");
  // }, []);

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += 1;
    });
    return total;
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total = item.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    if (cart.length) {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        let stotal = cart[i].price * cart[i].quantity;
        total += stotal;
      }
      setsubTotal(parseFloat(total).toFixed(2));
    }
  }, [cart]);

  useEffect(() => {
    if (cart.length) {
      let weight = 0;
      for (let i = 0; i < cart.length; i++) {
        let stotal = cart[i].weight * cart[i].quantity;
        weight += stotal;
      }
      setweight(weight.toFixed(2));
    }
  }, [cart]);

  useEffect(() => {
    if (subTotal || totalWeight) {
      console.log(subTotal, typeof totalWeightPrice);
      // const tempPrice = parseFloat(subTotal).toFixed(2);
      settotal(parseFloat(subTotal) + parseFloat(totalWeightPrice));
    }
  }, [subTotal, countryId]);

  //paypal server

  return (
    <>
      {/* <Box bg={"#153A5B"} p="2rem">
        <Multiform
          cart={cart}
          subTotal={subTotal}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          addtoCart={addtoCart}
        />
      </Box> */}
      <Box>
        <Center bg={"#153A5B"}>
          <Heading color={"white"}>Quick Checkout</Heading>
        </Center>
      </Box>
      <form onSubmit={handleSubmit(onSubmit1)}>
        <Flex
          //  border="1px"
          direction={["column", "column", "row", "row"]}
          justify={"space-evenly"}
          align={["center", "center", "unset", "unset"]}
        >
          <Box w={["90%", "90%", "40%", "40%"]} my={"2rem"}>
            <Accordion
              defaultIndex={[0, 1]}
              border={"1px"}
              borderColor="gray.300"
            >
              <AccordionItem>
                <h2>
                  <AccordionButton border={"1px"} borderColor="gray.300">
                    <Box as="span" flex="1" textAlign="left">
                      <Text
                        fontSize={"2rem"}
                        fontWeight="bold"
                        color={colorMode === "light" ? "#153A5B" : "white"}
                      >
                        Billing Address
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={2}>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    gap={"1rem"}
                    // wrap={"wrap"}
                  >
                    <FormControl isRequired>
                      <FormLabel>UserName</FormLabel>

                      <Box>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BiUser color="gray.300" />}
                          />
                          <Input
                            bg={colorMode === "light" ? "white" : "#153A5B"}
                            _placeholder={
                              colorMode == "light"
                                ? {
                                    color: "gray",
                                  }
                                : {
                                    color: "gray",
                                  }
                            }
                            dropShadow="outline"
                            name="billinguserName"
                            _hover={{
                              shadow: "base",
                              border: "1px",
                              borderColor: "#153A5B",
                            }}
                            as={"input"}
                            shadow="base"
                            type="text"
                            placeholder="Username"
                            {...register("billinguserName", {
                              required: true,
                              maxLength: 40,
                            })}
                          />
                        </InputGroup>
                        <Text as={"span"} color="red.500">
                          {errors.billinguserName?.type === "required" && (
                            <p role="alert">User-Name is required</p>
                          )}
                          {errors.billinguserName?.type === "maxLength" && (
                            <p role="alert">length must bt Between 5 - 50</p>
                          )}
                        </Text>
                      </Box>
                    </FormControl>
                    <FormControl my="5px">
                      <FormLabel>Company</FormLabel>
                      <Box>
                        <Input
                          bg={colorMode === "light" ? "white" : "#153A5B"}
                          _placeholder={
                            colorMode == "light"
                              ? {
                                  color: "gray",
                                }
                              : {
                                  color: "gray",
                                }
                          }
                          dropShadow="outline"
                          name="billingcompanyName"
                          _hover={{
                            shadow: "base",
                            border: "1px",
                            borderColor: "#153A5B",
                          }}
                          as={"input"}
                          shadow="base"
                          type="text"
                          placeholder="Company Name"
                          {...register("billingcompanyName", {
                            maxLength: 40,
                          })}
                        />
                        <Text as={"span"} color="red.500">
                          {errors.billingcompanyName?.type === "maxLength" && (
                            <p role="alert">length must be Between 5 - 50</p>
                          )}
                        </Text>
                      </Box>
                    </FormControl>
                  </Flex>
                  <FormControl my="5px" isRequired>
                    <FormLabel>Address</FormLabel>
                    {/* <Input
                      placeholder="Address"
                      name="billingaddressName1"
                      border={"1px"}
                      borderColor={"#153A5B"}
                      onChange={onChange}
                    /> */}
                    <Input
                      bg={colorMode === "light" ? "white" : "#153A5B"}
                      _placeholder={
                        colorMode == "light"
                          ? {
                              color: "gray",
                            }
                          : {
                              color: "gray",
                            }
                      }
                      dropShadow="outline"
                      name="billingaddressName1"
                      _hover={{
                        shadow: "base",
                        border: "1px",
                        borderColor: "#153A5B",
                      }}
                      as={"input"}
                      shadow="base"
                      type="text"
                      placeholder="House #  , Block # Sector # , ......."
                      {...register("billingaddressName1", {
                        required: true,
                        maxLength: 70,
                      })}
                    />
                    <Text as={"span"} color="red.500">
                      {errors.billingaddressName1?.type === "required" && (
                        <p role="alert">Address is required</p>
                      )}
                      {errors.billingaddressName1?.type === "maxLength" && (
                        <p role="alert">length must be Between 5 - 60</p>
                      )}
                    </Text>
                  </FormControl>

                  <FormControl my="5px">
                    <FormLabel>Secondary Address</FormLabel>
                    {/* <Input
                      placeholder="Address"
                      name="billingaddressName2"
                      border={"1px"}
                      borderColor={"#153A5B"}
                      onChange={onChange}
                      required
                    /> */}
                    <Input
                      bg={colorMode === "light" ? "white" : "#153A5B"}
                      _placeholder={
                        colorMode == "light"
                          ? {
                              color: "gray",
                            }
                          : {
                              color: "gray",
                            }
                      }
                      dropShadow="outline"
                      name="billingaddressName2"
                      _hover={{
                        shadow: "base",
                        border: "1px",
                        borderColor: "#153A5B",
                      }}
                      as={"input"}
                      shadow="base"
                      type="text"
                      placeholder="Secondary Address ..."
                      {...register("billingaddressName2", {
                        maxLength: 70,
                      })}
                    />
                    <Text as={"span"} color="red.500">
                      {errors.billingaddressName2?.type === "maxLength" && (
                        <p role="alert">length must be Between 5 - 70</p>
                      )}
                    </Text>
                  </FormControl>
                  <Flex align={"center"} justify={"center"} gap={"1rem"}>
                    <FormControl my="5px" isRequired>
                      <FormLabel>Phone-Number</FormLabel>

                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<BsTelephone color="gray.300" />}
                        />
                        <Input
                          name="billingNumber"
                          bg={colorMode === "light" ? "white" : "#153A5B"}
                          _placeholder={
                            colorMode == "light"
                              ? {
                                  color: "gray",
                                }
                              : {
                                  color: "gray",
                                }
                          }
                          dropShadow="outline"
                          _hover={{
                            shadow: "base",
                            border: "1px",
                            borderColor: "#153A5B",
                          }}
                          shadow="base"
                          as={"input"}
                          type="number"
                          placeholder="Phone-Number"
                          {...register("billingNumber", {
                            required: true,
                            maxLength: 16,
                          })}
                        />
                      </InputGroup>
                      <Text as={"span"} color="red.500">
                        {errors.billingNumber?.type === "required" && (
                          <p role="alert">Phone number is required</p>
                        )}
                        {errors.billingNumber?.type === "maxLength" && (
                          <p role="alert">length must be Between 10 - 15</p>
                        )}
                      </Text>
                    </FormControl>
                    <FormControl my="5px" isRequired>
                      <FormLabel>City</FormLabel>

                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<MdLocationCity color="gray.300" />}
                        />
                        <Input
                          bg={colorMode === "light" ? "white" : "#153A5B"}
                          _placeholder={
                            colorMode == "light"
                              ? {
                                  color: "gray",
                                }
                              : {
                                  color: "gray",
                                }
                          }
                          dropShadow="outline"
                          name="billingcityName"
                          _hover={{
                            shadow: "base",
                            border: "1px",
                            borderColor: "#153A5B",
                          }}
                          as={"input"}
                          shadow="base"
                          type="text"
                          placeholder="City"
                          {...register("billingcityName", {
                            required: true,
                            maxLength: 40,
                          })}
                        />
                      </InputGroup>
                      <Text as={"span"} color="red.500">
                        {errors.billingcityName?.type === "required" && (
                          <p role="alert">Name is required</p>
                        )}
                        {errors.billingcityName?.type === "maxLength" && (
                          <p role="alert">length must be Between 5 - 40</p>
                        )}
                      </Text>
                    </FormControl>
                  </Flex>
                  <Flex align={"center"} justify={"center"} gap={"1rem"}>
                    <FormControl isRequired my="5px">
                      <FormLabel>Country</FormLabel>
                      {/* <Select
                      placeholder="Select Country"
                      name="billingcountryName"
                      border={"1px"}
                      borderColor={"#153A5B"}
                      // ref={countryRef}
                      onChange={handleCountry}
                    >
                      
                    </Select> */}
                      <Select
                        isDisabled={false}
                        name="billingcountryName"
                        bg={colorMode === "light" ? "white" : "#153A5B"}
                        _placeholder={
                          colorMode == "light"
                            ? {
                                color: "gray",
                              }
                            : {
                                color: "gray",
                              }
                        }
                        dropShadow="outline"
                        _hover={{
                          shadow: "base",
                          border: "1px",
                          borderColor: "#153A5B",
                        }}
                        shadow="base"
                        {...register("billingcountryName", {
                          required: true,
                          onChange: handleCountry,
                        })}
                        placeholder="Select Country"
                      >
                        {getCountry.map((country) => {
                          return (
                            <option
                              key={country.country_id}
                              value={country.country_name}
                            >
                              {country.country_name}
                            </option>
                          );
                        })}
                      </Select>
                      <Text as={"span"} color="red.500">
                        {errors.billingcountryName?.type === "required" && (
                          <p role="alert">Country is required</p>
                        )}
                      </Text>
                    </FormControl>
                    <FormControl isRequired my="5px">
                      <FormLabel>State</FormLabel>
                      {/* <Select
                      placeholder="Select State"
                      name="billingstateName"
                      onChange={onChange}
                      border={"1px"}
                      borderColor={"#153A5B"}
                    >
                      {CountryState.map((items) => {
                        return (
                          <option key={items.state_id} value={items.state_name}>
                            {items.state_name}
                          </option>
                        );
                      })}
                    </Select> */}
                      <Select
                        placeholder="Select State"
                        name="billingstateName"
                        bg={colorMode === "light" ? "white" : "#153A5B"}
                        _placeholder={
                          colorMode == "light"
                            ? {
                                color: "gray",
                              }
                            : {
                                color: "gray",
                              }
                        }
                        dropShadow="outline"
                        _hover={{
                          shadow: "base",
                          border: "1px",
                          borderColor: "#153A5B",
                        }}
                        shadow="base"
                        {...register("billingstateName", {
                          required: true,
                        })}
                      >
                        {CountryState.map((items) => {
                          return (
                            <option
                              key={items.state_id}
                              value={items.state_name}
                            >
                              {items.state_name}
                            </option>
                          );
                        })}
                      </Select>
                      <Text as={"span"} color="red.500">
                        {errors.billingstateName?.type === "required" && (
                          <p role="alert">State is required</p>
                        )}
                      </Text>
                    </FormControl>
                  </Flex>

                  <FormControl my="5px" isRequired>
                    <FormLabel>Post Code</FormLabel>
                    {/* <Input
                      placeholder="Post Code"
                      name="billingpostName"
                      border={"1px"}
                      borderColor={"#153A5B"}
                      onChange={onChange}
                    /> */}
                    <Input
                      name="billingpostName"
                      bg={colorMode === "light" ? "white" : "#153A5B"}
                      _placeholder={
                        colorMode == "light"
                          ? {
                              color: "gray",
                            }
                          : {
                              color: "gray",
                            }
                      }
                      dropShadow="outline"
                      _hover={{
                        shadow: "base",
                        border: "1px",
                        borderColor: "#153A5B",
                      }}
                      shadow="base"
                      as={"input"}
                      type="number"
                      placeholder="Post Code"
                      {...register("billingpostName", {
                        required: true,
                        maxLength: 8,
                      })}
                    />
                    <Text as={"span"} color="red.500">
                      {errors.billingpostName?.type === "required" && (
                        <p role="alert">Post code is required</p>
                      )}
                      {errors.billingpostName?.type === "maxLength" && (
                        <p role="alert">length must be Between 5 - 8</p>
                      )}
                    </Text>
                  </FormControl>

                  <Flex
                    bg={colorMode == "light" ? "#153A5B" : "#153A5B"}
                    my="1rem"
                    p={"1rem"}
                    color={colorMode === "light" ? "white" : "white"}
                  >
                    <input
                      type={"checkbox"}
                      value={"false"}
                      name={"checkbox"}
                      onChange={handleChecked}
                      color={colorMode === "light" ? "#153A5B" : "white"}
                    />
                    <Text mx={"1rem"}>
                      My delivery and billing addresses are the same
                    </Text>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      <Text
                        fontSize={"2rem"}
                        fontWeight="bold"
                        color={colorMode === "light" ? "#153A5B" : "white"}
                      >
                        Shipping Address
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={2}>
                  {!check ? (
                    <>
                      <Flex align={"center"} justify={"center"} gap={"1rem"}>
                        <FormControl isRequired>
                          <FormLabel>UserName</FormLabel>

                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<BiUser color="gray.300" />}
                            />

                            <Input
                              bg={colorMode === "light" ? "white" : "#153A5B"}
                              _placeholder={
                                colorMode == "light"
                                  ? {
                                      color: "gray",
                                    }
                                  : {
                                      color: "gray",
                                    }
                              }
                              dropShadow="outline"
                              name="shippinguserName"
                              _hover={{
                                shadow: "base",
                                border: "1px",
                                borderColor: "#153A5B",
                              }}
                              as={"input"}
                              shadow="base"
                              type="text"
                              placeholder="Username"
                              {...register("shippinguserName", {
                                required: true,
                                maxLength: 40,
                              })}
                            />
                          </InputGroup>
                          <Text as={"span"} color="red.500">
                            {errors.shippinguserName?.type === "required" && (
                              <p role="alert">User-Name is required</p>
                            )}
                            {errors.shippinguserName?.type === "maxLength" && (
                              <p role="alert">length must bt Between 5 - 50</p>
                            )}
                          </Text>
                        </FormControl>
                        <FormControl my="5px">
                          <FormLabel>Company</FormLabel>
                          {/* <Input
                      placeholder="Enter Company"
                      border={"1px"}
                      borderColor={"#153A5B"}
                      name="billingcompanyName"
                      onChange={onChange}
                    /> */}
                          <Input
                            bg={colorMode === "light" ? "white" : "#153A5B"}
                            _placeholder={
                              colorMode == "light"
                                ? {
                                    color: "gray",
                                  }
                                : {
                                    color: "gray",
                                  }
                            }
                            dropShadow="outline"
                            name="shippingcompanyName"
                            _hover={{
                              shadow: "base",
                              border: "1px",
                              borderColor: "#153A5B",
                            }}
                            as={"input"}
                            shadow="base"
                            type="text"
                            placeholder="Company Name"
                            {...register("shippingcompanyName", {
                              maxLength: 40,
                            })}
                          />
                          <Text as={"span"} color="red.500">
                            {errors.shippingcompanyName?.type ===
                              "maxLength" && (
                              <p role="alert">length must be Between 5 - 50</p>
                            )}
                          </Text>
                        </FormControl>
                      </Flex>
                      <FormControl my="5px" isRequired>
                        <FormLabel>Address</FormLabel>
                        {/* <Input
                      placeholder="Address"
                      name="billingaddressName1"
                      border={"1px"}
                      borderColor={"#153A5B"}
                      onChange={onChange}
                    /> */}
                        <Input
                          bg={colorMode === "light" ? "white" : "#153A5B"}
                          _placeholder={
                            colorMode == "light"
                              ? {
                                  color: "gray",
                                }
                              : {
                                  color: "gray",
                                }
                          }
                          dropShadow="outline"
                          name="shippingaddressName1"
                          _hover={{
                            shadow: "base",
                            border: "1px",
                            borderColor: "#153A5B",
                          }}
                          as={"input"}
                          shadow="base"
                          type="text"
                          placeholder="House #  , Block # Sector # , ......."
                          {...register("shippingaddressName1", {
                            required: true,
                            maxLength: 70,
                          })}
                        />
                        <Text as={"span"} color="red.500">
                          {errors.shippingaddressName1?.type === "required" && (
                            <p role="alert">Address is required</p>
                          )}
                          {errors.shippingaddressName1?.type ===
                            "maxLength" && (
                            <p role="alert">length must be Between 5 - 60</p>
                          )}
                        </Text>
                      </FormControl>

                      <FormControl my="5px">
                        <FormLabel>Address</FormLabel>
                        {/* <Input
                      placeholder="Address"
                      name="billingaddressName2"
                      border={"1px"}
                      borderColor={"#153A5B"}
                      onChange={onChange}
                      required
                    /> */}
                        <Input
                          bg={colorMode === "light" ? "white" : "#153A5B"}
                          _placeholder={
                            colorMode == "light"
                              ? {
                                  color: "gray",
                                }
                              : {
                                  color: "gray",
                                }
                          }
                          dropShadow="outline"
                          name="shippingaddressName2"
                          _hover={{
                            shadow: "base",
                            border: "1px",
                            borderColor: "#153A5B",
                          }}
                          as={"input"}
                          shadow="base"
                          type="text"
                          placeholder="Secondary Address ..."
                          {...register("shippingaddressName2", {
                            maxLength: 70,
                          })}
                        />
                        <Text as={"span"} color="red.500">
                          {errors.shippingaddressName2?.type ===
                            "maxLength" && (
                            <p role="alert">length must be Between 5 - 70</p>
                          )}
                        </Text>
                      </FormControl>
                      <Flex align={"center"} justify={"center"} gap={"1rem"}>
                        <FormControl my="5px" isRequired>
                          <FormLabel>City</FormLabel>
                          {/* <Input
                      placeholder="City"
                      name="billingcityName"
                      border={"1px"}
                      borderColor={"#153A5B"}
                      onChange={onChange}
                    /> */}
                          <Input
                            bg={colorMode === "light" ? "white" : "#153A5B"}
                            _placeholder={
                              colorMode == "light"
                                ? {
                                    color: "gray",
                                  }
                                : {
                                    color: "gray",
                                  }
                            }
                            dropShadow="outline"
                            name="shippingcityName"
                            _hover={{
                              shadow: "base",
                              border: "1px",
                              borderColor: "#153A5B",
                            }}
                            as={"input"}
                            shadow="base"
                            type="text"
                            placeholder="City"
                            {...register("shippingcityName", {
                              required: true,
                              maxLength: 40,
                            })}
                          />
                          <Text as={"span"} color="red.500">
                            {errors.shippingcityName?.type === "required" && (
                              <p role="alert">Name is required</p>
                            )}
                            {errors.shippingcityName?.type === "maxLength" && (
                              <p role="alert">length must be Between 5 - 40</p>
                            )}
                          </Text>
                        </FormControl>
                        <FormControl my="5px" isRequired>
                          <FormLabel>Post Code</FormLabel>

                          <Input
                            name="shippingpostName"
                            bg={colorMode === "light" ? "white" : "#153A5B"}
                            _placeholder={
                              colorMode == "light"
                                ? {
                                    color: "gray",
                                  }
                                : {
                                    color: "gray",
                                  }
                            }
                            dropShadow="outline"
                            _hover={{
                              shadow: "base",
                              border: "1px",
                              borderColor: "#153A5B",
                            }}
                            shadow="base"
                            as={"input"}
                            type="number"
                            placeholder="Post Code"
                            {...register("shippingpostName", {
                              required: true,
                              maxLength: 8,
                            })}
                          />
                          <Text as={"span"} color="red.500">
                            {errors.shippingpostName?.type === "required" && (
                              <p role="alert">POST CODE is required</p>
                            )}
                            {errors.shippingpostName?.type === "maxLength" && (
                              <p role="alert">length must be Between 5 - 8</p>
                            )}
                          </Text>
                        </FormControl>
                      </Flex>
                      <Flex align={"center"} justify={"center"} gap={"1rem"}>
                        <FormControl my="5px">
                          <FormLabel>Country</FormLabel>

                          <Select
                            name="shippingcountryName"
                            bg={colorMode === "light" ? "white" : "#153A5B"}
                            _placeholder={
                              colorMode == "light"
                                ? {
                                    color: "gray",
                                  }
                                : {
                                    color: "gray",
                                  }
                            }
                            dropShadow="outline"
                            _hover={{
                              shadow: "base",
                              border: "1px",
                              borderColor: "#153A5B",
                            }}
                            shadow="base"
                            {...register("shippingcountryName", {
                              required: true,
                              onChange: handleCountry2,
                            })}
                            placeholder="Select Country"
                          >
                            {getCountry.map((country) => {
                              return (
                                <option
                                  key={country.country_id}
                                  value={country.country_name}
                                >
                                  {country.country_name}
                                </option>
                              );
                            })}
                          </Select>
                          <Text as={"span"} color="red.500">
                            {errors.shippingcountryName?.type ===
                              "required" && (
                              <p role="alert">Country is required</p>
                            )}
                          </Text>
                        </FormControl>
                        <FormControl my="5px">
                          <FormLabel>State</FormLabel>

                          <Select
                            name="shippingstateName"
                            bg={colorMode === "light" ? "white" : "#153A5B"}
                            _placeholder={
                              colorMode == "light"
                                ? {
                                    color: "gray",
                                  }
                                : {
                                    color: "gray",
                                  }
                            }
                            dropShadow="outline"
                            _hover={{
                              shadow: "base",
                              border: "1px",
                              borderColor: "#153A5B",
                            }}
                            placeholder="Select State"
                            shadow="base"
                            {...register("shippingstateName", {
                              required: true,
                            })}
                          >
                            {CountryState2.map((items) => {
                              return (
                                <option
                                  key={items.state_id}
                                  value={items.state_name}
                                >
                                  {items.state_name}
                                </option>
                              );
                            })}
                          </Select>
                          <Text as={"span"} color="red.500">
                            {errors.shippingstateName?.type === "required" && (
                              <p role="alert">State is required</p>
                            )}
                          </Text>
                        </FormControl>
                      </Flex>
                    </>
                  ) : (
                    " "
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Flex
            //  border={"1px"}
            w={["90%", "90%", "40%", "50%"]}
            my={"2rem"}
            bg="#153A5B"
          >
            <Accordion defaultIndex={[0, 1]} allowMultiple w={"100%"}>
              <AccordionItem>
                <h2>
                  <AccordionButton
                    // bg="white"
                    // border={"1px"}
                    borderColor="gray.300"
                    pointerEvents={"none"}
                  >
                    <Box
                      as="span"
                      fontWeight={"bold"}
                      color="white"
                      flex="1"
                      textAlign="left"
                      fontSize={"2rem"}
                    >
                      Summary
                    </Box>
                    <AccordionIcon color={"white"} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    {Object.keys(cart).length != 0 && (
                      <>
                        <Flex
                          // border={"1px"}
                          direction={"column"}
                          // height={"90%"}
                          justify={"space-between"}
                        >
                          <Flex
                            // border={"1px"}
                            // borderBottom={"1px"}
                            // borderColor="gray.400"
                            w={"100%"}
                            // justify={"center"}
                            // align="center"
                            my={"2rem"}
                            direction="column"
                            // p={"1rem"}
                          >
                            <Flex
                              // border="1px"
                              // borderColor={"gray.400"}
                              direction={"column"}
                              // borderInline="1px"
                              // borderColor={"#153A5B"}
                            >
                              <Box>
                                <TableContainer>
                                  <Table
                                    // variant="simple"

                                    // colorScheme={"#153A5B"}
                                    // _hover={{ bg: "none" }}
                                    size={"md"}
                                    border="1px"
                                    // height={"200px"}
                                    borderColor={"gray.300"}
                                    // overflowY={"scroll"}
                                    // maxH={"600px"}
                                  >
                                    <Thead>
                                      <Tr>
                                        <Th
                                          color={"white"}
                                          fontWeight="semibold"
                                          fontSize={"0.8rem"}
                                        >
                                          Image
                                        </Th>
                                        <Th
                                          color={"white"}
                                          fontWeight="semibold"
                                          fontSize={"0.8rem"}
                                        >
                                          Title
                                        </Th>
                                        <Th
                                          color={"white"}
                                          fontWeight="semibold"
                                          fontSize={"0.8rem"}
                                        >
                                          Qty
                                        </Th>
                                        <Th
                                          color={"white"}
                                          fontWeight="semibold"
                                          fontSize={"0.8rem"}
                                        >
                                          Unit Price
                                        </Th>
                                        <Th
                                          color={"white"}
                                          fontWeight="semibold"
                                          fontSize={"0.8rem"}
                                        >
                                          Total Price
                                        </Th>
                                        <Th
                                          color={"white"}
                                          fontWeight="semibold"
                                          fontSize={"0.8rem"}
                                        ></Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      {Object.keys(cart).map((k, index) => {
                                        const item = cart[k];
                                        const key = `${item.title}-${index}`;

                                        return (
                                          <Tr key={key}>
                                            <Td>
                                              {cart[k].image == null ? (
                                                <Image
                                                  src={cart[k].image}
                                                  alt={cart[k].productName}
                                                  width={70}
                                                  height={20}
                                                />
                                              ) : (
                                                <Image
                                                  src={
                                                    colorMode === "light"
                                                      ? "/assets/logoWhite.svg"
                                                      : "/assets/logo.svg"
                                                  }
                                                  alt="Logo"
                                                  width={230}
                                                  height={100}
                                                />
                                              )}
                                            </Td>
                                            <Td
                                              color={
                                                colorMode === "light"
                                                  ? "white"
                                                  : "white"
                                              }
                                            >
                                              <Tooltip
                                                label={cart[k].title}
                                                aria-label="A tooltip"
                                              >
                                                Hover me...
                                              </Tooltip>
                                              <Text
                                                fontWeight={"semibold"}
                                                color={
                                                  colorMode === "light"
                                                    ? "white"
                                                    : "white"
                                                }
                                              >
                                                {cart[k].options
                                                  ? "Options"
                                                  : ""}
                                              </Text>

                                              {cart[k].options
                                                ? cart[k].options
                                                : ""}
                                            </Td>
                                            <Td>
                                              <Flex align={"center"}>
                                                <Button
                                                  size={"sm"}
                                                  cursor={"pointer"}
                                                  onClick={() => {
                                                    dispatch(
                                                      decrementQuantity(
                                                        cart[k].Slug
                                                      )
                                                    );
                                                  }}
                                                  fontSize={"1.1rem"}
                                                >
                                                  -
                                                </Button>
                                                <Text
                                                  mx={"1rem"}
                                                  fontWeight={"semibold"}
                                                  // variant="unstyled"
                                                  // fontSize="1rem"
                                                  color={
                                                    colorMode === "light"
                                                      ? "white"
                                                      : "white"
                                                  }
                                                >
                                                  {cart[k].quantity
                                                    ? cart[k].quantity
                                                    : ""}
                                                </Text>
                                                <Button
                                                  size={"sm"}
                                                  fontSize={"1rem"}
                                                  cursor={"pointer"}
                                                  onClick={() => {
                                                    dispatch(
                                                      incrementQuantity(
                                                        cart[k].Slug
                                                      )
                                                    );
                                                  }}
                                                  // fontSize={"1.5rem"}
                                                >
                                                  +
                                                </Button>
                                              </Flex>
                                            </Td>
                                            <Td
                                              color={
                                                colorMode === "light"
                                                  ? "white"
                                                  : "white"
                                              }
                                            >
                                              ${cart[k].price}
                                            </Td>
                                            <Td
                                              color={
                                                colorMode === "light"
                                                  ? "white"
                                                  : "white"
                                              }
                                            >
                                              $
                                              {(
                                                cart[k].price * cart[k].quantity
                                              ).toFixed(2)}
                                            </Td>
                                            <Td
                                              color={
                                                colorMode === "light"
                                                  ? "white"
                                                  : "white"
                                              }
                                            >
                                              <CloseButton
                                                onClick={() =>
                                                  dispatch(
                                                    removeItem(cart[k].Slug)
                                                  )
                                                }
                                              />
                                            </Td>
                                          </Tr>
                                        );
                                      })}
                                    </Tbody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Flex>
                          </Flex>

                          {/* <Divider
                    border={"1px"}
                    borderColor="gray"
                    width={"95%"}
                    marginInline="auto"
                  /> */}

                          <Flex
                            justify="flex-end"
                            direction={["column", "column", "column", "column"]}
                          >
                            <Flex
                              direction={"column"}
                              mb={"4rem"}
                              justify={"end"}
                              // width={"90%"}
                            >
                              <Divider
                                border={"1px"}
                                borderColor="white"
                                width={"100%"}
                                marginInline="auto"
                              />
                              <Flex
                                mr={"3rem"}
                                my={"1.5rem"}
                                justify={"space-around"}
                                // align={"center"}
                                direction={"column"}
                                // border={"1px"}
                              >
                                <Flex
                                  // border={"1px"}
                                  justify={"right"}
                                  align={"end"}
                                  gap={"2rem"}
                                >
                                  <Box ml={"2rem"}>
                                    <Box
                                      color={"white"}
                                      fontWeight={"normal"}
                                      fontSize={"1.2rem"}
                                    >
                                      Sub-Total :
                                    </Box>
                                  </Box>

                                  <Box
                                    color={"white"}
                                    fontWeight={"normal"}
                                    fontSize={"1.2rem"}
                                    mx={"0.5rem"}
                                  >
                                    $ {subTotal || 0}
                                  </Box>
                                </Flex>
                                <Flex
                                  mt={"0.5rem"}
                                  justify={"right"}
                                  align={"end"}
                                  gap={"2rem"}
                                >
                                  <Box>
                                    <Box
                                      color={"white"}
                                      fontWeight={"normal"}
                                      fontSize={"1.2rem"}
                                    >
                                      Shipping (weight : {weight} kg) :
                                    </Box>
                                  </Box>

                                  <Box
                                    color={"white"}
                                    fontWeight={"normal"}
                                    fontSize={"1.2rem"}
                                    mx={"0.5rem"}
                                  >
                                    {countryId ? (
                                      <>
                                        {subTotal ? (
                                          <>
                                            {subTotal >= 500
                                              ? `$0.00`
                                              : getZoneData
                                              ? `$${totalWeightPrice}`
                                              : "$0.00"}
                                          </>
                                        ) : (
                                          `---`
                                        )}
                                      </>
                                    ) : (
                                      "- - - -"
                                    )}
                                  </Box>
                                </Flex>
                              </Flex>
                              <Divider
                                border={"1px"}
                                borderColor="white"
                                width={"100%"}
                                // marginInline="auto"
                              />
                              <Flex
                                // border={"1px"}
                                justify={"space-between"}
                                align={"end"}
                                gap={"2rem"}
                                // w={"90%"}
                              >
                                <Box color={"#153A5B"}>Enter couen</Box>
                                <Flex mt={"2rem"} marginRight={"3rem"}>
                                  <Box ml={"2rem"}>
                                    <Box
                                      marginRight={"1.5rem"}
                                      color={"white"}
                                      fontWeight={"normal"}
                                      fontSize={"1.2rem"}
                                    >
                                      Total (USD) :
                                    </Box>
                                  </Box>

                                  <Box
                                    color={"white"}
                                    fontWeight={"normal"}
                                    fontSize={"1.2rem"}
                                    mx={"0.5rem"}
                                  >
                                    {total ? `$ ${total.toFixed(2)}` : `$0.0`}
                                  </Box>
                                </Flex>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>
                      </>
                    )}
                  </Box>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton pointerEvents={"none"}>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"bold"}
                    fontSize="2rem"
                    color={"white"}
                  >
                    PAYMENT METHOD
                  </Box>

                  <AccordionIcon color={"white"} />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Tabs isLazy variant="enclosed">
                    <TabList>
                      <Tab
                        color={"white"}
                        fontWeight="semibold"
                        fontSize={"1rem"}
                      >
                        Bank Transfer
                      </Tab>
                      <Tab
                        color={"white"}
                        fontWeight="semibold"
                        fontSize={"1rem"}
                      >
                        Paypal
                      </Tab>
                    </TabList>
                    <TabPanels>
                      {/* initially mounted */}
                      <TabPanel>
                        <Flex align={"center"} justify="center">
                          <AiFillBank fontSize={"2.2rem"} fill="white" />
                          <Heading
                            color={"white"}
                            size={["md", "md", "md", "xl"]}
                          >
                            Bank Transfer Instructions
                          </Heading>
                        </Flex>
                        <Text my={"1rem"} fontWeight={"bold"} color="white">
                          Please transfer the total amount to the following bank
                          account.
                        </Text>

                        <Text color={"white"}>
                          Offline payment
                          <br />
                          Use following Bank information for Bank payments
                        </Text>

                        <List spacing={3} my="2rem">
                          <ListItem color="white">
                            <ListIcon as={IoIosArrowForward} color="white" />
                            Title of account: Adas Instruments
                          </ListItem>
                          <ListItem color="white">
                            <ListIcon as={IoIosArrowForward} color="white" />
                            A/C Number: 4049592901
                          </ListItem>
                          <ListItem color="white">
                            <ListIcon as={IoIosArrowForward} color="white" />
                            IBAN # PK41NBPA0403004049592901
                          </ListItem>
                          {/* You can also use custom icons from react-icons */}
                          <ListItem color="white">
                            <ListIcon as={IoIosArrowForward} color="white" />
                            swift code: nbpapkka02s
                          </ListItem>
                          <ListItem color="white">
                            <ListIcon as={IoIosArrowForward} color="white" />
                            National Bank of Pakistan
                          </ListItem>
                          <ListItem color="white">
                            <ListIcon as={IoIosArrowForward} color="white" />
                            District Courts Sialkot (0403)
                          </ListItem>
                        </List>
                        <Text color={"white"} fontWeight="semibold">
                          Your order will not ship until we receive payment.
                        </Text>
                        <Button
                          isDisabled={getZoneData ? false : true}
                          isLoading={BLOADING}
                          loadingText="Please wait..."
                          my={"1rem"}
                          variant="outline"
                          color={"#153A5B"}
                          bg="white"
                          // type="submit"
                          onClick={() => handleSubmit(onSubmit2)()}
                          _hover={{ bg: "#153A5B", color: "white" }}
                        >
                          Comfirm Your Order ( $
                          {total ? total.toFixed(2) : `$0.0`})
                        </Button>
                      </TabPanel>

                      {/* initially not mounted */}
                      <TabPanel>
                        <Button
                          isDisabled={getZoneData ? false : true}
                          isLoading={BLOADING}
                          loadingText="Please wait..."
                          my={"1rem"}
                          // type="submit"
                          onClick={handleSubmit(onSubmit1)}
                          variant="outline"
                          color={"#153A5B"}
                          bg="white"
                          _hover={{ bg: "#153A5B", color: "white" }}
                        >
                          Continue With Paypal ( $
                          {total ? total.toFixed(2) : `$0.0`})
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Pay Now to Confirm</ModalHeader>
                            {/* <ModalCloseButton /> */}
                            <ModalBody w={"100%"}>
                              <PayPalScriptProvider options={initialOptions}>
                                <Flex align={"center"} justify="center">
                                  {orderLoading ? (
                                    <Spinner />
                                  ) : (
                                    <PayPalButtons
                                      className="paypal-imp-btn"
                                      style={{ layout: "horizontal" }}
                                      createOrder={(data, action) => {
                                        return action.order.create({
                                          purchase_units: [
                                            {
                                              description: oID,
                                              amount: {
                                                value: total ? total : `$0.0`,
                                              },
                                            },
                                          ],
                                        });
                                      }}
                                      onApprove={async (data, actions) => {
                                        console.log(
                                          "onApprove",
                                          data.orderID,
                                          actions.order.capture()
                                        );
                                        const order =
                                          await actions.order.capture();

                                        const settings = {
                                          method: "POST",
                                          headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            postOrderData: order,
                                          }),
                                        };
                                        try {
                                          setorderLoading(true);
                                          const fetchResponse = await fetch(
                                            `${process.env.NEXT_PUBLIC_HOST}/api/postOrder`,
                                            settings
                                          );
                                          const data =
                                            await fetchResponse.json();
                                          // console.log("data", data);
                                          if (data.success === true) {
                                            toast({
                                              title: "Congratulation",
                                              description:
                                                "your Order has place successfully",
                                              status: "success",
                                              duration: 4000,
                                              isClosable: true,
                                            });
                                            setorderLoading(false);
                                            Router.push(
                                              `/order?orderId=${data.payload._id}`
                                            );
                                          } else {
                                            setorderLoading(false);
                                            dispatch(setCart([]));
                                            localStorage.clear();
                                            Router.push("/");
                                          }
                                        } catch (e) {
                                          // console.log("req error");
                                          setorderLoading(false);
                                          dispatch(setCart([]));
                                          localStorage.clear();
                                          Router.push("/");
                                        }

                                        // handleApprove(data.orderID);
                                      }}
                                      onCancel={async (err) => {
                                        setorderLoading(true);
                                        const settings = {
                                          method: "POST",
                                          headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            orderID: oID,
                                          }),
                                        };
                                        try {
                                          const fetchResponse = await fetch(
                                            `${process.env.NEXT_PUBLIC_HOST}/api/deleteOrderuser`,
                                            settings
                                          );
                                          const data =
                                            await fetchResponse.json();
                                          // console.log("data", data);
                                          if (data.success) {
                                            settwoTimeOrder((prv) => prv + 1);
                                            setorderLoading(false);
                                            onClose();
                                          } else {
                                            setorderLoading(false);
                                            localStorage.clear();
                                          }
                                        } catch (e) {
                                          // console.log("req error");
                                          setorderLoading(false);
                                          return e;
                                        }
                                      }}
                                      onError={(err) => {
                                        // seterror(err);
                                        console.log(
                                          "paypal checkout error",
                                          err
                                        );
                                      }}
                                    />
                                  )}
                                </Flex>
                              </PayPalScriptProvider>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                              >
                                Close
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>
      </form>
    </>
  );
}
