import React, { useEffect, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { colourOptions } from "../data";
import { Box } from "@chakra-ui/react";

const animatedComponents = makeAnimated();
export const SelectAttributes = ({
  data,
  onAttributeChange,
  index,
  setProductData,
  combinationList,
}) => {
  // console.log("data", data, setProductData);
  const [list, setlist] = useState([]);
  const [combination, setcombination] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [preData, setpreData] = useState([]);

  // console.log("lateset", setProductData);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      temp.push({ value: i, label: data[i] });
    }
    setlist(temp);
  }, []);

  const handleSelectChange = (selectedOptions) => {
    // console.log("select", selectedOptions, preData);

    setSelectedOptions(selectedOptions);
    const selectedLabels = selectedOptions.map((option) => option.label);
    onAttributeChange(index, selectedLabels);
  };

  // useEffect(() => {
  //   if (selectedOptions) {
  //     let tempAr = [];
  //     selectedOptions.map((items) => {
  //       tempAr.push(items.label);
  //     });
  //     setSizeList(tempAr);
  //   }
  // }, [selectedOptions]);

  useEffect(() => {
    // console.log("run again");

    if (setProductData) {
      onAttributeChange(index, setProductData);
    }
  }, []);
  useEffect(() => {
    let temp = [];
    // for (let i = 0; i < setProductData.length; i++) {
    //   console.log("fields", setProductData);
    //   temp.push({ value: i, label: setProductData[i] });
    // }
    // setpreData(temp);
    if (combinationList) {
      for (let i = 0; i < combinationList.length; i++) {
        // console.log("fields", combinationList[i]);
        temp.push({ value: i, label: combinationList[i] });
        // combinationList[i].map((items, index) => {
        //   console.log(i, items);
        //   temp.push({ value: i, label: items });
        // });
      }
      setpreData(temp);
    }
  }, [combinationList]);

  // console.log("selected options", preData);

  return (
    <Box width={"80%"}>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        value={preData}
        options={list}
        onChange={handleSelectChange}
      />
    </Box>
  );
};
