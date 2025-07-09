const Request = require("../models/Request");
const FoodItem = require("../models/FoodItem");

// 1. Make a new request
exports.makeRequest = async (req, res) => {
  try {
    const { recipient, foodItem } = req.body;

    const request = new Request({
      recipient,
      foodItem,
      status: "pending",
    });

    await request.save();
    res.status(201).json({ message: "Request placed", request });
  } catch (err) {
    console.error("❌ Error making request:", err);
    res.status(500).json({ message: "Failed to make request", error: err.message });
  }
};

// 2. Get all requests for a recipient
exports.getRequestsForRecipient = async (req, res) => {
  try {
    const { recipientId } = req.params;

    const requests = await Request.find({ recipient: recipientId })
      .populate("foodItem")
      .populate("recipient", "name");

    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching recipient requests:", err);
    res.status(500).json({ message: "Failed to fetch requests", error: err.message });
  }
};

// 3. Get all requests for food provided by a provider
exports.getRequestsForProvider = async (req, res) => {
  try {
    const { providerId } = req.params;

    const requests = await Request.find()
      .populate({
        path: "foodItem",
        match: { provider: providerId },
        populate: { path: "provider", select: "name" },
      })
      .populate("recipient", "name");

    const filtered = requests.filter((req) => req.foodItem !== null);
    res.json(filtered);
  } catch (err) {
    console.error("❌ Error fetching provider requests:", err);
    res.status(500).json({ message: "Failed to fetch provider requests", error: err.message });
  }
};

// 4. Update delivery status
exports.updateRequestStatus = async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;

  console.log("🔄 Updating status for:", requestId, "->", status);

  const validStatuses = ["pending", "in transit", "delivered", "completed"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value", received: status });
  }

  try {
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    console.log("✅ Status updated:", request._id, "to", status);
    res.json({ message: "Status updated", request });
  } catch (err) {
    console.error("❌ Error updating status:", err);
    res.status(500).json({ message: "Failed to update request", error: err.message });
  }
};
