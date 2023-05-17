import User from "@/models/User";
import connectDb from "@/Middleware/connectDb";
import bcrypt, { hash } from "bcrypt";
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method == "POST") {
    await connectDb().catch((error) => console.error(error));
    const token = req.body.token;
    const identity = req.body.identity;
    // console.log("token", identity);
    try {
      const usertoken = jwt.verify(token, process.env.JWT_SECRET);
      if (usertoken) {
        if (usertoken.email == process.env.Admin_Key) {
          res.status(200).json({
            success: true,
          });
          return;
        } else {
          res.status(200).json({
            success: false,
          });
          return;
        }
      } else {
        res.status(200).json({
          success: false,
        });
        return;
      }
    } catch (error) {
      if (error) {
        res.status(200).json({
          success: false,
        });
        return;
      }
    }

    // let user = await User.findOne({ email: token.email });
  } else {
    res.status(200).json({ error: "error" });
  }
}
