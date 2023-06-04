import React, { useEffect, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
// @ts-ignore
import { Widget, WidgetLoader } from "react-cloudinary-upload-widget";

const CloudinaryUploader = ({ setImages2 }) => {
  const cloundinaryRef = useRef();
  const widghtRef = useRef();
  useEffect(() => {
    cloundinaryRef.current = window.cloudinary;
    // console.log(cloundinaryRef.current);
    widghtRef.current = cloundinaryRef.current.createUploadWidget(
      {
        cloudName: "dexc7zdm4",
        uploadPreset: "mbqw8fjf",
      },
      function (error, result) {
        // console.log(result);
        if (result.event == "success") {
          console.log(result.info);
          setImages2((images) => [...images, result.info]);
        }
      }
    );
  }, []);

  return (
    <Button colorScheme="facebook" onClick={() => widghtRef.current.open()}>
      Select Images
    </Button>
  );
};

export default CloudinaryUploader;
