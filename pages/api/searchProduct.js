import connectDb from "../../Middleware/connectDb";
import order from "../../models/Order";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    console.log(req.body);
    try {
      const { category, query } = req.body;
      if (category === "All") {
        const result = await Product.find({
          title: { $regex: new RegExp(query, "i") },
        });
        res.status(200).json({ success: true, msg: result });
      } else {
        const result = await Product.find({
          category: category,
          title: { $regex: new RegExp(query, "i") },
        });
        res.status(200).json({ success: true, msg: result });
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: "error" });
    }
  } else res.status(400).json({ success: false, msg: "error" });
}
