import { Box, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

export const Tags = ({ tags, setTags }) => {
  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <React.Fragment>
      <Box
        border={"1px"}
        p={"1rem"}
        borderColor={"gray.300"}
        borderRadius={"9px"}
      >
        <FormLabel fontSize={"1.5rem"}>Add Products-Tags</FormLabel>
        <div className="tags-input-container">
          {tags.map((tag, index) => (
            <div className="tag-item" key={index}>
              <span className="text">{tag}</span>
              <span className="close" onClick={() => removeTag(index)}>
                &times;
              </span>
            </div>
          ))}
          <Input
            onKeyDown={handleKeyDown}
            type="text"
            className="tags-input"
            placeholder="Type somthing"
          />
        </div>
      </Box>
    </React.Fragment>
  );
};
