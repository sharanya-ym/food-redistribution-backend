const express = require("express");
const router = express.Router();

const {
  makeRequest,
  getRequestsForRecipient,
  getRequestsForProvider,
  updateRequestStatus,
} = require("../controllers/requestController");

// 🔁 Order matters!
router.post("/make", makeRequest); // Create new request
router.get("/provider/:providerId", getRequestsForProvider); // Requests for provider's food
router.get("/:recipientId", getRequestsForRecipient); // Recipient's own requests
router.put("/:id/status", updateRequestStatus); // Update status

module.exports = router;
