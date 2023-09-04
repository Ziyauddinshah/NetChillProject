const express = require("express");
const router = express.Router();
const transporter = require("../email-notification/notification");
const sql = require("../database/db");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });
// Serve the static files from the 'uploads' directory

router.post("/upload", uploadStorage.single("file"), (req, res) => {
  const imagePath = "http://localhost:3000/uploads/" + req.file.originalname;
  res.status(200).json({ imagePath: imagePath });
});

router.get("/get-all", function (req, res) {
  const query = "Select * from Inventory";
  const url = "http://localhost:3000/uploads/";
  sql.query(query, function (error, result) {
    if (error) {
      console.log("Error: ", error);
      res.send(error);
    } else {
      console.log("Result: ", result.recordset);
      result.recordset.forEach((element) => {
        element.ProductImage = url + element.ProductImage;
      });
      res.send(result.recordset);
    }
  });
});

router.get("/data/:productId", function (req, res) {
  const productId = req.params.productId;
  const url = "http://localhost:3000/uploads/";
  const query = `Select * from Inventory where Id = ${productId}`;
  sql.query(query, function (error, result) {
    if (error) {
      console.log("Error: ", error);
      res.send(error);
    } else {
      console.log("Result: ", result.recordset);
      result.recordset.forEach((element) => {
        element.ProductImage = url + element.ProductImage;
      });
      res.send(result.recordset);
    }
  });
});

router.get("/data/seller/:sellerId", function (req, res) {
  const sellerId = req.params.sellerId;
  const url = "http://localhost:3000/uploads/";
  const query = `Select * from Inventory where SellerId = ${sellerId}`;
  sql.query(query, function (error, result) {
    if (error) {
      console.log("Error: ", error);
      res.send(error);
    } else {
      console.log("Result: ", result.recordset);
      result.recordset.forEach((element) => {
        element.ProductImage = url + element.ProductImage;
      });
      res.send(result.recordset);
    }
  });
});

router.post("/add", function (req, res) {
  const url = "http://localhost:3000/uploads/";
  const productName = req.body.productName;
  const productPrice = parseFloat(req.body.productPrice);
  const productDiscount = parseFloat(req.body.productDiscount);
  const sellerId = parseInt(req.body.sellerId);
  const productImage = req.body.productImage;
  const query1 = `Insert into Inventory(ProductName,ProductPrice,ProductDiscount,SellerId,ProductImage) Values('${productName}',${productPrice},${productDiscount},${sellerId},'${productImage}')`;
  const query2 = `Select * from Inventory where ProductName='${productName}' and ProductPrice=${productPrice} and ProductDiscount=${productDiscount}`;
  sql.query(query1, function (error1, result1) {
    if (error1) {
      console.log("Error1: ", error1);
    } else {
      if (result1.rowsAffected.length > 0) {
        sendNotificationToAllBuyer(
          productName,
          productPrice,
          productDiscount,
          sellerId
        );
        sql.query(query2, function (error2, result2) {
          if (error2) {
            console.log("Error2: ", error2);
          } else {
            console.log("product inserted successfully");
            result2.recordset.forEach((element) => {
              element.ProductImage = url + element.ProductImage;
            });
            res.send(result2.recordset[0]);
          }
        });
      } else {
        res.send({ message: "can't insert this product " });
      }
    }
  });
});

const sendNotificationToAllBuyer = (
  productName,
  productPrice,
  productDiscount,
  sellerId
) => {
  const htmlContent = `
      <h4>Hello Dear! Your wait is over now</h4>
      <p>We have new product for you</p>
      <p><b>Item Name: </b>${productName}</p>
      <p><b>Price: </b>${productPrice}</p>
      <p><b>Discount: </b>${productDiscount}</p>
      <p>Hope you like this</p>
    `;

  const recipients = [
    "ziyazindagi1999@gmail.com",
    "ziyauddinshah8890@gmail.com",
  ];
  const query = `Select * from Users where Id != ${sellerId}`;
  const x = sql.query(query, function (error, result) {
    if (error) {
      console.log("no buyer found to send notification");
    } else {
      const data = result.recordset;
      data.forEach((element) => {
        recipients.push(element.EmailId);
      });

      // Send an example email
      const mailOptions = {
        from: "ziyauddin270499@gmail.com",
        to: recipients.join(", "),
        subject: "Hello from Gmail",
        html: htmlContent,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
    }
  });
};

router.delete("/delete/:productId", function (req, res) {
  const productId = req.params.productId;
  const query1 = `SELECT * FROM Inventory WHERE Id = ${productId}`;
  const query2 = `Delete from Inventory where Id = ${productId}`;
  sql.query(query1, function (error1, result1) {
    if (error1) {
      console.log(error1);
      res.status(500).json({ error: "Error deleting data" });
    } else {
      const deletedData = result1.recordset[0];
      sql.query(query2, (err, result2) => {
        if (err) {
          console.error("Error fetching deleted data:", err);
          res.status(500).json({ error: "Error fetching deleted data" });
        } else {
          res.json(deletedData);
        }
      });
    }
  });
});

router.get("/search", function (req, res) {
  const name = req.query.name;
  const price = parseFloat(req.query.price);
  const url = "http://localhost:3000/uploads/";
  const query = `Select * from Inventory where ProductName = '${name}' or ProductPrice = ${price}`;
  sql.query(query, function (error, result) {
    if (error) {
      console.log("error: ", error);
    } else {
      console.log("result: ", result);
      result.recordset.forEach((element) => {
        element.ProductImage = url + element.ProductImage;
      });
      res.send(result.recordset);
    }
  });
});

router.post("/order-product", function (req, res) {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0]; // Convert to 'YYYY-MM-DD' format
  const selectQueryForBuyer = `Select * from Users where Id = ${userId} and UserType = 'Buyer'`;
  const selectQueryForSeller = `Select * from Users where Id IN (Select SellerId from Inventory where Id = ${productId}) and UserType = 'Seller'`;
  const selectQuery = `Select * from OrderHistory where ProductId = ${productId} and BuyerId = ${userId}`;
  sql.query(selectQueryForBuyer, function (error1, result1) {
    if (error1) {
      console.log("error1: ", error1);
    } else {
      if (result1.recordset.length > 0) {
        const buyerEmail = result1.recordset[0].EmailId;
        const buyerName = result1.recordset[0].UserName;
        //sendOrderPlacedEmailNotificationToBuyer(buyerEmail, buyerName);
        console.log("email sent to buyer");
        sql.query(selectQueryForSeller, function (error2, result2) {
          if (error2) {
            console.log("error2: ", error2);
          } else {
            if (result2.recordset.length > 0) {
              const sellerEmail = result2.recordset[0].EmailId;
              const sellerName = result2.recordset[0].UserName;
              const sellerId = result2.recordset[0].Id;
              //sendEmailNotificationToSeller(sellerEmail, sellerName);
              console.log("email sent to seller");
              sql.query(selectQuery, function (error3, result3) {
                if (error3) {
                  console.log("error3: ", error3);
                } else {
                  if (result3.recordset.length > 0) {
                    console.log("Order placed already");
                    res.send({ message: "Order placed already" });
                  } else {
                    const orderQuery = `Insert into OrderHistory(ProductId,BuyerId,OrderDate,SellerId) Values(${productId},${userId},'${formattedDate}',${sellerId})`;
                    sql.query(orderQuery, function (error4, result4) {
                      if (error4) {
                        console.log("error4: ", error4);
                      } else {
                        console.log("Order placed successfully");
                        res.send({ message: "Order placed successfully" });
                      }
                    });
                  }
                }
              });
            } else {
              console.log("no seller found");
            }
          }
        });
      } else {
        console.log("no buyer found");
      }
    }
  });
});

const sendOrderPlacedEmailNotificationToBuyer = (email, name) => {
  const htmlContent = `
      <h4>Hello ${name}!</h4>
      <p>User order is placed successfully</p>
      <p>We have new product for you</p>
    `;

  const recipients = ["ziyazindagi1999@gmail.com", email];

  // Send an example email
  const mailOptions = {
    from: "ziyauddin270499@gmail.com",
    to: recipients.join(", "),
    subject: "Order Placed",
    html: htmlContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent to seller: ", info.response);
    }
  });
};

const sendEmailNotificationToSeller = (email, name) => {
  const htmlContent = `
      <h4>Hello ${name}!</h4>
      <p>User want to buy your item</p>
    `;

  const recipients = ["ziyazindagi1999@gmail.com", email];

  // Send an example email
  const mailOptions = {
    from: "ziyauddin270499@gmail.com",
    to: recipients.join(", "),
    subject: "Sell your item",
    html: htmlContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent to seller: ", info.response);
    }
  });
};

router.get("/get-all-order-history/:userId", function (req, res) {
  const userId = req.params.userId;
  const url = "http://localhost:3000/uploads/";
  const selectQuery = `Select i.Id,i.ProductName,i.ProductPrice,i.ProductDiscount,i.ProductImage, o.OrderDate from Inventory i inner join OrderHistory o on i.Id = o.ProductId where o.BuyerId = ${userId}`;
  sql.query(selectQuery, function (error1, result1) {
    if (error1) {
      console.log("error1: ", error1);
    } else {
      if (result1.recordset.length > 0) {
        result1.recordset.forEach((element) => {
          element.ProductImage = url + element.ProductImage;
        });
        res.send(result1.recordset);
      } else {
        res.send([]);
      }
    }
  });
});

router.post("/get-order-history-by-date", function (req, res) {
  const url = "http://localhost:3000/uploads/";
  const userId = req.body.userId;
  const orderDate = req.body.date;
  const query = `Select i.Id,i.ProductName,i.ProductPrice,i.ProductDiscount,i.ProductImage, o.OrderDate from Inventory i inner join OrderHistory o on i.Id = o.ProductId where o.OrderDate <= '${orderDate}' and o.BuyerId = ${userId}`;
  sql.query(query, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log("result ", result.recordset);
      result.recordset.forEach((element) => {
        element.ProductImage = url + element.ProductImage;
      });
      res.send(result.recordset);
    }
  });
});

module.exports = router;
