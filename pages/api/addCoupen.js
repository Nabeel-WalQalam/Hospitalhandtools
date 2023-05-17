import connectDb from "../../Middleware/connectDb";
import Coupen from "@/models/Coupen";
export default async function handler(req, res, next) {
  await connectDb();
  if (req.method == "POST") {
    // console.log();

    const { coupen, coupenType, coupenAmount, coupenFreeShipping } = JSON.parse(
      req.body
    );
    // console.log(coupen, coupenType, coupenAmount, coupenFreeShipping);

    let addCoupen = await new Coupen({
      coupen: coupen,
      coupenType: coupenType,
      coupenAmount: coupenAmount,
      coupenFreeShipping: coupenFreeShipping,
    });

    const saveCoupen = await addCoupen.save();
    if (saveCoupen) {
      res
        .status(200)
        .json({ success: true, msg: "Coupen Addedd Successfully" });
    } else {
      res.status(200).json({ success: false, msg: "Error Occured" });
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
    return;
  }
}
