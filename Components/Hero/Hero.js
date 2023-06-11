import {
  Box,
  Button,
  calc,
  Flex,
  Heading,
  Text,
  useColorModeValue as mode,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { Features } from "../ProgressBar/Features";
import { TrendingProducts } from "../Trending/TrendingProducts";
import { motion } from "framer-motion";
import SliderProducts from "../HomeProducts/SliderProducts";
import SubTrendingProduct from "../Trending/SubTrendingProduct";
import Index from "../LookBook/Index";
import Blogs from "../Blog/Blogs";

const Hero = () => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Box bg={"#153A5B"} pt="24" overflow="hidden">
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Flex
            align="flex-start"
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            mb="20"
          >
            <Box
              as={motion.div}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              flex="1"
              maxW={{ lg: "xl" }}
              pt="6"
            >
              <Heading
                as="h2"
                size="3xl"
                mt="8"
                fontWeight="extrabold"
                color={"white"}
              >
                Plastic Surgery Instruments
              </Heading>
              <Text color={"white"} mt="5" fontSize="xl">
                Excellence in surgery Instrument.
              </Text>
              <Link href={"/"}>
                <Button id="specialButton">Shop Now</Button>
              </Link>
            </Box>
            <Box boxSize={{ base: "20", lg: "8" }} />
            <Image
              width="600"
              priority
              height={"100"}
              src="/assets/hero.png"
              alt="surgical instrument Tools"
            />
          </Flex>
        </Box>
      </Box>
      <Box>
        <Features />
      </Box>
      <Box bg={"rgba(240,242,245,1)"} py={"2rem"}>
        <TrendingProducts />
      </Box>
      <Box my={"3.5rem"} w={[, "100%", "100%", "90%", "85%"]} mx="auto">
        <SliderProducts />
      </Box>
      {/* <Box>
        <SubTrendingProduct />
      </Box> */}

      <Box>
        <Index />
      </Box>
      <Box my={"3rem"}>
        <Blogs />
      </Box>
      {/* <Box>

      </Box> */}
    </Box>
  );
};

export default Hero;
