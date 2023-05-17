import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
  name: { type: String },
  values: {
    type: [],
  },
});

export default mongoose.models.Attribute ||
  mongoose.model("Attribute", attributeSchema);
