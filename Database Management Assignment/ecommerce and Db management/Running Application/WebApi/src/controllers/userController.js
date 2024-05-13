const { verify } = require("../email-notification/notification");
const userRepository = require("../repositories/userRepository");
const token = require("../routes/jwt-token");

// Example controller method to get a user by ID
async function getAll(req, res) {
  try {
    const user = await userRepository.getAll();
    console.log("controller-get-all ", user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user by ID" });
  }
}

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const jwt_Token = await token.generateJwtToken(email, password);
    const result = await userRepository.login(email, password, jwt_Token);
    console.log("controller-login ", result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error in user login" });
  }
}

async function register(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  const result = await userRepository.register(name, email, password, userType);
  console.log("controller-register ", result);
  res.json(result);
}

async function forgotPassword(req, res) {
  const email = req.body.email;
  const result = await userRepository.forgotPassword(email);
  console.log("forget-password ", result);
  res.json(result);
}

async function verifyEmail(req, res) {
  var email = req.query.email;
  var password = req.query.password;

  const htmlContent = `
    <h1>Hello from Node.js server!</h1>
    <p style="color: green; font-size: 25px;">Email Verified Successfully </p>
  `;

  const result = await userRepository.verifyEmail(email, password);
  if (result.message) {
    res.setHeader("Content-Type", "text/html");
    res.send(htmlContent);
  }
}
module.exports = {
  getAll,
  login,
  register,
  forgotPassword,
  verifyEmail,
};
