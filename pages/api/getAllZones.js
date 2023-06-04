import connectDb from "../../Middleware/connectDb";
import Zone from "../../models/Zone";

export default async function handler(req, res) {
  await connectDb().catch((error) => console.error(error));
  let getAll = await Zone.find({});
  res.status(200).json({ getAll });
}
