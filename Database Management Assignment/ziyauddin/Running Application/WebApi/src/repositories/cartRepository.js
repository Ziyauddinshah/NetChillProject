const sql = require("../database/db");
const transporter = require("../email-notification/notification");

class CartRepository {
  async getAll() {
    try {
      const data = await sql.query("SELECT * FROM Cart ORDER BY Id ASC");
      console.log("cart-repository ", data);
      return data.recordset;
    } catch (error) {
      throw new Error("Error creating user");
    }
  }
  async addToCart(req, res) {
    try {
      const query1 = `Select * from Cart where ProductId = ${productId} and UserId = ${userId}`;
      const query2 = `Insert into Cart(ProductId,UserId) Values(${productId},${userId})`;
      const query3 = `Select * from Inventory where Id = ${productId}`;
      const result1 = await sql.query(query1);
      if (result1.recordset.length > 0) {
        const data = {
          message: "item already present in user's cart",
        };
        return data;
      } else {
        const result2 = await sql.query(query2);
        if (result2) {
          const result3 = await sql.query(query3);
          console.log("result: ", result3.recordset[0]);
          return result3.recordset[0];
        }
      }
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
    } catch (error) {
      res.status(500).json({ error: "Error fetching in adding to cart" });
    }
  }
  async getCartDataByUserId(req, res) {
    try {
      const data = await sql.query("SELECT * FROM Cart ORDER BY Id ASC");
      console.log("cart-repository ", data);
      return data.recordset;
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching in getting cart data by id" });
    }
  }

  async deleteCartDataByProductIdAndUserId(req, res) {
    try {
      const data = await sql.query("SELECT * FROM Cart ORDER BY Id ASC");
      console.log("cart-repository ", data);
      return data.recordset;
    } catch (error) {
      res.status(500).json({
        error: "Error fetching in deleting cart data by userId and productId",
      });
    }
  }
}

module.exports = new CartRepository();
