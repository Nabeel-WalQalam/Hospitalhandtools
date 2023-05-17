import Order from "@/models/Order";
import dbConnect from "@/Middleware/connectDb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await dbConnect().catch((error) => console.error(error));
    const hashEmail = req.body.email;
    // console.log(hashEmail);
    const getOrder = await Order.find({ email: hashEmail });

    // console.log("orders ", getOrder);
    if (getOrder) {
      res.status(200).json({ success: true, order: getOrder });
    } else {
      res.status(400).json({ success: false, msg: "Orders Not Found" });
    }
  } else {
    res.status(200).json({ error: "error" });
  }
}
