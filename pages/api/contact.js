const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_INBOUND_KEY);

export default async function handler(req, res) {
  //   await dbConnect();
  if (req.method == "POST") {
    if (req.body.sendMail == true) {
      const { name, email, message } = req.body;
      // console.log(name, email, message);

      // console.log(finduser);

      const msg = {
        to: "hospitalhandtool@gmail.com", // Change to your recipient
        from: email, // Change to your verified sender
        subject: "Contact",
        html: `${name}!.
        ${message} `,
      };
      await sgMail.send(msg);

      res.status(200).json({ success: true, message: "Email Send" });
    } else {
      res.status(200).json({ name: "invalid request" });
      return;
    }
  } else {
    res.status(200).json({ name: "invalid request" });
  }
}
