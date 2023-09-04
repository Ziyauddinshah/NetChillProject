const cartRepository = require("../repositories/cartRepository");
const token = require("../routes/jwt-token");

// Example controller method to get a user by ID
async function getAll(req, res) {
  try {
    const carts = await cartRepository.getAll();
    console.log("cart-controller-get-all ", carts);
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getting cart data " });
  }
}

async function addToCart(req, res) {
  const productId = req.body.ProductId;
  const userId = req.body.UserId;
  const result = cartRepository.addToCart(productId, userId);
  res.json(result);
  try {
  } catch (error) {
    res.status(500).json({ error: "Error fetching in adding to cart" });
  }
}
async function getCartDataByUserId(req, res) {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching in getting cart data by id" });
  }
}

async function deleteCartDataByProductIdAndUserId(req, res) {
  try {
  } catch (error) {
    res.status(500).json({
      error: "Error fetching in deleting cart data by userId and productId",
    });
  }
}

module.exports = {
  getAll,
  addToCart,
  getCartDataByUserId,
  deleteCartDataByProductIdAndUserId,
};
