import mongoose from "mongoose";

const wishSchema = new mongoose.Schema({
  title: { type: String, require: true },
  slug: { type: String, require: true },
  category: { type: String, require: true },
  description: { type: String, require: true },

  image: {
    type: [String], // specify that image is an array of strings
  },
  options: {
    type: [],
  },
  minPrice: { type: Number, require: true },
  maxPrice: { type: Number },
  model: { type: String, require: true },
  quantity: { type: Number, require: true },
  tags: {
    type: [String],
  },
  weight: { type: String, require: true },
  userToken: { type: String },
});

export default mongoose.models.WishList ||
  mongoose.model("WishList", wishSchema);
