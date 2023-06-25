import { Box, Flex } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import GlobalFilter from "./GlobalFilter";
import { ProductsColumn } from "./ProductsColumn";
import Link from "next/link";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
export const ProductsTable = ({ products }) => {
  const Router = useRouter();
  const toast = useToast();

  const columns = useMemo(() => ProductsColumn, []);

  const data = useMemo(() => products, []);

  const handleDelete = async (e, id) => {
    // console.log(id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/deleteProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );
    const data = await response.json();
    if (data.success) {
      toast({
        title: "Successful",
        description: data.msg,
        status: "success",
        position: "top-left",
        duration: 4000,
        isClosable: true,
      });

      Router.push(
        {
          pathname: "/haniyanasir/admin/allproducts",
        },
        undefined,
        { shallow: true }
      );
    } else {
      toast({
        title: "error",
        description: data.msg,
        status: "error",
        position: "top-left",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const tableHook = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Headers: "Action",
        accessor: "_id",
        Cell: ({ row }) => (
          <>
            <Flex gap={"1rem"}>
              <Link
                href={`/haniyanasir/admin/addproduct?id=${row.original._id}`}
              >
                <Button colorScheme={"purple"}>Edit</Button>
              </Link>
              <Button
                onClick={(e) => handleDelete(e, row.original._id)}
                colorScheme={"red"}
              >
                Delete
              </Button>
            </Flex>
          </>
        ),
      },
      // {
      //   id: "Delete",
      //   Headers: "Delete",
      //   accessor: "_id",
      //   Cell: ({ row }) => (
      //     // <Link href={`/admin/orderdetail?id=${row.original._id}`}>
      //     <Button
      //       onClick={(e) => handleDelete(e, row.original._id)}
      //       colorScheme={"red"}
      //     >
      //       Delete
      //     </Button>
      //     // </Link>
      //   ),
      // },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    tableHook,
    useGlobalFilter
  );

  const {
    state,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  // color={"white"}
                  // fontSize="1.2rem"
                  {...column.getHeaderProps()}
                >
                  {column.render("Headers")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody border={"1px"} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
