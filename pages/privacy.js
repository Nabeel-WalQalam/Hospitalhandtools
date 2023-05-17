import { Box, Center, Divider, Heading, Text } from "@chakra-ui/react";
import React from "react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";

export default function Privacy() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg="gray.200" minheight={"100vh"}>
        <Box bg={"#153A5B"}>
          <Center>
            <Heading color={"white"}>Privacy Policy</Heading>
          </Center>
        </Box>
        <Box p={"2rem"} lineHeight="25px">
          <Heading my={"1rem"} color={"#153A5B"} size="md">
            What Personal Information About Customers Does Hospital Hand Tools
            Gather?
          </Heading>
          <UnorderedList color={colorMode === "light" ? "#153A5B" : "#153A5B"}>
            <ListItem>
              The information we learn from customers helps us personalize and
              continually improve your shopping experience at Adas Instruments
              Here are the types of information we gather.
            </ListItem>

            <ListItem>
              Information You Give Us: We receive and store any information you
              enter on our Web site or give us in any other way. We use the
              information that you provide for such purposes as responding to
              your requests, customizing future shopping for you, and
              communicating with you.
            </ListItem>

            <ListItem>
              {" "}
              Automatic Information: We receive and store certain types of
              information whenever you interact with us. For example, like many
              Web sites, we use "cookies," and we obtain certain types of
              information when your Web browser accesses adasinstrument.com.
            </ListItem>

            <ListItem>
              E-mail Communications: To help us make e-mails more useful and
              interesting, we often receive a confirmation when you open e-mail
              from Adas Instruments if your computer supports such capabilities.
              If you do not want to receive e-mail or other mail from us, please
              adjust your Customer Communication Preferences.
            </ListItem>
          </UnorderedList>
          <Divider />
          <Heading my="1rem" color={"#153A5B"} size="md">
            What about Cookies?
          </Heading>
          <Text color={colorMode === "light" ? "#153A5B" : "#153A5B"}>
            Cookies are alphanumeric identifiers that we transfer to your
            computer's hard drive through your Web browser to enable our systems
            to recognize your browser and to provide features such as storage of
            items in your Shopping Cart between visits.
            <br></br>
            The Help portion of the toolbar on most browsers will tell you how
            to prevent your browser from accepting new cookies, how to have the
            browser notify you when you receive a new cookie, or how to disable
            cookies altogether. Additionally, you can disable or delete similar
            data used by browser add-ons, such as Flash cookies, by changing the
            add-on's settings or visiting the Website of its manufacturer.
            However, because cookies allow you to take advantage of some of Adas
            Instruments essential features, we recommend that you leave them
            turned on.
          </Text>
          <Divider />
          <Heading my="1rem" color={"#153A5B"} size="md">
            Does Hospital Hand Tools Share the Information It Receives?
          </Heading>
          <Text color={colorMode === "light" ? "#153A5B" : "#153A5B"}>
            Information about our customers is an important part of our
            business, and we are not in the business of selling it to others. We
            share customer information only as described below. Third-Party
            Service Providers: We employ other companies and individuals to
            perform functions on our behalf. Examples include fulfilling orders,
            delivering packages, sending postal mail and e-mail, removing
            repetitive information from customer lists, analyzing data,
            providing marketing assistance, providing search results and links
            (including paid listings and links), processing credit card
            payments, and providing customer service. They have access to
            personal information needed to perform their functions, but may not
            use it for other purposes. Business Transfers: As we continue to
            develop our business, we might sell or buy stores, subsidiaries, or
            business units. In such transactions, customer information generally
            is one of the transferred business assets but remains subject to the
            promises made in any pre-existing Privacy Notice (unless, of course,
            the customer consents otherwise).
          </Text>
          <Divider />
          <Heading my="1rem" color={"#153A5B"} size="md">
            How Secure Is Information About Me?
          </Heading>
          <Text color={colorMode === "light" ? "#153A5B" : "#153A5B"}>
            We work to protect the security of your information during
            transmission by using Secure Sockets Layer (SSL) software, which
            encrypts information you input. We reveal only the last five digits
            of your credit card numbers when confirming an order. Of course, we
            transmit the entire credit card number to the appropriate credit
            card company during order processing. It is important for you to
            protect against unauthorized access to your password and to your
            computer. Be sure to sign off when finished using a shared computer.
          </Text>
        </Box>
      </Box>
    </>
  );
}
