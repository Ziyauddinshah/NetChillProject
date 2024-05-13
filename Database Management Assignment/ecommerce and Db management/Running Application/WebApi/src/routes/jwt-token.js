const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var secretKey = "jwt-token-key";

const generateJwtToken = async (email, password) => {
  const encryptedPassword = bcrypt.hash(password, 10);

  let user = {
    name: "Jwt-Token",
    email: email.toLowerCase(),
    password: encryptedPassword,
  };

  // Create token
  const token = jwt.sign(user, secretKey, { expiresIn: "20h" });
  return token;
};

const verifyToken = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const auth = authHeader.split(" ");
  // const token = auth[1];
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }
  try {
    const stringWithoutFirstAndLast = token.substring(1, token.length - 1);
    // console.log("JWT Token For verification:-> ", stringWithoutFirstAndLast);
    jwt.verify(stringWithoutFirstAndLast, secretKey, (error, decoded) => {
      if (error) {
        console.error("JWT Verification Error:", error);
      } else {
        console.log("Decoded Token:", decoded);
        next();
      }
    });
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
};

module.exports = { generateJwtToken, verifyToken };
