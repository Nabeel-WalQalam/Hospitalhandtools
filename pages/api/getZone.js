import connectDb from "../../Middleware/connectDb";
import Zone from "../../models/Zone";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const { country } = req.body;
    // console.log(country);
    try {
      let newZone = await Zone.findOne({
        country: country,
      });
      if (newZone) {
        // console.log(newZone);

        res.status(200).json({ success: true, Zone: newZone });
        return;
      } else {
        res.status(200).json({ success: false, error: "error" });
      }

      return;
    } catch (error) {
      res.status(200).json({ success: false, error: "error" });
      return;
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
