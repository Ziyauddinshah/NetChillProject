// Assuming you have a database connection or an ORM set up
const sql = require("../database/db");
const transporter = require("../email-notification/notification");

class UserRepository {
  async getAll() {
    /* Get All Record. */
    try {
      const data = await sql.query("SELECT * FROM Users ORDER BY Id ASC");
      console.log("repository ", data);
      return data.recordset;
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  async login(email, password, jwt_Token) {
    try {
      const query = `Select * from Users where EmailId = '${email}' and Password = '${password}'`;
      const results = await sql.query(query);
      if (results.recordset.length > 0) {
        console.log("Results: success");
        const data = {
          message: "Login Success",
          data: results.recordset,
          jwtToken: jwt_Token,
        };
        return data;
      } else {
        console.log("Results: user did not found");
        const data = { message: "User did not found, try again! ", data: [] };
        return data;
      }
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  async register(name, email, password, userType) {
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
    const results1 = await sql.query(selectQuery);
    if (results1.recordset.length > 0) {
      const data = { message1: "User already present " };
      return data;
    } else {
      const result2 = await sql.query(insertQuery);
      if (result2) {
        const message = await this.sendEmailForUserVerification(
          email,
          name,
          password
        );
        if (message.status) {
          const data = {
            message1: "Inserted successfully! ",
            message2: "Verification email sent to your registered emailId",
          };
          return data;
        }
      }
    }
  }

  async sendEmailForUserVerification(email, name, password) {
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
    const data = {
      status: true,
    };
    return data;
  }

  async forgotPassword(email) {
    const query = `Select * from Users where EmailId = '${email}'`;
    const result = await sql.query(query);
    if (result.recordset.length > 0) {
      const password = result.recordset[0].Password;
      const message = this.sendPasswordToEmail(email, password);
      if (message.status) {
        const data = { message: "Password sent to registered email" };
        return data;
      }
    } else {
      const data = { message: "Wrong email" };
      return data;
    }
  }
  
  sendPasswordToEmail(email, password) {
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
    const data = {
      status: true,
    };
    return data;
  }

  async verifyEmail(email, password) {
    const query = `Update Users set IsVerified = ${1} where EmailId = '${email}' and Password = '${password}'`;
    const result = await sql.query(query);
    if (result) {
      console.log("email verified successfully");
      const data = {
        message: "Email verified successfully",
      };
      return data;
    }
  }
}

module.exports = new UserRepository();
