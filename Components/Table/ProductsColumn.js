import { Image } from "@chakra-ui/react";

export const ProductsColumn = [
  { Headers: "Title", accessor: "title" },
  {
    Headers: "Image",
    accessor: "image",
    Cell: ({ row }) => {
      // console.log(row.original);

      return (
        <Image
          src={row.original.image ? row.original.image[0].url : null}
          alt="Product"
          style={{ width: "100px", height: "auto" }}
        />
      );
    },
  },

  {
    Headers: "Category",
    accessor: "category",
  },
  // {
  //   Header: "Price",
  //   accessor: (row) => {
  //     if (row.priceType == "fixed") {
  //       return row.fixedPrice;
  //     } else {
  //       return `${row.minPrice} - ${row.maxPrice}`;
  //     }
  //   },
  // },
  { Headers: "max-Price", accessor: "maxPrice" },
  { Headers: "model", accessor: "model" },
  { Headers: "quantity", accessor: "quantity" },
];
