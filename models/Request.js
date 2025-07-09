// server/models/Request.js
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },

  // ✅ Include "completed" in valid delivery statuses
  status: {
    type: String,
    enum: ["pending", "in transit", "delivered", "completed"],
    default: "pending"
  },

  requestedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", requestSchema);
