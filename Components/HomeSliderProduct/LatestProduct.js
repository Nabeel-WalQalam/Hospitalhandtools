import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Center,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
// import Image from "next/image";
import Index from "../ShowHomeHoverProduct/Index";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import 'react-multi-carousel/'

const products = [
  {
    backOrder: true,
    category: "liposuction cannula and accessories",
    combination: [],
    combination_set: "",
    fixedPrice: 24,
    image: null,
    long_description:
      '<p><span style="color: rgb(119, 119, 119);">Adaptor with LUER-LOCK connection Made Stainless steel Gold plated</span></p>',
    maxPrice: 0,
    minPrice: 0,
    model: "A-503-01",
    options: null,
    priceType: "fixed",
    quantity: 0,
    salePrice: 0,
    short_description:
      "<ul><li>Made Stainless steel Gold plated</li><li>luer sryinge to insdie threeded cannula</li></ul>",
    slug: "Tommy – Inside Threaded Cannula",
    tags: [(" LUER-LOCK connection", "Adaptor ")],
    title: "Adaptor with LUER LOCK connection",
    variants: "no",
    weight: "0.12",

    _id: "1",
  },
  {
    backOrder: true,
    category: "liposuction cannula and accessories",
    combination: [],
    combination_set: "",
    fixedPrice: 24,
    image: null,
    long_description:
      '<p><span style="color: rgb(119, 119, 119);">Adaptor with LUER-LOCK connection Made Stainless steel Gold plated</span></p>',
    maxPrice: 0,
    minPrice: 0,
    model: "A-503-01",
    options: null,
    priceType: "fixed",
    quantity: 0,
    salePrice: 0,
    short_description:
      "<ul><li>Made Stainless steel Gold plated</li><li>luer sryinge to insdie threeded cannula</li></ul>",
    slug: "Tommy – Inside Threaded Cannula",
    tags: [(" LUER-LOCK connection", "Adaptor ")],
    title: "Adaptor with LUER LOCK connection",
    variants: "no",
    weight: "0.12",

    _id: "2",
  },
  {
    backOrder: true,
    category: "liposuction cannula and accessories",
    combination: [],
    combination_set: "",
    fixedPrice: 24,
    image: null,
    long_description:
      '<p><span style="color: rgb(119, 119, 119);">Adaptor with LUER-LOCK connection Made Stainless steel Gold plated</span></p>',
    maxPrice: 0,
    minPrice: 0,
    model: "A-503-01",
    options: null,
    priceType: "fixed",
    quantity: 0,
    salePrice: 0,
    short_description:
      "<ul><li>Made Stainless steel Gold plated</li><li>luer sryinge to insdie threeded cannula</li></ul>",
    slug: "Tommy – Inside Threaded Cannula",
    tags: [(" LUER-LOCK connection", "Adaptor ")],
    title: "Adaptor with LUER LOCK connection with fiber optic",
    variants: "no",
    weight: "0.12",

    _id: "3",
  },
  {
    backOrder: true,
    category: "liposuction cannula and accessories",
    combination: [],
    combination_set: "",
    fixedPrice: 24,
    image: null,
    long_description:
      '<p><span style="color: rgb(119, 119, 119);">Adaptor with LUER-LOCK connection Made Stainless steel Gold plated</span></p>',
    maxPrice: 0,
    minPrice: 0,
    model: "A-503-01",
    options: null,
    priceType: "fixed",
    quantity: 0,
    salePrice: 0,
    short_description:
      "<ul><li>Made Stainless steel Gold plated</li><li>luer sryinge to insdie threeded cannula</li></ul>",
    slug: "Tommy – Inside Threaded Cannula",
    tags: [(" LUER-LOCK connection", "Adaptor ")],
    title: "Adaptor with LUER LOCK connection",
    variants: "no",
    weight: "0.12",

    _id: "4",
  },

  {
    backOrder: true,
    category: "liposuction cannula and accessories",
    combination: [],
    combination_set: "",
    fixedPrice: 24,
    image: null,
    long_description:
      '<p><span style="color: rgb(119, 119, 119);">Adaptor with LUER-LOCK connection Made Stainless steel Gold plated</span></p>',
    maxPrice: 0,
    minPrice: 0,
    model: "A-503-01",
    options: null,
    priceType: "fixed",
    quantity: 0,
    salePrice: 0,
    short_description:
      "<ul><li>Made Stainless steel Gold plated</li><li>luer sryinge to insdie threeded cannula</li></ul>",
    slug: "Tommy – Inside Threaded Cannula",
    tags: [(" LUER-LOCK connection", "Adaptor ")],
    title: "Adaptor with LUER LOCK connection",
    variants: "no",
    weight: "0.12",

    _id: "5",
  },
  {
    backOrder: true,
    category: "liposuction cannula and accessories",
    combination: [],
    combination_set: "",
    fixedPrice: 24,
    image: null,
    long_description:
      '<p><span style="color: rgb(119, 119, 119);">Adaptor with LUER-LOCK connection Made Stainless steel Gold plated</span></p>',
    maxPrice: 0,
    minPrice: 0,
    model: "A-503-01",
    options: null,
    priceType: "fixed",
    quantity: 0,
    salePrice: 0,
    short_description:
      "<ul><li>Made Stainless steel Gold plated</li><li>luer sryinge to insdie threeded cannula</li></ul>",
    slug: "Tommy – Inside Threaded Cannula",
    tags: [(" LUER-LOCK connection", "Adaptor ")],
    title: "Adaptor with LUER LOCK connection",
    variants: "no",
    weight: "0.12",

    _id: "6",
  },
  {
    backOrder: true,
    category: "liposuction cannula and accessories",
    combination: [],
    combination_set: "",
    fixedPrice: 24,
    image: null,
    long_description:
      '<p><span style="color: rgb(119, 119, 119);">Adaptor with LUER-LOCK connection Made Stainless steel Gold plated</span></p>',
    maxPrice: 0,
    minPrice: 0,
    model: "A-503-01",
    options: null,
    priceType: "fixed",
    quantity: 0,
    salePrice: 0,
    short_description:
      "<ul><li>Made Stainless steel Gold plated</li><li>luer sryinge to insdie threeded cannula</li></ul>",
    slug: "Tommy – Inside Threaded Cannula",
    tags: [(" LUER-LOCK connection", "Adaptor ")],
    title: "Adaptor with LUER LOCK connection",
    variants: "no",
    weight: "0.12",

    _id: "7",
  },
];

const LatestProduct = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);

  const handleNext = () => {
    if (endIndex < products.length) {
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      setEndIndex(endIndex - 1);
    }
  };

  const variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleHover = async (key) => {
    let check = products.map((items) => {
      return items.id === key;
    });
    if (check) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1450 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1450, min: 1025 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1025, min: 700 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {/* <Flex
        justify={"center"}
        // border={"1px"}
        // width={"100%"}
        alignItems="center"
        overflowX={"hidden"}
        overflowY={"hidden"}
        cursor={"pointer"}
        direction={"column"}
      >
        <Flex width={"100%"} justify={"space-between"} align={"right"}>
          <Box>
            {startIndex > 0 && (
              <Button
                variant={"none"}
                onClick={handlePrev}
                // border={"1px"}
                leftIcon={<MdOutlineArrowBackIos fontSize={"1.5rem"} />}
              ></Button>
            )}
          </Box>
          <Box>
            {endIndex < products.length && (
              <Button
                variant={"none"}
                onClick={handleNext}
                leftIcon={<MdOutlineArrowForwardIos fontSize={"1.5rem"} />}
              ></Button>
              //   <IoChevronForwardCircle />
            )}
          </Box>
        </Flex>
        <Flex
          // w={["10%", "100%", "100%", "100%"]}
          border={"1px"}
          // display="flex"
          borderColor={"red"}
          justify={"center"}
          // align={"center"}
          // gap={"1rem"}
          // overflowX="hidden"
          // width={"100%"}
          height={"400px"}
          // overflowY={"hidden"}
        >
          {products.slice(startIndex, endIndex).map((products) => (
            <Index
              // id={product.id}
              // title={product.title}
              // name={product.name}
              // price={product.price}
              // description={product.description}
              product={products}
            />
          ))}
        </Flex>
      </Flex> */}
      <Carousel responsive={responsive}>
        {products.map((products) => (
          <Index key={products._id} product={products} />
        ))}
      </Carousel>
    </>
  );
};

export default LatestProduct;
