import connectDb from "../../Middleware/connectDb";
import Coupen from "@/models/Coupen";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const { id, coupen, coupenType, coupenAmount, coupenFreeShipping } =
      JSON.parse(req.body);
    // console.log();
    try {
      const newZone = await Coupen.findOneAndUpdate(
        { _id: id },
        {
          coupen: coupen,
          coupenType: coupenType,
          coupenAmount: coupenAmount,
          coupenFreeShipping: coupenFreeShipping,
        }
      );
      // await newProduct.save();

      res.status(200).json({ success: true, msg: "update Successsfully" });
      return;
    } catch (error) {
      res.status(200).json({ success: false, msg: "error Occured" });
      return;
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
