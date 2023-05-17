import connectDb from "../../Middleware/connectDb";
import WishList from "@/models/WishList";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    // console.log(req.body.data);

    let getWishList = await WishList.findOne({
      title: req.body.data.title,
    });
    if (getWishList) {
      // console.log(getWishList);
      res.status(200).json({ success: false, msg: "error Occured" });
      return;
    } else {
      const Products = new WishList({
        title: req.body.data.title,
        slug: req.body.data.slug,
        description: req.body.data.description,
        image: req.body.data.image,
        options: req.body.data.options,
        model: req.body.data.model,
        quantity: req.body.data.quantity,
        tags: req.body.data.tags,
        weight: req.body.data.weight,
        minPrice: req.body.data.minPrice,
        maxPrice: req.body.data.maxPrice,
        category: req.body.data.category,
        userToken: req.body.token,
      });

      let saveProduct = await Products.save();
      if (saveProduct) {
        res.status(200).json({ success: true, msg: "Successfully Added" });
        return;
      } else {
        res.status(200).json({ success: false, msg: "error Occured" });
        return;
      }
    }
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
