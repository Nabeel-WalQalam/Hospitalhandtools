import { Box, Flex, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import React from "react";
import { EmailIcon, WhatsappIcon } from "react-share";
import { motion } from "framer-motion";
import { BsSkype } from "react-icons/bs";

const Message = () => {
  const { colorMode } = useColorMode();
  const phoneNumber = "923216126225"; // Replace with your client's WhatsApp number
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  function handleWhatsapp() {
    window.open(url, "_blank");
  }

  const emailAddress = "adas.surgical@gmail.com <adas.surgical@gmail.com>"; // Replace with the email address you want to send the email to
  const subject = ""; // Replace with the subject of the email
  const body = ""; // Replace with the body of the email

  function handleEmail() {
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <Flex
        // bg={colorMode === "light" ? "#153A5B" : "white"}
        // width={"98%"}
        // mx="auto"
        display={["none", "none", "Flex"]}
        align={"center"}
        justify={"space-between"}
        py={"0.4rem"}
        width={"90%"}
        mx="auto"
      >
        <Flex
          // style={{ color: "#153A5B", fontWeight: "bold" }}

          cursor={"pointer"}
          justify={"center"}
          gap={"0.6rem"}
          mr="1rem"
        >
          <Tooltip label="WhatsApp" aria-label="WhatsApp">
            <Box
              as={motion.div}
              whileHover={{ scale: 1.1 }}
              // whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <WhatsappIcon
                onClick={handleWhatsapp}
                cursor={"pointer"}
                size={25}
                round={true}
              />
            </Box>
          </Tooltip>
          <Tooltip label="Mail" aria-label="Mail">
            <Box
              as={motion.div}
              whileHover={{ scale: 1.1 }}
              // whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <EmailIcon
                cursor={"pointer"}
                size={25}
                round={true}
                onClick={handleEmail}
              />
            </Box>
          </Tooltip>
          {/* <Tooltip label="Skype" aria-label="Skype">
            <Box
              as={motion.div}
              whileHover={{ scale: 1.1 }}
              // whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <BsSkype
                cursor={"pointer"}
                size={25}
                fill="#00AFF0"
                //   round={true}
                onClick={handleSkype}
              />
            </Box>
          </Tooltip> */}
        </Flex>
        <Box ml="1rem">
          <Text
            fontSize={["0.7rem", "0.7rem", "0.8rem", "0.8rem"]}
            // color={colorMode === "light" ? "white" : "#153A5B"}
            textTransform={"capitalize"}
            fontWeight={"semibold"}
            _hover={{ color: "#153A5B" }}
            color={"gray.500"}
            cursor={"pointer"}
          >
            CALL NOW : +92-3216126225
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default Message;
