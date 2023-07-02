import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  TableContainer,
} from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { BiHome } from "react-icons/bi";

const BreadCrumb = (props) => {
  // console.log(props);
  return (
    <>
      <Breadcrumb
        // ml={"2rem"}
        width={"85%"}
        mx="auto"
        // spacing="8px"
        separator={<AiOutlineArrowRight color="gray.500" />}
        // overflowX="scroll"
        // maxWidth={"100%"}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            href="/"
            textTransform={"lowercase"}
            // fontSize={["0.8rem", "0.9rem", "1rem", "1.1rem"]}
            color={"gray.700"}
          >
            <BiHome />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {props.pgaeTitle ? (
          <BreadcrumbItem>
            <BreadcrumbLink
              // fontSize={["0.8rem", "0.9rem", "1rem", "1.1rem"]}
              as={Link}
              textTransform={"lowercase"}
              href={`/${props.pgaeTitle}`}
              color={"gray.700"}
              fontSize={["0.7rem", "0.8rem", "1rem"]}
            >
              {props.pgaeTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          " "
        )}

        {/* pgaeTitle2 */}

        {props.pgaeTitle2 ? (
          <BreadcrumbItem>
            <BreadcrumbLink
              textTransform={"lowercase"}
              // fontSize={["0.8rem", "0.9rem", "1rem", "1.1rem"]}
              as={Link}
              href={`/${props.pgaeTitle}/${props.pgaeTitle2}`}
              color={"gray.700"}
              fontSize={["0.7rem", "0.8rem", "1rem"]}
            >
              {props.pgaeTitle2}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          " "
        )}

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            textTransform={"Capitalize"}
            // fontSize={["0.7rem", "0.9rem", "1rem", "1.1rem"]}
            href={`${props.pgaeTitle}/${props.children}`}
            color={"gray.700"}
            fontSize={["0.7rem", "0.8rem", "1rem"]}
          >
            {props.children}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};

export default BreadCrumb;
