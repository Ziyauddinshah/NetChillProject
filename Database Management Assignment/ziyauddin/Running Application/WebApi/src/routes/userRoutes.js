const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Define the route to get a user by ID
router.get("/get-all", userController.getAll);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/forget-password", userController.forgotPassword);
router.get("/verify-email", userController.verifyEmail);

module.exports = router;
