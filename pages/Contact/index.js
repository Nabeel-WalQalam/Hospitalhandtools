import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Divider,
  Checkbox,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import {
  BsPinterest,
  BsYoutube,
  BsInstagram,
  BsPerson,
  BsPhone,
  BsSmartwatch,
} from "react-icons/bs";
import Link from "next/link";
import { useRef, useState, Fragment } from "react";
import { useToast } from "@chakra-ui/react";
import BreadCrumb from "@/Components/Shared/BreadCrumb";
import { BiLocationPlus } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";

const information = [
  {
    id: 1,
    logo: <MdLocationOn fontSize={"30px"} fill="#153A5B" />,
    title: "STORE ADDRESS",
    msg: `
    Nawan Pind
Daak Khana Chitti Sheikhan
    `,
    msg2: "Sialkot, Pakistan",
  },
  {
    id: 2,
    logo: <BsPhone fontSize={"30px"} fill="#153A5B" />,
    title: "CALL US",
    msg: "Call / WhatsApp / Viber / WeChat",
    msg2: "00923216126225",
  },
  {
    id: 3,
    logo: <BsSmartwatch fontSize={"30px"} fill="#153A5B" />,
    title: "STORE HOURS",
    msg: "Mon-Fri: 09:00 - 18:00",
    msg2: "Weekend: 11:00 - 15:00",
  },
  {
    id: 4,
    logo: <RiCustomerService2Fill fontSize={"30px"} fill="#153A5B" />,
    title: "SUPPORT",
    msg: "Customer support 24/7",
  },
];

export default function Contact() {
  const name = useRef();
  const email = useRef();
  const message = useRef();
  const toast = useToast();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = async () => {
    const getname = name.current.value;
    const getemail = email.current.value;
    const getmessage = message.current.value;
    // console.log(getname, getemail, getmessage);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: getname,
          email: getemail,
          message: getmessage,
          sendMail: true,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      toast({
        title: "Email Successfully Send",
        description: "Check your Email for confirmation Link !",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });

      setIsButtonDisabled(true);
    } else {
      toast({
        title: "Error Occured",
        status: "error",
        position: "top-left",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Fragment>
      <Box bg={"gray.100"} p="0.6rem">
        <BreadCrumb>contact us</BreadCrumb>
      </Box>
      <Box width={"85%"} mx="auto" mt="1rem">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3364.0786327351193!2d74.49829717557985!3d32.52404677377038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ee967e555556f%3A0x5036ead1a061586b!2sAdas%20Surgical%20Instruments!5e0!3m2!1sen!2s!4v1688231732697!5m2!1sen!2s"
          // width="900"
          height="300"
          style={{ border: 0, width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
      <Flex my="1.5rem" width={"85%"} mx="auto">
        <Flex
          width={"33%"}
          padding={"20px"}
          background="rgba(238, 238, 238, 1)"
          direction={"column"}
          // border={"1px"}
          gap={"1.5rem"}
        >
          {information &&
            information.map((data) => {
              return (
                <Flex
                  width={"95%"}
                  mx="auto"
                  key={data.id}
                  align={"center"}
                  justify={"flex-start"}
                  gap="1rem"
                  padding={"7px"}
                >
                  <Box>{data.logo}</Box>
                  <Flex direction={"column"}>
                    <Text fontWeight={"bold"} fontSize={"14px"}>
                      {data.title}
                    </Text>
                    <Text color={"gray.500"} fontSize={"13px"}>
                      {data.msg}
                    </Text>
                    <Text color={"gray.500"} fontSize={"13px"}>
                      {data.msg2 ? data.msg2 : null}
                    </Text>
                    {data.msg2 ? (
                      <Divider
                        borderColor={"#153A5B"}
                        width={"100%"}
                        my={"0.4rem"}
                      />
                    ) : null}
                  </Flex>
                </Flex>
              );
            })}
        </Flex>
        <Box p={"20px"} width={"70%"}>
          <Heading size={"md"}>Looking forward to hearing from you</Heading>
          <Flex mt={"1rem"} gap={"1.5rem"} direction={"column"} width={"85%"}>
            <FormControl isRequired display={"flex"}>
              <FormLabel fontWeight={"normal"} width={"20%"}>
                Your Name
              </FormLabel>
              <Input
                borderRadius={"none"}
                bg="rgba(250, 250, 250, 1)"
                _hover={{
                  bg: "white",
                  border: "1px solid #153A5B",
                }}
                placeholder="Your Name"
              />
            </FormControl>
            <FormControl isRequired display={"flex"}>
              <FormLabel fontWeight={"normal"} width={"20%"}>
                Your Email
              </FormLabel>
              <Input
                borderRadius={"none"}
                bg="rgba(250, 250, 250, 1)"
                _hover={{
                  bg: "white",
                  border: "1px solid #153A5B",
                }}
                placeholder="Your Email"
                type="email"
              />
            </FormControl>
            <FormControl isRequired>
              <Flex>
                <FormLabel fontWeight={"normal"} width={"20%"}>
                  Message
                </FormLabel>
                <Textarea
                  borderRadius={"none"}
                  bg="rgba(250, 250, 250, 1)"
                  _hover={{
                    bg: "white",
                    border: "1px solid #153A5B",
                  }}
                  // value={value}
                  // onChange={handleInputChange}
                  placeholder="Message"
                  size="sm"
                />
              </Flex>
            </FormControl>
          </Flex>
          <Box my={"1rem"}>
            <Checkbox>
              I have read and agree to the{" "}
              <Text
                display={"inline"}
                textDecor={"underline"}
                fontWeight={"medium"}
              >
                {" "}
                Privacy Policy
              </Text>
            </Checkbox>
          </Box>
          <Box>
            <Button
              _hover={{
                shadow: "2xl",
              }}
              width={"100%"}
              borderRadius={"none"}
              bg="#153A5B"
              color={"white"}
              my="1.5rem"
              textTransform={"uppercase"}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Flex>
    </Fragment>
  );
}
