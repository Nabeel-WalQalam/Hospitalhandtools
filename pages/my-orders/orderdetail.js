import dbConnect from "@/Middleware/connectDb";
import Order from "@/models/Order";
import React, { useEffect, useState } from "react";
import { AiFillBank } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
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
  useColorMode,
  List,
  ListItem,
  ListIcon,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineCopyright } from "react-icons/ai";
import { Progress } from "@chakra-ui/react";
import { FaOpencart, FaShippingFast, FaHome } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { FiPackage } from "react-icons/fi";
import { BsFillGiftFill, BsSendCheckFill } from "react-icons/bs";
import { BsBagCheck } from "react-icons/bs";

import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

export default function Orderdetail({ order }) {
  const { colorMode } = useColorMode();
  // const orderData = JSON.parse(order.paymentInfo);

  const d = Date.parse(order.createdAt);
  const date = new Date(d).toISOString().slice(0, 10);
  // console.log(order);

  const [show, setShow] = useState(false);
  const [value, setvalue] = useState(0);

  return (
    <>
      <Box>
        {order.status == "initiated" ? (
          <Flex
            justify={"space-evenly"}
            direction={["column", "column", "row", "row"]}
            bg={"gray.100"}
          >
            <Flex
              display={order.status == "initiated" ? "block" : "none"}
              my={"2rem"}
              border={"1px"}
              borderColor="gray.300"
              // bg="white"
              shadow={"base"}
              direction={"column"}
              p="2rem"
              bg="#153A5B"
            >
              <Flex align={"center"} justify="center">
                <AiFillBank fontSize={"2rem"} fill="white" />
                <Heading color={"white"} size={["lg", "lg", "md", "lg"]}>
                  Bank Transfer Instructions
                </Heading>
              </Flex>
              <Text my={"1rem"} fontWeight={"bold"} color="white">
                Please transfer the total amount to the following bank account.
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
            </Flex>

            <Flex
              my={"2rem"}
              border={"1px"}
              borderColor="gray.300"
              bg="white"
              shadow={"base"}
              direction={"column"}
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
                  <Heading color={"#153A5B"} size={"md"}>
                    Your Order Initiated ! Please Pay the Total Amount to
                    Confirm
                  </Heading>
                ) : (
                  <Heading color={"#153A5B"} size={"md"}>
                    Your Order Confirm!
                  </Heading>
                )}
              </Box>
              <Box mb="1rem" ml={"1rem"}>
                <Text color={"#153A5B"} fontWeight={"semibold"}>
                  {" "}
                  Hi{" "}
                  {order.deliveryData.billinguserName
                    ? order.deliveryData.billinguserName
                    : " Customer"}
                </Text>

                {order.status == "initiated" ? (
                  <Text color={"#153A5B"}>Pay to confirm.</Text>
                ) : (
                  <Text color={"#153A5B"}>
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
                <Box color={"#153A5B"}>{date}</Box>
                <Box color={"#153A5B"}>
                  {order.orderId ? order.orderId : ""}
                </Box>
                <Box color={"#153A5B"}>{order.paymentMethod}</Box>
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
                      <Flex my={"0.5rem"} direction={"column"} width={"25%"}>
                        <Text color={"#153A5B"} fontWeight={"semibold"}>
                          {order.products[key].title}
                        </Text>
                        <Text>
                          {order.products[key].options
                            ? order.products[key].options
                            : ""}
                        </Text>
                      </Flex>
                      <Text color={"#153A5B"} fontWeight={"medium"}>
                        QTY : {order.products[key].quantity}
                      </Text>
                      <Text color={"#153A5B"} fontWeight={"medium"}>
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
                <Flex direction={"column"} p="1rem" mx={"2rem"}>
                  <Flex justify={"space-between"}>
                    <Box color={"#153A5B"}>Subtotal</Box>
                    <Box color={"#153A5B"}>${order.amount.toFixed(2)}</Box>
                  </Flex>
                  <Flex mt="0.5rem" justify={"space-between"}>
                    <Box color={"#153A5B"}>Box shipping Weight</Box>
                    <Box color={"#153A5B"}>${order.WeightPrice}</Box>
                  </Flex>
                  {order.isCoupenApplid ? (
                    <Flex justify={"space-between"}>
                      <Box color={"#153A5B"}>Total :</Box>
                      <Box color={"#153A5B"}>
                        ${order.grandTotal.toFixed(2)}
                      </Box>
                    </Flex>
                  ) : (
                    ""
                  )}
                  {order.isCoupenApplid ? (
                    <Flex justify={"space-between"}>
                      <Box color={"#153A5B"}>Price After Discount :</Box>
                      <Box color={"#153A5B"}>${order.discountPrice}</Box>
                    </Flex>
                  ) : (
                    ""
                  )}
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
                <Box color={"#153A5B"} fontWeight={"semibold"}>
                  Total
                </Box>
                <Box color={"#153A5B"} fontWeight={"normal"}>
                  $
                  {order.isCoupenApplid
                    ? order.discountPrice
                    : order.grandTotal}
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
                <Text color={"#153A5B"}>
                  We'll send you shipping confirmation when your item(s) are
                  Confirm! We Appreciate <br></br>Your business, and hope you
                  enjoy your purchase.
                </Text>

                <Text color={"#153A5B"} my={"0.5rem"} fontWeight={"semibold"}>
                  Thank you!
                </Text>
                <Text>Hospital Hand Tools</Text>
              </Box>
              <Flex bg={"gray.200"} justify="space-between" align={"center"}>
                <Text color={"#153A5B"} ml="1.3rem">
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
        ) : (
          <>
            <Box bg={"#153A5B"}>
              <Center>
                <Heading color={"white"}>Delivery Status</Heading>
              </Center>
            </Box>
            <Box>
              <Progress
                value={
                  order.DeliveryStatus == "Processing"
                    ? 20
                    : order.DeliveryStatus == "Shipping"
                    ? 40
                    : order.DeliveryStatus == "On-Way"
                    ? 60
                    : 100
                }
                // value={20}
                size="sm"
                colorScheme="blue"
              />
              <Flex
                py={"1.2rem"}
                //   w={"90%"}
                //   marginInline="auto"
                justify={"space-evenly"}
                bg={colorMode === "light" ? "gray.300" : "#153A5B"}
                align="center"
              >
                <Flex direction={"column"} align={"center"}>
                  {order.DeliveryStatus == "Processing" ? (
                    <Spinner
                      size={"xl"}
                      thickness="4px"
                      color={colorMode == "light" ? "#153A5B" : "white"}
                    />
                  ) : (
                    <AiOutlineCheck fontSize={"2rem"} />
                  )}

                  <Text
                    fontWeight={"semibold"}
                    fontSize={["1rem", "1.1rem", "1.2rem"]}
                  >
                    Processing
                  </Text>
                </Flex>
                <Flex direction={"column"} align={"center"}>
                  {order.DeliveryStatus == "Shipping" ? (
                    <Spinner
                      size={"xl"}
                      thickness="4px"
                      color={colorMode == "light" ? "#153A5B" : "white"}
                    />
                  ) : (
                    <RxCross2 fontSize={"2rem"} />
                  )}

                  <Text
                    fontWeight={"semibold"}
                    fontSize={["1rem", "1.1rem", "1.2rem"]}
                  >
                    Working
                  </Text>
                </Flex>
                <Box>
                  <FaShippingFast
                    fill={order.DeliveryStatus == "On-Way" ? "maroon" : "clack"}
                    fontSize={"4rem"}
                  />
                  <Text
                    color={
                      order.DeliveryStatus == "On-Way" ? "maroon" : "maroon"
                    }
                  >
                    On-Way
                  </Text>
                </Box>
                <Box>
                  <BsFillGiftFill
                    fill={
                      order.DeliveryStatus == "Delivered" ? "brown" : "black"
                    }
                    fontSize={"4rem"}
                  />
                  <Text
                    color={order.DeliveryStatus == "Delivered" ? "brown" : ""}
                  >
                    Delivered
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Flex justify={"center"} align="center" bg={"gray.100"}>
              <Flex
                my={"2rem"}
                border={"1px"}
                borderColor="gray.300"
                bg="white"
                shadow={"base"}
                direction={"column"}
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
                  <Heading size={"md"} color={"#153A5B"}>
                    Your Order Confirm!
                  </Heading>
                </Box>
                <Box mb="1rem" ml={"1rem"}>
                  <Text color={"#153A5B"} fontWeight={"semibold"}>
                    {" "}
                    Hi{" "}
                    {order ? order.deliveryData.billinguserName : " Customer"}
                  </Text>
                  <Text color={"#153A5B"}>
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
                  <Box color={"#153A5B"}>{date}</Box>
                  <Box color={"#153A5B"}>
                    {order.orderId ? order.orderId : ""}
                  </Box>
                  <Box color={"#153A5B"}>{order.paymentMethod}</Box>
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
                        <Flex my={"0.5rem"} direction={"column"} width={"25%"}>
                          <Text color={"#153A5B"} fontWeight={"semibold"}>
                            {order.products[key].title}
                          </Text>
                          <Text>
                            {order.products[key].options
                              ? order.products[key].options
                              : ""}
                          </Text>
                        </Flex>
                        <Text color={"#153A5B"} fontWeight={"medium"}>
                          QTY : {order.products[key].quantity}
                        </Text>
                        <Text color={"#153A5B"} fontWeight={"medium"}>
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
                  <Flex direction={"column"} p="1rem" mx={"2rem"}>
                    <Flex justify={"space-between"}>
                      <Box color={"#153A5B"}>Subtotal</Box>
                      <Box color={"#153A5B"}>${order.amount.toFixed(2)}</Box>
                    </Flex>
                    <Flex mt="0.5rem" justify={"space-between"}>
                      <Box color={"#153A5B"}>Box shipping Weight</Box>
                      <Box color={"#153A5B"}>${order.WeightPrice}</Box>
                    </Flex>
                    {order.isCoupenApplid ? (
                      <Flex justify={"space-between"}>
                        <Box color={"#153A5B"}>Total :</Box>
                        <Box color={"#153A5B"}>
                          ${order.grandTotal.toFixed(2)}
                        </Box>
                      </Flex>
                    ) : (
                      ""
                    )}
                    {order.isCoupenApplid ? (
                      <Flex justify={"space-between"}>
                        <Box color={"#153A5B"}>Price After Discount :</Box>
                        <Box color={"#153A5B"}>${order.discountPrice}</Box>
                      </Flex>
                    ) : (
                      ""
                    )}
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
                  <Box color={"#153A5B"} fontWeight={"semibold"}>
                    Total
                  </Box>
                  <Box color={"#153A5B"} fontWeight={"normal"}>
                    $
                    {order.isCoupenApplid
                      ? order.discountPrice
                      : order.grandTotal}
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
                  <Text color={"#153A5B"}>
                    We'll send you shipping confirmation when your item(s) are
                    on the way! We Appreciate <br></br>Your business, and hope
                    you enjoy your purchase.
                  </Text>

                  <Text color={"#153A5B"} my={"0.5rem"} fontWeight={"semibold"}>
                    Thank you!
                  </Text>
                  <Text>Hospital Hand Tools</Text>
                </Box>
                <Flex bg={"gray.200"} justify="space-between" align={"center"}>
                  <Text color={"#153A5B"} ml="1.3rem">
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
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  let id = context.query.id;
  // console.log("asdasd", id);

  await dbConnect();

  const res = await Order.findOne({ orderId: id });
  if (res == null) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  //   console.log("reed", res);
  const posts = await JSON.parse(JSON.stringify(res));
  // console.log("order", posts);
  return {
    props: { order: posts }, // will be passed to the page component as props
  };
}
