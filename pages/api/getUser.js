import User from "@/models/User";
import connectDb from "@/Middleware/connectDb";
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method == "POST") {
    await connectDb().catch((error) => console.error(error));
    const tokenData = req.body.token;
    const token = jwt.verify(tokenData, process.env.JWT_SECRET);
    let user = await User.findOne({ email: token.email });
    // console.log(user);
    const {
      displayName,
      city,
      pincode,
      country,
      address,
      phonenumber,
      aboutme,
      state,
    } = user;
    res.status(200).json({
      success: true,
      user: {
        displayName,
        city,
        pincode,
        country,
        address,
        phonenumber,
        aboutme,
        state,
      },
    });
  } else {
    res.status(200).json({ error: "error" });
  }
}
