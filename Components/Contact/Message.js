import {
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { EmailIcon, FacebookMessengerIcon, WhatsappIcon } from "react-share";
import { motion } from "framer-motion";
import { BsSkype } from "react-icons/bs";
import { useSelector } from "react-redux";
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";

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
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Flex
        // bg={colorMode === "light" ? "#153A5B" : "white"}
        // width={"98%"}
        // mx="auto"
        display={["none", "none", "none", "flex"]}
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
          <Tooltip label="Messenger" aria-label="Messenger">
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
              <FacebookMessengerIcon
                cursor={"pointer"}
                size={22}
                round={true}
                color="#153A5B"
              />
            </Box>
          </Tooltip>
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
                size={22}
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
                size={22}
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
      <Flex display={["flex", "flex", "flex", "none"]}>
        <Flex align={"center"}>
          {!user ? (
            <Link href={"/Auth"}>
              <Button
                variant={"none"}
                leftIcon={<BiUserCircle fontSize={"20px"} />}
                // ml={"0.5rem"}
                // fontSize="1.5rem"
                color={colorMode === "light" ? "#153A5B" : "white"}
                fontWeight="semibold"
              >
                My Account
              </Button>
            </Link>
          ) : (
            <Box>
              <Box>
                <Text
                  textTransform={"Capitalize"}
                  fontWeight={"semibold"}
                  // fontSize="1.5rem"
                  textDecoration="underline"
                >
                  {user.displayName ? user.displayName : ""}
                </Text>
              </Box>
              <Flex direction={"column"}>
                <Link href={"/my-orders"}>
                  <Box fontSize="1.2rem">Orders</Box>
                </Link>
                <Box fontSize="1.2rem">Logout</Box>
              </Flex>
            </Box>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Message;
