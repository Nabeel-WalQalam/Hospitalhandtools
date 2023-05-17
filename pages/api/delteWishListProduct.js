import connectDb from "../../Middleware/connectDb";
import WishList from "@/models/WishList";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const { id } = req.body;
    // console.log(id);

    const newProduct = await WishList.findByIdAndDelete({ _id: id });
    // console.log(newProduct);
    if (newProduct) {
      res
        .status(200)
        .json({ success: true, msg: " Product has been unlisted" });
    } else {
      res.status(200).json({ success: false, msg: " Product not register" });
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
