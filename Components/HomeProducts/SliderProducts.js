import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LatestProduct from "../HomeSliderProduct/LatestProduct";
const SliderProducts = () => {
  return (
    <>
      <Tabs display={["none", "block"]}>
        <TabList color={"rgba(139, 145, 152, 1)"}>
          <Tab
            fontWeight={["normal", "bold"]}
            textTransform={["lowercase", "uppercase"]}
          >
            Latest
          </Tab>
          <Tab
            fontWeight={["normal", "bold"]}
            textTransform={["lowercase", "uppercase"]}
          >
            BestSellers
          </Tab>

          <Tab
            fontWeight={["normal", "bold"]}
            textTransform={["lowercase", "uppercase"]}
          >
            Specials
          </Tab>
          <Tab
            fontWeight={["normal", "bold"]}
            textTransform={["lowercase", "uppercase"]}
          >
            All Products
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <LatestProduct />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>four!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default SliderProducts;
