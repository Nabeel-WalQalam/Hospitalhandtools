import {
  Box,
  Grid,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Badge,
  Text,
  Flex,
} from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useState } from "react";
import Link from "next/link";
// import styles from "../styles/Lookbook.module.css";

const images = [
  "https://images.unsplash.com/photo-1632882765546-1ee75f53becb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
  "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
];

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleChange = (key) => {
    setSelectedImage(key);
    onOpen();
  };
  return (
    <>
      <Flex
        // border={"1px"}
        justify={"center"}
        align={"center"}
        width={"100%"}
        py={"2rem"}
        px={"1rem"}
        bg={"rgba(219,232,242,1)"}
        direction={["column", "column", "row"]}
      >
        <Box>
          <Badge
            as={"h6"}
            bg={"#153A5B"}
            color={"white"}
            fontSize={"15px"}
            fontWeight={"normal"}
            px={"1rem"}
            py="0.2rem"
          >
            Inspiration
          </Badge>
          <Text fontSize={"2.1rem"} my={"0.5rem"} fontWeight={"bold"}>
            #LookBook
          </Text>
          <Text width={"50%"} color={"gray.700"}>
            Shop best quality instruments direct from manufacturer with comfort.
            We deliver instruments using select fast shipping partners.
          </Text>
          <Link href={"/Products"}>
            <Button
              my="1rem"
              border={"1px"}
              borderRadius={"none"}
              variant={"outline"}
              rightIcon={<BsChevronRight />}
            >
              See All Products
            </Button>
          </Link>
        </Box>
        <Box>
          <Flex
            // wrap={"wrap"}
            justify={"center"}
            align={"center"}
            // width={"100%"}
            direction={"row"}
            // border={"1px"}
            gap={"1rem"}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                onClick={() => handleChange(index)}
                cursor="pointer"
                w={"100%"}
              >
                <Image
                  _hover={{
                    boxShadow: "xl",
                    border: "1px",
                    borderColor: "gray.300",
                  }}
                  src={image}
                  objectFit="cover"
                  width="120px"
                  height="120px"
                  borderRadius="md"
                  boxShadow="md"
                />
              </Box>
            ))}
          </Flex>
          {selectedImage !== null && (
            <>
              {/* <Button onClick={onOpen}>Open Modal</Button>   */}

              <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader bg={"gray.100"}></ModalHeader>
                  <ModalCloseButton />
                  <ModalBody p={"1rem"} bg={"gray.100"}>
                    <Box
                    //  className={styles.carousel}
                    >
                      <Carousel
                        responsive={{
                          desktop: {
                            breakpoint: { max: 3000, min: 1024 },
                            items: 1,
                          },
                          tablet: {
                            breakpoint: { max: 1024, min: 464 },
                            items: 1,
                          },
                          mobile: {
                            breakpoint: { max: 464, min: 0 },
                            items: 1,
                          },
                        }}
                        infinite={true}
                        autoPlay={false}
                        customLeftArrow={<BsChevronLeft />}
                      >
                        {images.map((image, index) => (
                          <Box key={index}>
                            <Image
                              src={image}
                              objectFit="cover"
                              width="100%"
                              height="100%"
                            />
                          </Box>
                        ))}
                      </Carousel>
                    </Box>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Index;
