import connectDb from "../../Middleware/connectDb";
import Product from "@/models/Product";

export default async function handler(req, res) {
  try {
    await connectDb();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "db Error occured" });
  }
  if (req.method == "GET") {
    try {
      const randomProducts = await Product.aggregate([
        { $sample: { size: 4 } },
      ]);
      console.log(typeof randomProducts);
      return res.status(200).json({ success: true, message: randomProducts });
    } catch (error) {
      return res.status(400).json({ success: false, message: "Error Occured" });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "this method is not applied" });
  }
}
