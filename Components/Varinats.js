import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box } from "@chakra-ui/react";
export const Varinats = ({ combination }) => {
  const { control, register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(combination).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input type="text" id={key} {...register(key)} />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </Box>
  );
};
