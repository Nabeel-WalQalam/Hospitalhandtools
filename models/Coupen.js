import mongoose from "mongoose";

const coupenSchema = new mongoose.Schema({
  coupen: { type: String },
  coupenType: { type: String },
  coupenAmount: { type: Number },
  coupenFreeShipping: { type: Boolean },
});

export default mongoose.models.Coupen || mongoose.model("Coupen", coupenSchema);
