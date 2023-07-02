import dbConnect from "@/Middleware/connectDb";
import Order from "@/models/Order";
import Calendar from "react-calendar";
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
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Divider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";
import secureLocalStorage from "react-secure-storage";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { UserTable } from "@/Components/Table/UserTable";
import User from "@/models/User";
import Weather from "@/Components/Weather";
import "react-calendar/dist/Calendar.css";
import Zone from "@/models/Zone";

const Index = ({ orders, products, category, Users, zones }) => {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch();
  const { user, active } = useSelector((state) => state.user);
  // console.log("admin", user, active);
  const Router = useRouter();
  const [totalSale, settotalSale] = useState(0);
  const [totalOrders, settotalOrders] = useState(0);
  const [paidOrders, setpaidOrders] = useState(0);
  const [initiatedOrders, setinitiatedOrders] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const [weatherData, setWeatherData] = useState(null);
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      // Use the OpenWeatherMap API to fetch weather data
      // You will need to replace 'YOUR_API_KEY' with your actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=bab82d8bb95d1a1e70e1ac77902ae72f`
      );
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  return (
    <Box width={"100%"} p="0.5rem">
      <Flex justify={"end"} align={"center"} bg={"gray.200"}>
        {/* <Box>
          <Heading color={"white"}>Admin Dashboard</Heading>
        </Box> */}
        <Flex py="0.3rem" align={"center"} justify={"space-evenly"} w={"20%"}>
          <Menu>
            <MenuButton
              border="1px"
              borderColor="black"
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"md"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
            </MenuButton>
            <MenuList
              position="absolute"
              right="0px"
              width="10%"
              alignItems={"center"}
            >
              <br />
              <Center>
                <Avatar
                  size={"2xl"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </Center>
              <br />
              <Center>
                <p>Adas Admin</p>
              </Center>
              <br />
              <MenuDivider />

              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Box mt={"1rem"}>
        <Flex justify="center" wrap="wrap" gap={"2rem"}>
          <Flex
            border={"1px"}
            borderColor="facebook.200"
            direction="column"
            height={"100px"}
            justify="space-evenly"
            // align={"center"}
            w="300px"
            bg="#153A5B"
            p="1rem"
          >
            <Text color={"white"} fontWeight="semibold" fontSize={"2rem"}>
              Total Sale
            </Text>
            <Text fontWeight={"semibold"} color="white" fontSize={"1.5rem"}>
              ${totalSale}
            </Text>
          </Flex>
          <Flex
            border={"1px"}
            borderColor="facebook.200"
            direction="column"
            height={"100px"}
            justify="space-evenly"
            // align={"center"}
            bg="#153A5B"
            w="300px"
            p="1rem"
          >
            <Text color={"white"} fontWeight="semibold" fontSize={"2rem"}>
              Total Orders
            </Text>
            <Text fontWeight={"semibold"} color="white" fontSize={"1.5rem"}>
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
            bg="#153A5B"
            // align={"center"}
            w="300px"
            p="1rem"
          >
            <Text fontWeight={"semibold"} color="white" fontSize={"2rem"}>
              Total Products
            </Text>
            <Text fontWeight={"semibold"} color="white" fontSize={"1.5rem"}>
              {products ? products.length : 0}
            </Text>
          </Flex>
          <Flex
            border={"1px"}
            borderColor="facebook.200"
            direction="column"
            height={"100px"}
            justify="space-evenly"
            bg="#153A5B"
            // align={"center"}
            w="300px"
            p="1rem"
          >
            <Text fontWeight={"semibold"} color="white" fontSize={"2rem"}>
              Total Category
            </Text>
            <Text fontWeight={"semibold"} color="white" fontSize={"1.5rem"}>
              {" "}
              {category ? category.length : 0}
            </Text>
          </Flex>
          <Flex
            border={"1px"}
            borderColor="facebook.200"
            direction="column"
            height={"100px"}
            justify="space-evenly"
            bg="#153A5B"
            // align={"center"}
            w="300px"
            p="1rem"
          >
            <Text fontWeight={"semibold"} color="white" fontSize={"2rem"}>
              Total Zone
            </Text>
            <Text fontWeight={"semibold"} color="white" fontSize={"1.5rem"}>
              {" "}
              {zones ? zones.length : 0}
            </Text>
          </Flex>
        </Flex>
      </Box>
      {/* <Divider marginY="0.5rem" /> */}
      <Flex gap="3rem" marginTop="0.5rem">
        <Box
          marginLeft="2rem"
          marginTop="1rem"
          width="50%"
          border="1px"
          borderColor="gray.500"
        >
          <Center fontSize="1.2rem" color="white" bg="#153A5B">
            Register Users
          </Center>
          <UserTable Users={Users} />
        </Box>
        <Flex direction="column" width="40%" gap="1rem">
          <Box marginTop="1rem" width="100%" borderColor="gray.500">
            {weatherData ? (
              <>
                {/* <Heading>Weather</Heading> */}
                <Weather weatherData={weatherData} />
              </>
            ) : (
              <Text>Loading weather data...</Text>
            )}
          </Box>
          <Box width="100%">
            {/* <Heading>Calender</Heading> */}
            <Calendar onChange={onChange} value={value} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
export default withAdminMiddleware(Index);

export async function getServerSideProps(context) {
  await dbConnect();

  try {
    let res = await Order.find();
    let res1 = await Product.find();
    let res0 = await Category.find();
    let user = await User.find();
    let zone = await Zone.find();
    const res2 = await JSON.parse(JSON.stringify(res));
    const res3 = await JSON.parse(JSON.stringify(res1));
    const res4 = await JSON.parse(JSON.stringify(res0));
    const posts = await JSON.parse(JSON.stringify(user));
    const allZones = await JSON.parse(JSON.stringify(zone));
    return {
      props: {
        orders: res2,
        products: res3,
        category: res4,
        Users: posts,
        zones: allZones,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
