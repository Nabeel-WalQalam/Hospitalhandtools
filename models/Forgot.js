const mongoose = require("mongoose");

const forgotSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    token: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.models.Forgot || mongoose.model("Forgot", forgotSchema);
