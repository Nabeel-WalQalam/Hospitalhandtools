import connectDb from "../../Middleware/connectDb";
import Coupen from "@/models/Coupen";

export default async function handler(req, res) {
  await connectDb().catch((error) => console.error(error));
  let getAll = await Coupen.find({});

  // res.status(200).json({ succewss: "hi" });
  res.status(200).json({ getAll });
}
