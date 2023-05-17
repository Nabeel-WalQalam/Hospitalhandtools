import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  mainCategory: { type: String },
  subCategory: {
    type: [],
    image: [Object],
  },
});

export default mongoose.models.Categorys ||
  mongoose.model("Categorys", categorySchema);
