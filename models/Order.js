const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: Number, require: true },
    paymentInfo: { type: Array },
    products: { type: Object, require: true },
    deliveryData: { type: Object, require: true },
    amount: { type: Number, require: true },
    status: { type: String, default: "initiated", require: true },
    user: { type: String },
    DeliveryStatus: { type: String, default: "Processing", require: true },
    paymentMethod: { type: String, require: true },
    grandTotal: { type: Number, require: true },
    WeightPrice: { type: Number, require: true },
    isCoupenApplid: { type: Boolean, default: false },
    discountPrice: { type: Number },
    coupenUsed: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
