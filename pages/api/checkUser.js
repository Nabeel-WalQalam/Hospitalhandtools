import User from "@/models/User";
import connectDb from "@/Middleware/connectDb";
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method == "POST") {
    await connectDb().catch((error) => console.error(error));
    let token = req.body.identity;
    // console.log("token", token);

    try {
      const usertoken = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(usertoken);
      res.status(200).json({
        success: true,
      });
      return;
    } catch (err) {
      // console.log(err);
      res.status(200).json({
        success: false,
      });
      return;
    }
  } else {
    res.status(200).json({ error: "error" });
  }
}
