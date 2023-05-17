import User from "@/models/User";
import connectDb from "@/Middleware/connectDb";
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method == "POST") {
    await connectDb().catch((error) => console.error(error));
    let token = req.body.token;
    // console.log("token", token);
    let usertoken;
    try {
      usertoken = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(usertoken);
    } catch (err) {
      // console.log(err);
      res.status(200).json({
        success: false,
      });
      return;
    }

    if (usertoken) {
      let result;
      try {
        result = await User.findOne({ email: usertoken.email });
      } catch (error) {
        res.status(200).json({
          success: false,
          message: "Error Occured",
        });
        return;
      }
      if (result) {
        var token = jwt.sign(
          { email: result.email, name: result.displayName },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          success: true,
          user: result,
          token: token,
        });
        return;
      } else {
        res.status(400).json({
          success: false,
          message: "user Not found",
        });
        return;
      }
    }
  } else {
    res.status(200).json({ error: "error" });
  }
}
