import React, { useState, useEffect, useRef } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Center,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  Table,
  Td,
  Th,
  TableContainer,
  Thead,
  Tr,
  Tbody,
  Accordion,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useDisclosure,
} from "@chakra-ui/react";
import { PayPalButton } from "react-paypal-button-v2";
import Link from "next/link";
import Image from "next/image";

import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

import { useToast } from "@chakra-ui/react";

const Form1 = ({
  onchange,
  handleinput,
  listCountry,
  countrystate,
  check,
  setcheck,
  countryRef,
}) => {
  useEffect(() => {
    console.log("rerender");
    setcheck(false);
  }, []);

  const handleCountry = async (e) => {
    await handleinput(e);
    await onchange(e);
  };

  return (
    <>
      <Center>
        <Heading color={"#153A5B"}>Quick Checkout</Heading>
      </Center>
      <form>
        <FormLabel>Company</FormLabel>
        <Input
          placeholder="Enter Company"
          border={"1px"}
          borderColor={"#153A5B"}
          name="billingcompanyName"
          onChange={onchange}
        />
        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            placeholder="Address"
            name="billingaddressName1"
            onChange={onchange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            placeholder="Address"
            name="billingaddressName2"
            onChange={onchange}
            required
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>City</FormLabel>
          <Input
            placeholder="City"
            name="billingcityName"
            onChange={onchange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Post Code</FormLabel>
          <Input
            placeholder="Post Code"
            name="billingpostName"
            onChange={onchange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Select
            placeholder="Select Country"
            name="billingcountryName"
            ref={countryRef}
            onChange={handleCountry}
          >
            {listCountry.map((country) => {
              return (
                <option key={country.country_id} value={country.country_name}>
                  {country.country_name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>State</FormLabel>
          <Select
            placeholder="Select State"
            name="billingstateName"
            onChange={onchange}
          >
            {countrystate.map((state) => {
              return (
                <option key={state.state_id} value={state.state_name}>
                  {state.state_name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <Box bg={"gray.100"} my="1rem" p={"1rem"}>
          <input
            type={"checkbox"}
            value={"false"}
            name={"checkbox"}
            onChange={() => {
              setcheck(!check);
            }}
          />
          My delivery and billing addresses are the same
        </Box>
      </form>
    </>
  );
};

const Form2 = ({
  onchange,
  handleinput,
  listCountry,
  countrystate,
  check,
  setcheck,
  state,
}) => {
  const handleCountry = async (e) => {
    await handleinput(e);
    await onchange(e);
  };
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Billing
      </Heading>
      <Box>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Shipping Address
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <FormLabel>Company</FormLabel>
              <Input
                // placeholder="Enter Company"
                border={"1px"}
                borderColor={"#153A5B"}
                name="shippingcompanyName"
                onChange={onchange}
              />
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  // placeholder="Address"
                  name="shippingaddressName1"
                  onChange={onchange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  // placeholder="Address"
                  name="shippingaddressName2"
                  onChange={onchange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  // placeholder="City"
                  name="shippingcityName"
                  onChange={onchange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Post Code</FormLabel>
                <Input
                  // placeholder="Post Code"
                  name="shippingpostName"
                  onChange={onchange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select
                  // placeholder="Select Country"
                  name="shippingcountryName"
                  onChange={handleCountry}
                >
                  {listCountry.map((country) => {
                    return (
                      <option
                        key={country.country_name}
                        value={country.country_name}
                      >
                        {country.country_name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Select
                  // placeholder="Select State"
                  name="shippingstateName"
                  onChange={onchange}
                >
                  {countrystate.map((state) => {
                    return (
                      <option key={state.state_name} value={state.state_name}>
                        {state.state_name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

const Form3 = ({ cart, subTotal, clearCart, removeFromCart, addtoCart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Summary
      </Heading>
      <Box>
        {Object.keys(cart).length == 0 && (
          <Flex
            mt={"2rem"}
            justify={"center"}
            direction="column"
            align={"center"}
          >
            <Center>
              <Text
                p={"0.2rem"}
                fontSize={"1rem"}
                color="white"
                fontWeight={"semibold"}
                my="1rem"
                bg={"#153A5B"}
                w="100%"
                mx={"auto"}
              >
                No Items in the Cart
              </Text>
            </Center>
            <Button width={[80, 80, 80, 60]} colorScheme={"blue"}>
              Continou Shopping
            </Button>
          </Flex>
        )}

        {Object.keys(cart).length != 0 && (
          <>
            <Flex
              //  border={"1px"}
              justify={"center"}
              align="center"
              mt={"3rem"}
            >
              <TableContainer
                shadow={"base"}
                border="1px"
                borderColor={"gray.300"}
              >
                <Table size={["md", "md", "lg", "lg"]}>
                  <Thead bg={"lightgrey"}>
                    <Tr>
                      <Th color="#153A5B" fontWeight={"bold"} fontSize="1rem">
                        IMAGE
                      </Th>
                      <Th color="#153A5B" fontWeight={"bold"} fontSize="1rem">
                        PRODUCT NAME
                      </Th>
                      <Th color="#153A5B" fontWeight={"bold"} fontSize="1rem">
                        MODEL
                      </Th>
                      <Th color="#153A5B" fontWeight={"bold"} fontSize="1rem">
                        QUANTITY
                      </Th>
                      <Th color="#153A5B" fontWeight={"bold"} fontSize="1rem">
                        UNIT PRICE
                      </Th>
                      <Th color="#153A5B" fontWeight={"bold"} fontSize="1rem">
                        TOTAL
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(cart).map((k) => {
                      // console.log("keys", k);
                      return (
                        <Tr key={k}>
                          <Td>
                            <Image
                              src={
                                "/assets/Plastic-Surgery/PP-205.65-550x550.jpg"
                              }
                              width={400}
                              height={100}
                            />
                          </Td>
                          <Td>{cart[k].productName}</Td>
                          <Td>{cart[k].model}</Td>
                          <Td>
                            <Flex
                              justify={"space-between"}
                              align="center"
                              // border={"1px"}
                            >
                              <AiFillMinusCircle
                                fontSize={"1.5rem"}
                                fill="#153A5B"
                                cursor={"pointer"}
                                onClick={() => {
                                  removeFromCart(
                                    k,
                                    1,
                                    cart[k].price,
                                    cart[k].productName,
                                    cart[k].model
                                    // cart[k].options
                                  );
                                }}
                              />
                              <Button
                                // mx={"1rem"}
                                fontWeight={"semibold"}
                                variant="unstyled"
                                // fontSize="1rem"
                              >
                                {cart[k].qty}
                              </Button>
                              <AiFillPlusCircle
                                cursor={"pointer"}
                                onClick={() => {
                                  addtoCart(
                                    k,
                                    1,
                                    cart[k].price,
                                    cart[k].productName,
                                    cart[k].model
                                    // cart[k].options
                                  );
                                }}
                                fontSize={"1.5rem"}
                                fill="#153A5B"
                              />
                            </Flex>
                          </Td>
                          <Td>
                            <Button variant={"unstyled"}>
                              ${cart[k].price}
                            </Button>
                          </Td>
                          <Td>
                            <Button variant={"unstyled"}>${subTotal}</Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
            <Flex
              justify="space-evenly"
              align="center"
              w={"60%"}
              marginInline="auto"
              // ml="auto"
              // width={"100%"}
              border={"1px"}
              // mt="2rem"
              // mr={"1rem"}
              height="200px"
              // p="1rem"
              direction={["column", "column", "row", "row"]}
            >
              <Button
                width={[80, 80, 80, 60]}
                colorScheme={"red"}
                onClick={clearCart}
              >
                Clear Cart
              </Button>

              <Link href={"/checkout"}>
                <Button
                  width={[80, 80, 80, 60]}
                  // mx={"1rem"}
                  colorScheme={"blue"}
                  // my="1rem"
                  onClick={onClose}
                >
                  CHECKOUT
                </Button>
              </Link>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
};

export default function Multiform({
  cart,
  removeFromCart,
  subTotal,
  clearCart,
  addtoCart,
}) {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const countryRef = useRef();
  const [getCountry, setgetCountry] = useState([]);
  const [CountryState, setCountryState] = useState([]);
  const [countryId, setcountryId] = useState("");
  const [check, setcheck] = useState(false);
  // const [countryField, setcountryField] = useState();
  console.log("country", countryId);

  const [scriptLoaded, setscriptLoaded] = useState(false);

  //paypal Integraation

  useEffect(() => {
    addpayPalScript();
  }, []);

  const addpayPalScript = () => {
    if (window.paypal) {
      setscriptLoaded(true);
      return;
    }

    const sscript = document.createElement("script");
    sscript.src = process.env.CLIENT_ID;
    sscript.type = "text/javascript";
    sscript.async = true;
    sscript.onload = () => setscriptLoaded(true);
    document.body.appendChild(sscript);
  };

  //paypal INtegration

  const [state, setState] = useState({
    billingcompanyName: "",
    billingaddressName1: "",
    billingaddressName2: "",
    billingcountryName: "",
    billingcityName: "",
    billingpostName: "",
    billingstateName: "",

    shippingcompanyName: "",
    shippingaddressName1: "",
    shippingaddressName2: "",
    shippingcountryName: "",
    shippingcityName: "",
    shippingpostName: "",
    shippingstateName: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log("data", name, value);
    setState((preState) => ({
      ...preState,

      [name]: value,
    }));
  };

  useEffect(() => {
    const country = async () => {
      const res = await fetch(`/api/getCountry`);
      const con = await res.json();
      //   console.log(con);
      setgetCountry(await con);
    };

    country();
  }, []);

  const HandleInput = (e) => {
    console.log(e.target.value, e.target.name);
    // setcountryField(e.target.value);
    setcountryId(e.target.value);
  };

  useEffect(() => {
    const States = async () => {
      const res = await fetch(`/api/getCountry`);
      const con = await res.json();
      con.map((data) => {
        if (data.country_name === countryId) {
          console.log(data.states);
          setCountryState(data.states);
        }
        // console.log(countryId);
        // console.log(data.states);
      });
    };
    States();
  }, [countryId]);

  // console.log("checked", check);
  console.log("state", state);

  return (
    <>
      <Box
        my="1rem"
        marginInline={"auto"}
        borderWidth="1px"
        bg={"white"}
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        // m="0px auto"
        as="form"
      >
        <Progress
          color={"#153A5B"}
          // bg="#153A5B"
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>

        {step === 1 ? (
          <Form1
            onchange={onChange}
            listCountry={getCountry}
            handleinput={HandleInput}
            countrystate={CountryState}
            setcheck={setcheck}
            check={check}
            countryRef={countryRef}
          />
        ) : step === 2 && check === false ? (
          <Form2
            onchange={onChange}
            listCountry={getCountry}
            handleinput={HandleInput}
            countrystate={CountryState}
            setcheck={setcheck}
            check={check}
            state={state}
          />
        ) : (
          <Form3
            cart={cart}
            addtoCart={addtoCart}
            removeFromCart={removeFromCart}
            subTotal={subTotal}
          />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Box>
                {scriptLoaded ? (
                  <PayPalButton
                    amount={subTotal}
                    onSuccess={(details, data) => {
                      // alert("Transaction completed by " + details.payer.name.given_name);
                      console.log(details);

                      // // OPTIONAL: Call your server to save the transaction
                      // return fetch("/paypal-transaction-complete", {
                      //   method: "post",
                      //   body: JSON.stringify({
                      //     orderID: data.orderID
                      //   })
                      // });
                    }}
                  />
                ) : (
                  "Loading"
                )}
              </Box>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
