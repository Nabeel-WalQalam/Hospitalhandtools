import User from "@/models/User";
import connectDb from "@/Middleware/connectDb";
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method == "POST") {
    await connectDb().catch((error) => console.error(error));
    const tokenData = req.body.token;
    // console.log(req.body);
    const token = jwt.verify(tokenData, process.env.JWT_SECRET);
    let user = await User.findOneAndUpdate(
      { email: token.email },
      {
        address: req.body.address,
        displayName: req.body.displayName,
        city: req.body.city,
        pincode: parseInt(req.body.pincode),
        country: req.body.country,
        phonenumber: parseInt(req.body.phonenumber),
        aboutme: req.body.aboutme,
        state: req.body.state,
      }
    );
    // console.log(user);

    // const { displayName, city, pincode, country, address, phonenumber } = user;

    res.status(200).json({
      success: true,
    });
  } else {
    res.status(200).json({ error: "error" });
  }
}
