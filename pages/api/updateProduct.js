import connectDb from "../../Middleware/connectDb";
import Product from "../../models/Product";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const {
      title,
      slug,
      description,
      image,
      Category,
      options,
      price,
      model,
      quantity,
      tags,
    } = req.body;
    // console.log(
    //   title,
    //   slug,
    //   description,
    //   image,
    //   Category,
    //   options,
    //   price,
    //   model,
    //   quantity,
    //   tags
    // );

    const newProduct = await Product.findByIdAndUpdate(req.body._id, req.body);
    // await newProduct.save();

    res.status(200).json({ msg: "updated" });
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
