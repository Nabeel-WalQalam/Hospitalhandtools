import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react";
import crypto from "crypto";
// @ts-ignore
import { Widget, WidgetLoader } from "react-cloudinary-upload-widget";

const CloudinaryUploader = ({ setImages2, images, loading }) => {
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

  useEffect(() => {
    setImages2([]);
  }, [loading]);

  const handleImageDelete = async (Public_id, signature2, id, deleteToken) => {
    // setdisableButton2(true);
    const timestamp = new Date().getTime();
    const Latestsignature = generateSHA1(
      generateSignature(Public_id, "cE_mxtg1AcfO-3q8A84vGy0v2Kg")
    );
    try {
      await fetch(`https://api.cloudinary.com/v1_1/dexc7zdm4/image/destroy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: Public_id,
          signature: Latestsignature,
          api_key: "196271779257317",
          timestamp: timestamp,
        }),
      });

      setImages2((prevImages) => prevImages.filter((image) => image.id !== id));
      // setCategoryImages((prevImages) =>
      //   prevImages.filter((image) => image.id !== id)
      // );

      // setValue(`subCategory.${index}.image`, "");
      // setdisableButton2(false);
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  const generateSHA1 = (data) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  return (
    <React.Fragment>
      <Heading color={"#153A5B"} size={"lg"} marginBottom={"0.5rem"}>
        Upload Product Images
      </Heading>
      <Button
        width={"30%"}
        colorScheme="facebook"
        onClick={() => widghtRef.current.open()}
      >
        Select Images
      </Button>
      <Flex gap="1rem" margin={"2rem"}>
        {images.length != 0
          ? images.map((items) => (
              <Box position={"relative"} key={items.id}>
                <Image
                  border={"1px"}
                  borderColor={"gray.300"}
                  width={"150px"}
                  height={"150px"}
                  src={items.url}
                  alt="images"
                />
                <CloseButton
                  // border={"1px"}
                  // borderColor={"gray.200"}
                  bg="gray.100"
                  // color={"blue"}
                  zIndex={"9999"}
                  position={"absolute"}
                  top={"0px"}
                  right="0rem"
                  onClick={() =>
                    handleImageDelete(
                      items.public_id,
                      items.signature,
                      items.id,
                      items.delete_token,
                      null
                    )
                  }
                />
              </Box>
            ))
          : null}
      </Flex>
    </React.Fragment>
  );
};

export default CloudinaryUploader;
