import { Badge, Box, Flex, Image, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsSuitHeart } from "react-icons/bs";
import { NavbarCat } from "../Navbar/NavbarCat";
import { HamburgerMobile } from "../Navbar/HamburgerMobile";
import { useSelector } from "react-redux";

// const MobileNavbar = () => {

//   return (
//
//   );
// };

// export default MobileNavbar;

export const MobileNavbar = () => {
  const { colorMode } = useColorMode();
  const wishListProduct = useSelector((state) => state.wishList.wishList);

  return (
    <Flex
      justify={"space-between"}
      align="center"
      direction={"row-reverse"}
      // borderColor={"gray.200"}
      boxShadow={"base"}
    >
      <Flex mr={"0.5rem"} align={"center"} gap={"0.5rem"}>
        <Box>
          <HamburgerMobile />
        </Box>
        <Box>
          <Link href={"/wishlist"}>
            <Flex
              cursor={"pointer"}
              // mr={"0.4rem"}
              color={colorMode === "light" ? "#153A5B" : "white"}
              fontWeight="semibold"
              _hover={{ textDecor: "underline", color: "black" }}
              // border={"1px"}
              align={"center"}
              pos={"relative"}
            >
              <Badge
                pos={"absolute"}
                bg="red.500"
                borderRadius={"55px"}
                top={"-3px"}
                color={"white"}
                // top={"3rem"}
                left={"1rem"}
                zIndex={"99"}
              >
                {wishListProduct.length}
              </Badge>
              <Box pos={"relative"}>
                <BsSuitHeart fontSize={"28px"} />
              </Box>
            </Flex>
          </Link>
        </Box>
        <Box
          // border={"1px"}
          // borderColor={"#153A5B"}
          height={"100%"}
          // mx={"1rem"}
          // bg={"#153A5B"}
          // py={"0.5rem"}
          // px="0.5rem"
        >
          <NavbarCat paddingGap={false} color={"#153A5B"} />
        </Box>
      </Flex>
      <Box>
        <Link href={"/"}>
          <Image
            src={
              colorMode === "light"
                ? "/assets/logo.png"
                : "/assets/logoWhite.svg"
            }
            alt="Hospital-Hand-Tools -Logo"
            objectFit={"cover"}
            boxSize={["200px", "250px"]}
            height={["80px", "80px"]}
            // border={"1px"}

            // style={{ fill: "pink", color: "pink" }}
          />
        </Link>
      </Box>
    </Flex>
  );
};
