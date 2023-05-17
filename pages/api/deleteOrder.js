import connectDb from "../../Middleware/connectDb";
import Order from "@/models/Order";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const { id } = req.body;

    const newProduct = await Order.findByIdAndDelete({ _id: id });
    if (newProduct) {
      res.status(200).json({ success: true, msg: " Order has been Deleted" });
    } else {
      res.status(200).json({ success: false, msg: " Order not register" });
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
