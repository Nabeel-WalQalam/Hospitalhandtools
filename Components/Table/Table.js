import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { COLUMNS } from "./Column";
import GlobalFilter from "./GlobalFilter";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
export const Table = ({ allOrder }) => {
  const Router = useRouter();
  const toast = useToast();
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => allOrder, []);

  const handleDelete = async (e, id) => {
    console.log(id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/deleteOrder`,
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
      Router.push("/haniyanasir/admin");
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
        id: "Status",
        Headers: "Edit Status",
        accessor: "_id",
        Cell: ({ row }) => (
          <Link href={`/haniyanasir/admin/orderdetail?id=${row.original._id}`}>
            <Button colorScheme={"purple"}>Edit</Button>
          </Link>
        ),
      },
      {
        id: "Delete",
        Headers: "Delete order",
        accessor: "_id",
        Cell: ({ row }) => (
          // <Link href={`/admin/orderdetail?id=${row.original._id}`}>
          <Button
            onClick={(e) => handleDelete(e, row.original._id)}
            colorScheme={"red"}
          >
            Delete
          </Button>
          // </Link>
        ),
      },
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

      <table className="adminTable" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="adminth" {...column.getHeaderProps()}>
                  {column.render("Headers")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="admintr" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="admintd" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
