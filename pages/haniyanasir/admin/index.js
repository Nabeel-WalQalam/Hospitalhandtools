import dbConnect from "@/Middleware/connectDb";
import Order from "@/models/Order";
import { withAdminMiddleware } from "@/Middleware/adminMiddlware";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Center,
  Heading,
  Flex,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";
import secureLocalStorage from "react-secure-storage";

const Index = ({ orders }) => {
  const dispatch = useDispatch();
  const { user, active } = useSelector((state) => state.user);
  // console.log("admin", user, active);
  const Router = useRouter();
  const [totalSale, settotalSale] = useState(0);
  const [totalOrders, settotalOrders] = useState(0);
  const [paidOrders, setpaidOrders] = useState(0);
  const [initiatedOrders, setinitiatedOrders] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  // console.log(orders);

  useEffect(() => {
    console.log("admin page");
  }, []);

  useEffect(() => {
    if (orders) {
      let initiated = orders.filter((items) => {
        return items.status == "initiated";
      });

      setinitiatedOrders(initiated.length);
    }
  }, []);

  useEffect(() => {
    if (orders) {
      let PaidOrders = orders.filter((items) => {
        return items.status == "Paid";
      });

      setpaidOrders(PaidOrders.length);
    }
  }, []);

  useEffect(() => {
    if (orders) {
      orders.map((items) => {
        // console.log(items.grandTotal);
        settotalSale((prev) => prev + items.grandTotal);
      });
    }
  }, []);
  useEffect(() => {
    if (orders) {
      settotalOrders(orders.length);
    }
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_HOST}/api/getadminUser`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           token: localStorage.getItem("token"),
  //           identity: localStorage.getItem("identity"),
  //         }),
  //       }
  //     );
  //     const rsult = await response.json();
  //     // console.log(rsult);
  //     if (rsult.success == false) {
  //       Router.push("/");
  //     }

  //     // setuser("rsult.user.displayName");
  //   };

  //   if (localStorage.getItem("token") || localStorage.getItem("identity")) {
  //     fetchUser();
  //   } else {
  //     Router.push("/");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     if (user.role !== "admin" && !active) {
  //       dispatch(setUser(null));
  //       secureLocalStorage.clear();
  //       Router.push("/");
  //     }
  //   } else {
  //     Router.push("/");
  //   }
  // }, [user]);

  const logout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    Router.push("/");
  };

  return (
    <Box width={"100%"} height="100vh">
      <Flex justify={"end"} align={"center"} bg={"#153A5B"}>
        {/* <Box>
          <Heading color={"white"}>Admin Dashboard</Heading>
        </Box> */}
        <Flex align={"center"} justify={"space-evenly"} w={"20%"}>
          <Text color={"white"} fontSize={"2rem"}>
            {user ? user.displayName : "Admin"}
          </Text>

          <Button onClick={logout}>Logout</Button>
        </Flex>
      </Flex>

      <Box mt={"3rem"}>
        <Flex justify="center" gap={"3rem"}>
          <Flex
            border={"1px"}
            borderColor="facebook.200"
            direction="column"
            height={"100px"}
            justify="space-evenly"
            align={"center"}
            w="200px"
          >
            <Text color={"#153A5B"} fontWeight="bold" fontSize={"1rem"}>
              Total Sale
            </Text>
            <Text fontWeight={"semibold"}>${totalSale}</Text>
          </Flex>
          <Flex
            border={"1px"}
            borderColor="facebook.200"
            direction="column"
            height={"100px"}
            justify="space-evenly"
            align={"center"}
            w="200px"
          >
            <Text color={"#153A5B"} fontWeight="bold" fontSize={"1rem"}>
              Total Orders
            </Text>
            <Text fontWeight={"semibold"}>
              {" "}
              {totalOrders ? totalOrders : ""}
            </Text>
          </Flex>
          <Flex
            border={"1px"}
            borderColor="facebook.200"
            direction="column"
            height={"100px"}
            justify="space-evenly"
            align={"center"}
            w="200px"
          >
            <Text color={"#153A5B"} fontWeight="bold" fontSize={"1rem"}>
              Orders that are Paid
            </Text>
            <Text fontWeight={"semibold"}>{paidOrders}</Text>
          </Flex>
          <Flex
            border={"1px"}
            borderColor="facebook.200"
            direction="column"
            height={"100px"}
            justify="space-evenly"
            align={"center"}
            w="200px"
          >
            <Text color={"#153A5B"} fontWeight="bold" fontSize={"1rem"}>
              Orders that are initiated
            </Text>
            <Text fontWeight={"semibold"}> {initiatedOrders}</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
export default withAdminMiddleware(Index);

export async function getServerSideProps(context) {
  await dbConnect();
  let res = await Order.find();
  const res2 = await JSON.parse(JSON.stringify(res));
  return {
    props: { orders: res2 },
  };
}
