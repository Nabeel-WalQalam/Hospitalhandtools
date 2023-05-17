import connectDb from "../../Middleware/connectDb";
import order from "../../models/Order";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    let getOrder;
    // console.log(billingData, orderId, shippingData, products, amount, cart);
    // console.log(req.body.postOrderData.purchase_units[0]);
    // console.log(
    //   parseInt(req.body.postOrderData.purchase_units[0].description),
    //   req.body.postOrderData.purchase_units[0].description
    // );
    let oid = req.body.postOrderData.purchase_units[0].description;
    // console.log(req.body.postOrderData.status);
    if (req.body.postOrderData.status === "COMPLETED") {
      try {
        getOrder = await order.findOneAndUpdate(
          {
            orderId: oid,
          },
          { status: "Paid", paymentInfo: JSON.stringify(req.body) }
        );
      } catch (error) {
        return res
          .status(200)
          .json({ success: false, message: "error occured" });
      }

      let products = getOrder;
      // console.log("orderProducts", products);
      for (let item = 0; item < products.products.length; item++) {
        // console.log(item);

        let tempProduct = await Product.findOne({
          title: products.products[item].title,
        });
        if (tempProduct.quantity > 0) {
          try {
            await Product.findOneAndUpdate(
              { title: products.products[item].title },
              { $inc: { quantity: -products.products[item].quantity } }
            );
          } catch (error) {
            return res
              .status(200)
              .json({ success: false, message: "error occured" });
          }
        }
      }
    } else if (req.body.postOrderData.status === "PENDING") {
      getOrder = await order.findOneAndUpdate(
        {
          orderId: parseInt(
            req.body.postOrderData.purchase_units[0].description
          ),
        },
        { status: "Pending", paymentInfo: req.body }
      );
    }
    // res.redirect(307, "/order");

    res.status(200).json({ success: true, payload: getOrder });
  } else {
    res.status(400).json({ error: "this method is not applied" });
  }
}
