import connectDb from "../../Middleware/connectDb";
import Attribute from "@/models/Attribute";

export default async function handler(req, res) {
  await connectDb().catch((error) => console.error(error));
  const { id } = JSON.parse(req.body);
  console.log(id);
  let getAll = await Attribute.findOne({ name: id });

  if (getAll) {
    res.status(200).json({ success: true, msg: getAll });
  } else {
    res.status(200).json({ success: false });
  }
}
