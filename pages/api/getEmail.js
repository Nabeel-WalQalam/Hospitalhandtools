import dbConnect from "@/Middleware/connectDb";
var jwt = require("jsonwebtoken");
export default async function handler(req, res) {
  if (req.method == "POST") {
    await dbConnect().catch((error) => console.error(error));
    const hashEmail = req.body.email;
    // console.log(typeof hashEmail);
    try {
      let userEmail = jwt.verify(hashEmail, process.env.JWT_SECRET);
      //   console.log("orders ", userEmail);

      res.status(200).json({ success: true, email: userEmail.email });
    } catch {
      res
        .status(200)
        .json({ success: false, error: "token expired ! please login-Again" });
      return;
    }
  } else {
    res.status(200).json({ error: "error" });
  }
}
