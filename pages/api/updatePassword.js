import User from "@/models/User";
import connectDb from "@/Middleware/connectDb";
var jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await connectDb().catch((error) => console.error(error));
    const tokenData = req.body.token;
    // console.log(tokenData, req.body.password1);
    const token = jwt.verify(tokenData, process.env.JWT_SECRET);

    let dbuser = await User.findOne({ email: token.email });
    // console.log(dbuser.password);
    let comparePassword = await bcrypt.compare(
      req.body.password1,
      dbuser.password
    );
    // console.log(comparePassword);
    if (comparePassword) {
      const hashPassword2 = await bcrypt.hash(req.body.password2, 10);
      // console.log("hashPas", hashPassword2);

      let user = await User.findOneAndUpdate(
        { email: token.email },
        {
          password: hashPassword2,
        }
      );
      // console.log(user);
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
        error: "Your Password is Invalid ! please try again ",
      });
    }

    // const { displayName, city, pincode, country, address, phonenumber } = user;
  } else {
    res.status(200).json({ error: "error" });
  }
}
