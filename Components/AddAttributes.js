import React, { useEffect, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { colourOptions } from "../data";
import { Box } from "@chakra-ui/react";

const animatedComponents = makeAnimated();
export const AddAttributes = ({ data, setSizeList }) => {
  // console.log("data", data);
  const [list, setlist] = useState([]);
  const [combination, setcombination] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      temp.push({ value: i, label: data[i] });
    }
    setlist(temp);
  }, [data]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  useEffect(() => {
    if (selectedOptions) {
      let tempAr = [];
      selectedOptions.map((items) => {
        tempAr.push(items.label);
      });
      setSizeList(tempAr);
    }
  }, [selectedOptions]);

  // console.log("selected options", selectedOptions);

  return (
    <Box width={"80%"}>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        //   defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={list}
        onChange={handleSelectChange}
      />
    </Box>
  );
};
