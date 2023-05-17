import { Box, Center, Divider, Heading, Text } from "@chakra-ui/react";
import React from "react";
import BreadCrumb from "../Shared/BreadCrumb";

import Items from "./Items";

const PlasticSurgery = ({ categoryList, slug }) => {
  // console.log("category", categoryList);
  return (
    <>
      <Box mt={"2rem"}>
        <Items categoryList={categoryList} slug={slug} />
      </Box>
    </>
  );
};

export default PlasticSurgery;
