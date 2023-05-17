import dbConnect from "@/Middleware/connectDb";
import Order from "@/models/Order";
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useState, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Divider,
  Button,
  Collapse,
  Highlight,
  Input,
  Select,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineCopyright } from "react-icons/ai";
import { useRouter } from "next/router";
export default function Orderdetail({ order, clearCart }) {
  const Router = useRouter();
  const toast = useToast();
  const statusInput = useRef();
  const statusPayment = useRef();

  // const orderData = JSON.parse(order.paymentInfo);

  const d = Date.parse(order.createdAt);
  const date = new Date(d).toISOString().slice(0, 10);
  // console.log(order.amount);

  const [show, setShow] = useState(false);
  const handleChangeStatus = async (e) => {
    e.preventDefault();

    const inputTest = statusInput.current.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order._id,
          status: statusInput.current.value,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      toast({
        title: "Status Update",
        description: "Successfully",
        status: "success",
        position: "bottom",
        duration: 2000,
        isClosable: true,
      });

      Router.push("/admin/allorders");
    }
    console.log(data);
  };

  const handleChangeStatus2 = async (e) => {
    e.preventDefault();

    // const inputTest = statusPayment.current.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateStatus2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order._id,
          status: statusPayment.current.value,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      toast({
        title: "Status Update",
        description: "Successfully",
        status: "success",
        position: "bottom",
        duration: 2000,
        isClosable: true,
      });

      Router.push("/admin/allorders");
    }
    console.log(data);
  };

  const handleToggle = () => setShow(!show);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Box width={"100%"}>
        <Box bg={"#153A5B"}>
          <Center>
            <Heading color={"white"}>Change Delivery Status</Heading>
          </Center>
        </Box>
        <Flex
          py={"2rem"}
          justify={"space-evenly"}
          align="center"
          my={"2rem"}
          bg="gray.200"
        >
          <Box>
            <Button variant={"outline"} colorScheme="orange">
              Current Status : {order.DeliveryStatus}
            </Button>
          </Box>
          <Flex
            justify={"space-evenly"}
            align="center"
            // border="1px"
            width={"50%"}
          >
            <Text w={"30%"}>Change Status :</Text>
            <Select
              ref={statusInput}
              border={"1px"}
              borderColor="#153A5B"
              placeholder="Select option"
            >
              <option value="Processing">Processing</option>
              <option value="Shipping">Shipping</option>
              <option value="On-Way">On-Way</option>
              <option value="Delivered">Delivered</option>
            </Select>
          </Flex>
          <Button
            onClick={handleChangeStatus}
            variant={"solid"}
            colorScheme="green"
          >
            Change Status
          </Button>
        </Flex>

        <Flex
          py={"2rem"}
          justify={"center"}
          gap="40px"
          align="center"
          my={"2rem"}
          bg="gray.200"
        >
          <Flex direction={"column"}>
            <Box>
              <Button variant={"outline"} colorScheme="orange">
                Current Status : {order.status}
              </Button>
            </Box>
            <Text mt={"0.5rem"} color="red.700">
              Change only if payment Received *****
            </Text>
          </Flex>
          <Flex
            justify={"space-evenly"}
            align="center"
            // border="1px"
            width={"50%"}
          >
            <Text w={"30%"}>Change Status :</Text>
            <Select
              ref={statusPayment}
              border={"1px"}
              borderColor="#153A5B"
              placeholder="Select option"
            >
              <option value="Paid">Paid</option>
            </Select>
          </Flex>
          <Button
            onClick={handleChangeStatus2}
            variant={"solid"}
            colorScheme="green"
          >
            Change Status
          </Button>
        </Flex>
        <Flex my={"0.5rem"} justify="right" w={"90%"}>
          <Button colorScheme={"purple"} onClick={handlePrint}>
            Print this out!
          </Button>
        </Flex>

        {order.paymentMethod == "BANK" ? (
          <>
            <Flex
              justify={"center"}
              // direction={["column", "column", "row", "row"]}
              bg={"gray.100"}
            >
              <Flex
                my={"2rem"}
                border={"1px"}
                borderColor="gray.300"
                bg="white"
                shadow={"base"}
                direction={"column"}
                ref={componentRef}
              >
                <Flex bg={"gray.200"} justify="center" p={"1rem"} py="1.5rem">
                  <Image
                    src={"/assets/logo.svg"}
                    alt="Logo"
                    width={"200"}
                    height="100"
                    priority={true}
                  />
                </Flex>
                <Box my="1rem" ml={"1rem"}>
                  {order.status == "initiated" ? (
                    <Heading size={"md"}>
                      Your Order Initiated ! Please Pay the Total Amount to
                      Confirm
                    </Heading>
                  ) : (
                    <Heading size={"md"}>Your Order Confirm!</Heading>
                  )}
                </Box>
                <Box mb="1rem" ml={"1rem"}>
                  <Text fontWeight={"semibold"}>
                    {" "}
                    Hi{" "}
                    {order.deliveryData.billinguserName
                      ? order.deliveryData.billinguserName
                      : " Customer"}
                  </Text>

                  {order.status == "initiated" ? (
                    <Text>Pay to confirm.</Text>
                  ) : (
                    <Text>
                      Your order have been confirmed and will be update soon.
                    </Text>
                  )}
                </Box>
                <Divider
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                  mb={"1rem"}
                />
                <Flex justify={"space-between"} mx={"1rem"}>
                  <Box color={"gray.500"}>Order Date</Box>
                  <Box color={"gray.500"}>Order Id#</Box>
                  <Box color={"gray.500"}>Payment</Box>
                </Flex>
                <Flex justify={"space-between"} mx={"1rem"}>
                  <Box>{date}</Box>
                  <Box>{order.orderId ? order.orderId : ""}</Box>
                  <Box>{order.paymentMethod}</Box>
                </Flex>
                <Divider
                  my={"1rem"}
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                />
                <Box>
                  {Object.keys(order.products).map((key) => {
                    return (
                      <Flex key={key} justify={"space-around"} align="center">
                        <Text fontWeight={"semibold"}>
                          {order.products[key].productName}
                        </Text>
                        <Text fontWeight={"medium"}>
                          QTY : {order.products[key].qty}
                        </Text>
                        <Text fontWeight={"medium"}>
                          ${order.products[key].price}
                        </Text>
                      </Flex>
                    );
                  })}
                </Box>
                <Divider
                  my={"1rem"}
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                />

                <Flex direction={"column"} p="1rem" mx={"2rem"}>
                  <Flex mt="0.5rem" justify={"space-between"}>
                    <Box>Box shipping Weight</Box>
                    <Box>${order.WeightPrice}</Box>
                  </Flex>
                  <Flex justify={"space-between"}>
                    <Box>Subtotal</Box>
                    <Box>${order.amount}</Box>
                  </Flex>
                </Flex>
                <Divider
                  mb={"1rem"}
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                />
                <Flex justify={"space-between"} align="center" mx={"2.5rem"}>
                  <Box fontWeight={"semibold"}>Total</Box>
                  <Box fontWeight={"normal"}>${order.grandTotal}</Box>
                </Flex>
                <Divider
                  my={"1.2rem"}
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                />
                <Box p={"1.5rem"}>
                  <Text>
                    We'll send you shipping confirmation when your item(s) are
                    Confirm! We Appreciate <br></br>Your business, and hope you
                    enjoy your purchase.
                  </Text>

                  <Text my={"0.5rem"} fontWeight={"semibold"}>
                    Thank you!
                  </Text>
                  <Text>Hospital Hand Tools</Text>
                </Box>
                <Flex bg={"gray.200"} justify="space-between" align={"center"}>
                  <Text ml="1.3rem">
                    Questions ? Contact our{" "}
                    <Link href={"/Contact"}>Customer Support</Link>
                  </Text>
                  <Flex justify={"center"} align="center" p={"1.5rem"}>
                    <AiOutlineCopyright fill="gray" />
                    <Text color={"gray.500"}>2023 Hospital Hand Tools</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </>
        ) : (
          <>
            <Flex justify={"center"} align="center" bg={"gray.100"}>
              <Flex
                my={"2rem"}
                border={"1px"}
                borderColor="gray.300"
                bg="white"
                shadow={"base"}
                direction={"column"}
                ref={componentRef}
              >
                <Flex bg={"gray.200"} justify="center" p={"1rem"} py="1.5rem">
                  <Image
                    src={"/assets/logo.svg"}
                    alt="Logo"
                    width={"200"}
                    height="100"
                    priority={true}
                  />
                </Flex>
                <Box my="1rem" ml={"1rem"}>
                  <Heading size={"md"}>Your Order Confirm!</Heading>
                </Box>
                <Box mb="1rem" ml={"1rem"}>
                  <Text fontWeight={"semibold"}>
                    {" "}
                    Hi{" "}
                    {order ? order.deliveryData.billinguserName : " Customer"}
                  </Text>
                  <Text>
                    Your order have been confirmed and will be update soon.
                  </Text>
                </Box>
                <Divider
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                  mb={"1rem"}
                />
                <Flex justify={"space-between"} mx={"1rem"}>
                  <Box color={"gray.500"}>Order Date</Box>
                  <Box color={"gray.500"}>Order Id#</Box>
                  <Box color={"gray.500"}>Payment</Box>
                </Flex>
                <Flex justify={"space-between"} mx={"1rem"}>
                  <Box>{date}</Box>
                  <Box>{order.orderId ? order.orderId : ""}</Box>
                  <Box>Paypal</Box>
                </Flex>
                <Divider
                  my={"1rem"}
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                />
                <Box>
                  {Object.keys(order.products).map((key) => {
                    return (
                      <Flex key={key} justify={"space-around"} align="center">
                        <Text fontWeight={"semibold"}>
                          {order.products[key].productName}
                        </Text>
                        <Text fontWeight={"medium"}>
                          QTY : {order.products[key].qty}
                        </Text>
                        <Text fontWeight={"medium"}>
                          ${order.products[key].price}
                        </Text>
                      </Flex>
                    );
                  })}
                </Box>
                <Divider
                  my={"1rem"}
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                />

                <Flex direction={"column"} p="1rem" mx={"2rem"}>
                  <Flex mt="0.5rem" justify={"space-between"}>
                    <Box>Box shipping Weight</Box>
                    <Box>${order.WeightPrice}</Box>
                  </Flex>
                  <Flex justify={"space-between"}>
                    <Box>Subtotal</Box>
                    <Box>${order.amount}</Box>
                  </Flex>
                </Flex>
                <Divider
                  mb={"1rem"}
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                />
                <Flex justify={"space-between"} align="center" mx={"2.5rem"}>
                  <Box fontWeight={"semibold"}>Total</Box>
                  <Box fontWeight={"normal"}>${order.grandTotal}</Box>
                </Flex>
                <Divider
                  my={"1.2rem"}
                  w={"95%"}
                  marginInline="auto"
                  border={"1px"}
                  borderColor="gray.200"
                />
                <Box p={"1.5rem"}>
                  <Text>
                    We'll send you shipping confirmation when your item(s) are
                    on the way! We Appreciate <br></br>Your business, and hope
                    you enjoy your purchase.
                  </Text>

                  <Text my={"0.5rem"} fontWeight={"semibold"}>
                    Thank you!
                  </Text>
                  <Text>Hospital Hand Tools</Text>
                </Box>
                <Flex bg={"gray.200"} justify="space-between" align={"center"}>
                  <Text ml="1.3rem">
                    Questions ? Contact our{" "}
                    <Link href={"/Contact"}>Customer Support</Link>
                  </Text>
                  <Flex justify={"center"} align="center" p={"1.5rem"}>
                    <AiOutlineCopyright fill="gray" />
                    <Text color={"gray.500"}>2023 Hospital Hand Tools</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
        {/* <Flex justify={"center"} align="center" bg={"gray.100"}>
          <Flex
            my={"2rem"}
            border={"1px"}
            borderColor="gray.300"
            bg="white"
            shadow={"base"}
            direction={"column"}
            ref={componentRef}
          >
            <Flex bg={"gray.200"} justify="center" p={"1rem"} py="1.5rem">
              <Image
                src={"/assets/logo.svg"}
                alt="Logo"
                width={"200"}
                height="100"
                priority={true}
              />
            </Flex>
            <Box my="1rem" ml={"1rem"}>
              <Heading size={"md"}>Thanks for Order!</Heading>
            </Box>
            <Box mb="1rem" ml={"1rem"}>
              <Text fontWeight={"semibold"}>
                {" "}
                Hi{" "}
                {order.deliveryData.billinguserName
                  ? order.deliveryData.billinguserName
                  : " Customer"}
              </Text>
              <Text>
                Your order have been confirmed and will be shipping soon.
              </Text>
            </Box>
            <Divider
              w={"95%"}
              marginInline="auto"
              border={"1px"}
              borderColor="gray.200"
              mb={"1rem"}
            />
            <Flex justify={"space-between"} mx={"1rem"}>
              <Box color={"gray.500"}>Order Date</Box>
              <Box color={"gray.500"}>Order Id#</Box>
              <Box color={"gray.500"}>Payment</Box>
            </Flex>
            <Flex justify={"space-between"} mx={"1rem"}>
              <Box>{date}</Box>
              <Box>{order.orderId ? order.orderId : ""}</Box>
              <Box>{order.paymentMethod}</Box>
            </Flex>
            <Divider
              my={"1rem"}
              w={"95%"}
              marginInline="auto"
              border={"1px"}
              borderColor="gray.200"
            />
            <Box>
              {Object.keys(order.products).map((key) => {
                return (
                  <Flex key={key} justify={"space-around"} align="center">
                    <Text fontWeight={"semibold"} w="30%">
                      {order.products[key].productName}
                    </Text>
                    <Text fontWeight={"medium"}>
                      QTY : {order.products[key].qty}
                    </Text>
                    <Text fontWeight={"medium"}>
                      ${order.products[key].price}
                    </Text>
                  </Flex>
                );
              })}
            </Box>
            <Divider
              my={"1rem"}
              w={"95%"}
              marginInline="auto"
              border={"1px"}
              borderColor="gray.200"
            />

            <Flex direction={"column"} p="1rem" mx={"2rem"}>
              <Flex mt="0.5rem" justify={"space-between"}>
                <Box>Box shipping Weight</Box>
                <Box>${order.WeightPrice}</Box>
              </Flex>
              <Flex justify={"space-between"}>
                <Box>Subtotal</Box>
                <Box>${order.amount}</Box>
              </Flex>
            </Flex>
            <Divider
              mb={"1rem"}
              w={"95%"}
              marginInline="auto"
              border={"1px"}
              borderColor="gray.200"
            />
            <Flex justify={"space-between"} align="center" mx={"2.5rem"}>
              <Box fontWeight={"semibold"}>Total</Box>
              <Box fontWeight={"normal"}>
                ${order.grandTotal ? order.grandTotal : ""}
              </Box>
            </Flex>
            <Divider
              my={"1.2rem"}
              w={"95%"}
              marginInline="auto"
              border={"1px"}
              borderColor="gray.200"
            />
            <Box p={"1.5rem"}>
              <Text>Your business, and hope you enjoy your purchase.</Text>

              <Text my={"0.5rem"} fontWeight={"semibold"}>
                Thank you!
              </Text>
              <Text>Hospital Hand Tools</Text>
            </Box>
            <Flex bg={"gray.200"} justify="space-between" align={"center"}>
              <Text ml="1.3rem">
                Questions ? Contact our{" "}
                <Link href={"/customer-support"}>Customer Support</Link>
              </Text>
              <Flex justify={"center"} align="center" p={"1.5rem"}>
                <AiOutlineCopyright fill="gray" />
                <Text color={"gray.500"}>2023 Hospital Hand Tools</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex> */}
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  let id = context.query.id;
  console.log("asdasd", id);
  if (id == "") {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }
  await dbConnect();

  const res = await Order.findById(id);
  if (res == null) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }
  console.log("reed", res);
  const posts = await JSON.parse(JSON.stringify(res));
  // console.log("order", posts);
  return {
    props: { order: posts }, // will be passed to the page component as props
  };
}
