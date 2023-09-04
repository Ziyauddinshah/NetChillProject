const express = require("express");
const router = express.Router();
const transporter = require("../email-notification/notification");
const sql = require("../database/db");

const token = require("./jwt-token");

/* Get All Record. */
router.get("/get-all", token.verifyToken, function (req, res, next) {
  var newData = [];
  sql.query("SELECT * FROM Users ORDER BY Id ASC", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      newData = data.recordset;
      res.json(newData);
    }
  });
});

router.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const jwt_Token = token.generateJwtToken(email, password);
  console.log("generated jwt-token: ", jwt_Token);
  const query = `Select * from Users where EmailId = '${email}' and Password = '${password}'`;
  console.log(req.body);
  sql.query(query, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.send({ message: error });
    } else {
      if (results.recordset.length > 0) {
        console.log("Results: success");
        res.send({
          message: "Login Success",
          data: results.recordset,
          jwtToken: jwt_Token,
        });
      } else {
        console.log("Results: user did not found");
        res.send({ message: "User did not found, try again! ", data: [] });
      }
    }
  });
});

// Registeration
router.post("/register", function (req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  const selectQuery = `Select * from Users where EmailId = '${email}'`;
  const insertQuery =
    "Insert into Users (UserName,EmailId,Password,UserType) VALUES ('" +
    name +
    "','" +
    email +
    "','" +
    password +
    "','" +
    userType +
    "')";
  sql.query(selectQuery, (error1, results1) => {
    if (error1) {
      console.error("Database error1 :", error1);
      res.send({ message1: error1 });
    } else {
      if (results1.recordset.length > 0) {
        res.send({ message1: "User already present " });
      } else {
        sql.query(insertQuery, (error2, results2) => {
          if (error2) {
            console.error("Database error:", error2);
            res.send({ message2: error2 });
          } else {
            sendEmailForUserVerification(email, name, password);
            res.send({
              message1: "Inserted successfully! ",
              message2: "Verification email sent to your registered emailId",
            });
          }
        });
      }
    }
  });
});

const sendEmailForUserVerification = (email, name, password) => {
  const htmlContent = `
      <h4>Hello, ${name}</h4>
      <p>This is an HTML email sent using Node.js and nodemailer!</p>
      <p>Click on the link below to verify email: </p>
      <a href="http://localhost:3000/users/verify-email?email=${email}&password=${password}">Verify</a>
    `;
  // Send an example email
  const mailOptions = {
    from: "ziyauddin270499@gmail.com",
    to: email,
    subject: "User Verification Email",
    html: htmlContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

// Verify Email
router.get("/verify-email", function (req, res) {
  var email = req.query.email;
  var password = req.query.password;

  const htmlContent = `
    <h1>Hello from Node.js server!</h1>
    <p style="color: green; font-size: 25px;">Email Verified Successfully </p>
  `;

  var query = `Update Users set IsVerified = ${1} where EmailId = '${email}' and Password = '${password}'`;

  sql.query(query, function (error, result) {
    if (error) {
      console.log("error: ", error);
    } else {
      console.log("email verified successfully");
    }
  });

  // Set the content type to 'text/html'
  res.setHeader("Content-Type", "text/html");
  res.send(htmlContent);
});

router.post("/forget-password", function (req, res) {
  const email = req.body.email;
  const query = `Select * from Users where EmailId = '${email}'`;
  sql.query(query, function (error, result) {
    if (error) {
      console.log("error: ", error);
    } else {
      const password = result.recordset[0].Password;
      sendPasswordToEmail(email, password);
      res.send({ message: "Password sent to registered email" });
    }
  });
});

const sendPasswordToEmail = (email, password) => {
  const htmlContent = `
      <h5>Hello,</h5>
      <p>Your EmailId is: ${email} </p>
      <p>Your Password is: ${password} </p>
    `;
  // Send an example email
  const mailOptions = {
    from: "ziyauddin270499@gmail.com",
    to: email,
    subject: "Forgot Password Email",
    html: htmlContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

module.exports = router;
