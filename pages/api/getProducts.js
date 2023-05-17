import connectDb from "../../Middleware/connectDb";
import Product from "../../models/Product";

export default async function handler(req, res) {
  await connectDb().catch((error) => console.error(error));
  let getAll = await Product.find({});
  res.status(200).json({ getAll });
}
