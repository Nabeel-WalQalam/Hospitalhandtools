import connectDb from "../../Middleware/connectDb";
import Product from "@/models/Product";
import Coupen from "@/models/Coupen";
import order from "../../models/Order";

export default async function handler(req, res) {
  await connectDb();
  if (req.method == "POST") {
    const {
      data,
      orderId,
      cart,
      user,
      subtotal,
      payment,
      grandTotal,
      WeightPrice,
      isCoupenApplid,
      discountPrice,
      coupenUsed,
    } = req.body;

    // console.log(Object.keys(cart).length);

    if (Object.keys(cart).length) {
      if (isCoupenApplid) {
        let allCoupens = await Coupen.find();

        allCoupens.map((items) => {
          if (items.coupen === coupenUsed) {
            let discountedAmount = grandTotal * (items.coupenAmount / 100);
            // console.log(discountedAmount);
            if (discountedAmount == discountPrice) {
              let getOrder = async () => {
                let product,
                  sumtotal = 0;
                if (subtotal <= 0) {
                  res.status(200).json({
                    success: false,
                    message: "please build you cart and try again!",
                  });
                  return;
                }
                for (let i = 0; i < Object.keys(cart).length; i++) {
                  // console.log(" item", cart[item].productName);
                  sumtotal += cart[i].price * cart[i].quantity;
                  product = await Product.findOne({ title: cart[i].title });
                  // console.log(product);
                  if (product) {
                    // console.log("find", product);
                    if (cart[i].qty < 0) {
                      res.status(200).json({
                        success: false,
                        message: "some items in your cart is out of stock!",
                      });
                      return;
                    }

                    if (product.priceType === "fixed") {
                      if (product.fixedPrice !== cart[i].price) {
                        res.status(200).json({
                          success: false,
                          message:
                            "Price of some items have change please try again!",
                        });
                        return;
                      }
                    } else {
                      if (
                        cart[i].price < product.minPrice &&
                        cart[i].price > product.maxPrice
                      ) {
                        res.status(200).json({
                          success: false,
                          message:
                            "Price of some items have change please try again!",
                        });
                        return;
                      }
                    }
                  } else {
                    res.status(200).json({
                      success: false,
                      message:
                        "Some Products might have Change. Please Build your Cart again!",
                    });
                    return;
                  }
                }
                if (sumtotal != subtotal) {
                  res.status(200).json({
                    success: false,
                    message:
                      "Price of some items have change please try again!",
                  });
                  return;
                }

                try {
                  let Order = await new order({
                    orderId: orderId,
                    products: cart,
                    deliveryData: data,
                    amount: subtotal,
                    user: user,

                    paymentMethod: payment,
                    grandTotal: grandTotal,
                    WeightPrice: WeightPrice,
                    isCoupenApplid: isCoupenApplid,
                    discountPrice: discountPrice,
                    coupenUsed: coupenUsed,
                  });

                  await Order.save();

                  res.status(200).json({ success: true, Orders: Order });
                } catch (message) {
                  console.log(message);
                }
              };

              getOrder();
            } else {
              res.status(200).json({
                success: false,
                message: "message Occured",
              });
              return;
            }
          } else {
            res.status(200).json({
              success: false,
              message: "message Occured",
            });
            return;
          }
        });
      } else {
        let product,
          sumtotal = 0;
        if (subtotal <= 0) {
          res.status(200).json({
            success: false,
            message: "please build you cart and try again!",
          });
          return;
        }
        for (let i = 0; i < Object.keys(cart).length; i++) {
          // console.log(" item", cart[i]);
          sumtotal += cart[i].price * cart[i].quantity;
          console.log(sumtotal, subtotal);
          product = await Product.findOne({ title: cart[i].title });
          // console.log(product);
          if (product) {
            // console.log("find", product);
            if (cart[i].qty < 0) {
              res.status(200).json({
                success: false,
                message: "some items in your cart is out of stock!",
              });
              return;
            }

            if (product.priceType === "fixed") {
              if (product.fixedPrice != cart[i].price) {
                res.status(200).json({
                  success: false,
                  message: "Price of some items have change please try again!1",
                });
                return;
              }
            } else {
              if (
                cart[i].price < product.minPrice &&
                cart[i].price > product.maxPrice
              ) {
                res.status(200).json({
                  success: false,
                  message: "Price of some items have change please try again!2",
                });
                return;
              }
            }
          } else {
            res.status(200).json({
              success: false,
              message:
                "Some Products might have Change. Please Build your Cart again!",
            });
            return;
          }
        }
        if (sumtotal != subtotal) {
          res.status(200).json({
            success: false,
            message: "Price of some items have change please try again!3",
          });
          return;
        }

        try {
          let Order = await new order({
            orderId: orderId,
            products: cart,
            deliveryData: data,
            amount: subtotal,
            user: user,
            paymentMethod: payment,
            grandTotal: grandTotal,
            WeightPrice: WeightPrice,
          });

          await Order.save();

          res.status(200).json({ success: true, Orders: Order });
        } catch (message) {
          console.log(message);
        }
      }
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Please Try Again" });
    }
  } else {
    res.status(400).json({ message: "this method is not applied" });
  }
}
