const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true }, // e.g., "Bangalore" or "12.97,77.59"
  contactNumber: { type: String, required: true },
  status: { type: String, default: "available" }
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
