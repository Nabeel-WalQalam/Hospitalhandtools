import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, require: true },
  slug: { type: String, require: true },
  category: { type: String, require: true },
  short_description: { type: String },
  long_description: { type: String },
  combination: [],
  combination_set: { type: String },
  image: {
    type: [String], // specify that image is an array of strings
  },
  options: {
    type: [],
  },
  backOrder: { type: Boolean, require: true },
  priceType: { type: String, require: true },
  variants: { type: String, require: true },
  minPrice: { type: Number },
  maxPrice: { type: Number },
  fixedPrice: { type: Number },
  salePrice: { type: Number },
  model: { type: String, require: true },
  quantity: { type: Number, require: true },
  tags: {
    type: [String],
  },
  weight: { type: String, require: true },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
