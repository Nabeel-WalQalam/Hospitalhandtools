import User from "@/models/User";
import connectDb from "@/Middleware/connectDb";
var jwt = require("jsonwebtoken");
import bcrypt, { hash } from "bcrypt";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await connectDb().catch((error) => console.error(error));
    const { email, password, pin } = req.body;
    console.log(email, password, pin);

    if (!email || !password || !pin) {
      return res
        .status(401)
        .json({ success: false, message: "Fields Are Empty" });
    }

    if (parseInt(pin) !== 9090) {
      return res.status(200).json({ success: false, message: "Error Occured" });
    }

    let user;
    try {
      user = await User.findOne({ email: email });
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Internal Error" });
    }

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    } else {
      if (
        email === user.email &&
        (await bcrypt.compare(password, user.password))
      ) {
        console.log(user);
        var token = jwt.sign(
          { email: user.email, name: user.displayName },
          process.env.JWT_SECRET
        );

        return res.status(200).json({
          success: true,
          token,
          user: user,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid Credentials",
        });
      }
    }
  } else {
    res.status(200).json({ error: "error" });
  }
}
