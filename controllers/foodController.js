// server/controllers/foodController.js
// server/controllers/foodController.js
const FoodItem = require("../models/FoodItem");

exports.addFoodItem = async (req, res) => {
  try {
    const { name, quantity, type, expiryDate, provider, location, contactNumber } = req.body;

    console.log("📥 Received data:", req.body);

    if (!name || !quantity || !type || !expiryDate || !provider || !location || !contactNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const foodItem = new FoodItem({
      name,
      quantity,
      type,
      expiryDate,
      provider,
      location,
      contactNumber
    });

    await foodItem.save();

    return res.status(201).json({ message: "Food item added successfully", foodItem });
  } catch (err) {
    console.error("❌ Error adding food:", err);
    return res.status(500).json({ message: "Failed to add food item", error: err.message });
  }
};









   

exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ status: "available" }).populate("provider", "name");
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch food items", error: err.message });
  }
};
