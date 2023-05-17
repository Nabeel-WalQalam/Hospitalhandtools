import connectDb from "@/Middleware/connectDb";
import WishList from "@/models/WishList";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await connectDb().catch((error) => console.error(error));

    let user = await WishList.find();

    // console.log(user);
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
      return;
    } else {
      res.status(200).json({
        success: false,
        data: user,
      });
      return;
    }
  } else {
    res.status(200).json({ error: "error" });
  }
}
