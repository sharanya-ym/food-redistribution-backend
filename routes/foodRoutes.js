// server/routes/foodRoutes.js
const express = require("express");
const router = express.Router();
const {
  addFoodItem,
  getAllFoodItems,
} = require("../controllers/foodController");

router.post("/add", addFoodItem);
router.get("/", getAllFoodItems);

module.exports = router;
