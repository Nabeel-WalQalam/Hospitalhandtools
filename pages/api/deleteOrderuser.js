import connectDb from "../../Middleware/connectDb";
import Order from "@/models/Order";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const { orderID } = req.body;

    try {
      const newProduct = await Order.findOneAndDelete({ orderId: orderID });
      if (newProduct) {
        return res
          .status(200)
          .json({ success: true, message: " Order has been Deleted" });
      } else {
        return res
          .status(200)
          .json({ success: false, message: " Order not register" });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "Internal Error" });
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
