import connectDb from "../../Middleware/connectDb";
import Category from "@/models/Category";

export default async function handler(req, res) {
  await connectDb().catch((error) => console.error(error));
  let getAll = await Category.find({});

  // res.status(200).json({ succewss: "hi" });
  res.status(200).json({ getAll });
}
