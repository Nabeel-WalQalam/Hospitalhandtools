import connectDb from "../../Middleware/connectDb";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const { id } = req.body;

    const newProduct = await Product.findByIdAndDelete({ _id: id });
    if (newProduct) {
      res.status(200).json({ success: true, msg: " Product has been Deleted" });
    } else {
      res.status(200).json({ success: false, msg: " Product not register" });
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
