import dbConnect from "@/Middleware/connectDb";
import User from "@/models/User";
import React from "react";
import { UserTable } from "@/Components/Table/UserTable";
import { Box, Center, Heading } from "@chakra-ui/react";

export default function users({ Users }) {
  // console.log("users", Users);
  return (
    <>
      <Box width={"100%"} height="100vh">
        <Box bg={"#153A5B"}>
          <Center>
            <Heading color="white">All Registerd Users</Heading>
          </Center>
        </Box>
        <UserTable Users={Users} />
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  const res = await User.find();
  const posts = await JSON.parse(JSON.stringify(res));

  return {
    props: { Users: posts }, // will be passed to the page component as props
  };
}
