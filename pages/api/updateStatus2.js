import connectDb from "../../Middleware/connectDb";
import Order from "@/models/Order";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const { id, status } = req.body;

    const newProduct = await Order.findByIdAndUpdate(
      { _id: id },
      { status: status }
    );
    // await newProduct.save();

    res.status(200).json({ success: true, msg: "updated" });
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
