import connectDb from "../../Middleware/connectDb";
import Attribute from "@/models/Attribute";
export default async function handler(req, res, next) {
  await connectDb();
  if (req.method == "POST") {
    // console.log();

    const { name, data, id } = JSON.parse(req.body);
    console.log(name, data, id);

    if (name == null || data == null) {
      res.status(200).json({ success: false, msg: "Write SomeThing" });
      return;
    }

    let addAttribute = await Attribute.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        values: data,
      }
    );

    if (addAttribute) {
      res
        .status(200)
        .json({ success: true, msg: "Attribute Edit Successfully" });
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
