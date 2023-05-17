import connectDb from "../../Middleware/connectDb";
import User from "@/models/User";
import bcrypt, { hash } from "bcrypt";
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    // console.log(req.body.loginFields.password);
    const email = req.body.loginFields.email;
    const userpassword = req.body.loginFields.password;

    let user;
    try {
      user = await User.findOne({
        email: email,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "internal Error Occured" });
    }

    if (user) {
      // console.log(user);
      if (
        email === user.email &&
        (await bcrypt.compare(userpassword, user.password))
      ) {
        console.log("verify");
        var token = jwt.sign(
          { email: user.email, name: user.displayName },
          process.env.JWT_SECRET
        );
        let hashEmail = req.body.loginFields.email;
        // const hashEmail = await bcrypt.hash(, 10);
        // console.log("getemail", hashEmail);
        // console.log(user);
        res.status(200).json({
          success: true,
          token,
          hashEmail,
          user: user,
        });
      } else {
        res
          .status(200)
          .json({ success: false, message: "invalid credentials" });
        return;
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    // console.log(user);
  } else {
    return res
      .status(400)
      .json({ success: false, method: "this method is not applied" });
  }
}
