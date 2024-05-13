const express = require("express");
const router = express.Router();
const sql = require("../database/db");

router.get("/get-all", function (req, res) {
  const query = "Select * from Cart";
  sql.query(query, function (error, result) {
    if (error) {
      console.log("error: ", error);
    } else {
      console.log("result: ", result);
      res.send(result.recordset);
    }
  });
});

router.post("/add", function (req, res) {
  const productId = req.body.ProductId;
  const userId = req.body.UserId;
  //console.log(productId, userId);
  const query1 = `Select * from Cart where ProductId = ${productId} and UserId = ${userId}`;
  const query2 = `Insert into Cart(ProductId,UserId) Values(${productId},${userId})`;
  const query3 = `Select * from Inventory where Id = ${productId}`;

  sql.query(query1, function (error1, result1) {
    if (error1) {
      console.log("error: ", error1);
    } else {
      if (result1.recordset.length > 0) {
        res.send({ message: "item already present in user's cart" });
      } else {
        sql.query(query2, function (error2, result2) {
          if (error2) {
            console.log("error: ", error2);
          } else {
            sql.query(query3, function (error3, result3) {
              if (error3) {
                console.log("error: ", error3);
              } else {
                console.log("result: ", result3.recordset[0]);
                res.send(result3.recordset[0]);
              }
            });
          }
        });
      }
    }
  });
});

router.get("/data/:userId", function (req, res) {
  const userId = req.params.userId;
  const url = "http://localhost:3000/uploads/";
  const query1 = `SELECT * FROM Inventory WHERE Id IN (SELECT ProductId FROM Cart WHERE UserId = ${userId})`;
  sql.query(query1, function (error1, result1) {
    if (error1) {
      console.log("error1: ", error1);
    } else {
      console.log("Result: ", result1.recordset);
      result1.recordset.forEach((element) => {
        element.ProductImage = url + element.ProductImage;
      });
      res.send(result1.recordset);
    }
  });
});

router.delete("/delete/:productId/:userId", function (req, res) {
  const productId = req.params.productId;
  const userId = req.params.userId;
  //console.log(productId, userId);
  const query1 = `Select * FROM Cart WHERE ProductId = ${productId} and UserId = ${userId}`;

  sql.query(query1, function (error1, result1) {
    if (error1) {
      console.log("error: ", error1);
    } else {
      if (result1.recordset.length > 0) {
        const id = result1.recordset[0].Id;
        const query2 = `Delete FROM Cart WHERE Id=${id}`;
        sql.query(query2, function (error2, result2) {
          if (error2) {
            console.log("error: ", error2);
          } else {
            res.send({ message: "item deleted from cart" });
          }
        });
      } else {
        res.send({ message: "item not present in cart" });
      }
    }
  });
});

module.exports = router;
