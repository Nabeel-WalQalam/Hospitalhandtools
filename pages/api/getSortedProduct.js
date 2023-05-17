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
  if (req.method == "POST") {
    const { category, type } = JSON.parse(req.body);
    let sortType = [];
    sortType = type.split("+");
    // console.log(sortType[0]);
    // console.log(category.replace(/-/g, " "), type);
    if (!category || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Fields are empty" });
    }
    const sortObj = {};
    sortObj[sortType[0]] = parseInt(sortType[1]);
    // console.log(sortObj);
    let products;
    try {
      products = await Product.find({ slug: category.replace(/-/g, " ") })
        .sort(sortObj)
        .exec((err, list) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: "Error Occured while Fetching",
            });
          } else {
            return res.status(200).json({ success: true, message: list });
          }
        });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "Error Occured while Fetching" });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "this method is not applied" });
  }
}
