import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
  weights: {
    type: [],
  },
  country: {
    type: [],
  },
  zone: { type: Number, require: true },
});

export default mongoose.models.Zone || mongoose.model("Zone", zoneSchema);
