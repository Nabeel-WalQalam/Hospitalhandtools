import { Button } from "@chakra-ui/react";

export const COLUMNS = [
  { Headers: "OrderId", accessor: "orderId" },
  { Headers: "Customer Name", accessor: "deliveryData.billinguserName" },
  { Headers: "Initiated Date", accessor: "createdAt" },
  { Headers: "Total Price $", accessor: "amount" },
  {
    Headers: "Delivery Status",
    accessor: "DeliveryStatus",
    Cell: ({ row }) => (
      <Button
        colorScheme={
          row.original.DeliveryStatus == "Processing"
            ? "orange"
            : row.original.DeliveryStatus == "Shipping"
            ? "blue"
            : "green"
        }
      >
        {" "}
        {row.original.DeliveryStatus}
      </Button>
    ),
  },
  { Headers: "Payment", accessor: "status" },
];
