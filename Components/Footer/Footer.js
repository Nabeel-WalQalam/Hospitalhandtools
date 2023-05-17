import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  Button,
  List,
  ListItem,
  IconButton,
  useColorModeValue,
  Heading,
  useColorMode,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import Image from "next/image";
import { EmailIcon, WhatsappIcon } from "react-share";
import { motion } from "framer-motion";

export default function Footer() {
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
    <Box bg={"#153A5B"} color={useColorModeValue("gray.700", "gray.200")}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={20}
        >
          <Stack spacing={6}>
            <Box>
              <Link href={"/"}>
                <Text color={"white"}>Hospital Hands Tools </Text>
              </Link>
            </Box>
            <Text color={"white"} fontSize={"sm"}>
              © 2022 Hospital Hands Tools 2023. All rights reserved
            </Text>
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
                    size={35}
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
                    size={35}
                    round={true}
                    onClick={handleEmail}
                  />
                </Box>
              </Tooltip>
            </Flex>
          </Stack>
          <Stack align={"flex-start"}>
            <Heading size={"md"} color={"white"}>
              Information
            </Heading>
            <Link href={"/About"}>
              <Text color={"white"}>About us</Text>
            </Link>
            <Link href={"/Blogs"}>
              <Text color={"white"}>Blog</Text>
            </Link>

            <Link href={"#"}>
              <Text color={"white"}>Terms & Condition</Text>
            </Link>
            <Link href={"/privacy"}>
              <Text color={"white"}>Privacy Policy</Text>
            </Link>
            <Link href={"/#"}>
              <Text color={"white"}>Site Map</Text>
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Heading size={"md"} color="White">
              Customer Service
            </Heading>
            <Link href={"/Contact"}>
              <Text color={"white"}>Contact us </Text>
            </Link>
            <Link href={"#"}>
              <Text color={"white"}>Return</Text>
            </Link>
            <Link href={"#"}>
              <Text color={"white"}>Track Your Order</Text>
            </Link>
            <Link href={"/Auth"}>
              <Text color={"white"}>Login</Text>
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Heading size={"md"} color="white">
              Stay up to date
            </Heading>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={"1px"}
                borderColor="gray"
                color="white"
              />
              <IconButton
                bg={"white"}
                color={"#153A5B"}
                _hover={{
                  bg: "green.600",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
