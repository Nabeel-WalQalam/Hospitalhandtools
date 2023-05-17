import connectDb from "../../Middleware/connectDb";
import Zone from "@/models/Zone";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const { id, options, zone, country } = req.body;
    // console.log();
    try {
      const newZone = await Zone.findOneAndUpdate(
        { _id: id },
        {
          zone: zone,
          weights: options,
          country: country,
        }
      );
      // await newProduct.save();

      res.status(200).json({ success: true, Zone: newZone });
      return;
    } catch (error) {
      res.status(200).json({ success: false, error: error });
      return;
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
