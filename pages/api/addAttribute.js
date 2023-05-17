import connectDb from "../../Middleware/connectDb";
import Attribute from "@/models/Attribute";
export default async function handler(req, res, next) {
  await connectDb();
  if (req.method == "POST") {
    // console.log();

    const { name, data } = JSON.parse(req.body);
    // console.log(name, data);

    if (name == null || data == null) {
      res.status(200).json({ success: false, msg: "Write SomeThing" });
      return;
    }

    let allAttribute = await Attribute.findOne({ name: name });
    if (allAttribute) {
      res.status(200).json({ success: false, msg: "Already Save " });
      return;
    }

    let addAttribute = await Attribute({
      name: name,
      values: data,
    });

    let result = await addAttribute.save();

    if (result) {
      res
        .status(200)
        .json({ success: true, msg: "Attribute Added Successfully" });
      return;
    } else {
      res.status(200).json({ success: false, msg: "Error Occured" });
      return;
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
    return;
  }
}
