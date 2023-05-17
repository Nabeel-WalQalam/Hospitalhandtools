import connectDb from "../../Middleware/connectDb";
import Attribute from "@/models/Attribute";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const { id } = JSON.parse(req.body);

    const newProduct = await Attribute.findByIdAndDelete({ _id: id });
    if (newProduct) {
      res
        .status(200)
        .json({ success: true, msg: " Attribute has been Deleted" });
    } else {
      res.status(200).json({ success: false, msg: " Attribute not register" });
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
