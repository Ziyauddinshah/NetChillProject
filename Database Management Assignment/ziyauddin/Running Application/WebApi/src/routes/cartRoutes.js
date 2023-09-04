const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

// Define the route to get a user by ID
router.get("/get-all", cartController.getAll);
router.post("/add", cartController.addToCart);
router.get("/data/:userId", cartController.getCartDataByUserId);
router.delete(
  "/delete/:productId/:userId",
  cartController.deleteCartDataByProductIdAndUserId
);

module.exports = router;
