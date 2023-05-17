import dbConnect from "@/Middleware/connectDb";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
import { v4 as uuidv4 } from "uuid";
import bcrypt, { hash } from "bcrypt";
import Order from "@/models/Order";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  await dbConnect();
  if (req.method == "POST") {
    if (req.body.sendMail == true) {
      //   console.log("true", req.body.email);

      let finduser;
      try {
        finduser = await User.findOne({ email: req.body.email });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, message: "Error Occured" });
      }

      if (finduser) {
        // console.log(finduser);

        try {
          const simpleToken = uuidv4();
          // console.log(simpleToken);
          const hastToken = await bcrypt.hash(simpleToken, 10);
          let forgotdata = new Forgot({
            token: hastToken,
            email: req.body.email,
          });
          forgotdata.save();

          const msg = {
            to: finduser.email, // Change to your recipient
            from: "hospitalhandtool@gmail.com", // Change to your verified sender
            subject: "Resseting Password",
            html: `
            Please use the following link to reset your password:
  
            <a href='${process.env.NEXT_PUBLIC_HOST}/forgot?token=${hastToken}'>Click here to reset  your Password</a>
  
            If you did not request a password change, please feel free to ignore this message.
  
            If you have any comments or questions don’t hesitate to reach us at .....
  
        `,
          };
          await sgMail.send(msg);

          return res
            .status(200)
            .json({ success: true, message: "Email Send SuccessFully" });
        } catch (error) {
          return res
            .status(200)
            .json({ success: false, message: "Error Occured" });
        }
      } else {
        res.status(200).json({ success: false, error: "Invalid Email" });
        return;
      }
    } else {
      const { token, password } = req.body;
      //   console.log(token, password);
      let forgotuserData;
      try {
        forgotuserData = await Forgot.findOne({ token: token });
      } catch (error) {
        res.status(200).json({ success: false, error: "Error Occured" });
        return;
      }

      //   console.log(forgotuserData);
      if (forgotuserData) {
        const hastToken = await bcrypt.hash(password, 10);
        let user;
        try {
          user = await User.findOneAndUpdate(
            { email: forgotuserData.email },
            { password: hastToken }
          );
        } catch (error) {
          res.status(200).json({ success: false, message: "Error Occured" });
          return;
        }

        // console.log(user);
        if (user) {
          Forgot.collection.drop();
          res
            .status(200)
            .json({ success: true, message: "Password Update successffully" });
          return;
        } else {
          res.status(200).json({ success: false, message: "Error Occured" });
          return;
        }
      } else {
        Forgot.collection.drop();
        res.status(200).json({ success: false, message: "User Not Found" });
        return;
      }

      //   const validToken = await bcrypt.compare(token, user.password)
    }
  } else {
    res.status(200).json({ name: "invalid req" });
  }
}
