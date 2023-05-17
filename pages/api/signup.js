import connectDb from "../../Middleware/connectDb";
import User from "@/models/User";
import bcrypt, { hash } from "bcrypt";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    // console.log(req.body.data.email);
    let checkUser;
    try {
      checkUser = await User.findOne({ email: req.body.data.email });
    } catch (error) {
      res.status(400).json({ success: false, msg: "Error Occured" });
      return;
    }
    // console.log();
    if (checkUser) {
      res
        .status(200)
        .json({ success: false, msg: "Email Registerd Already ! Login" });
      return;
    } else {
      const hast = await bcrypt.hash(req.body.data.password, 10);
      let user;
      try {
        user = await new User({
          displayName: req.body.data.displayName,
          email: req.body.data.email,
          password: hast,
          address: req.body.data.address ? req.body.data.address : " ",
          phonenumber: req.body.data.number ? req.body.data.number : " ",
        });
      } catch (error) {
        res.status(400).json({ success: false, msg: "Internel Error Occured" });
        return;
      }

      if (user) {
        await user.save();
        res
          .status(200)
          .json({ success: true, msg: "Account Register", user: user });
        return;
      } else {
        res.status(200).json({ success: false, msg: "Error occured" });
        return;
      }
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
