var express = require("express");
var router = express.Router();
var sql = require("../database/db");

/* Get All Record. */
router.get("/get-all", function (req, res, next) {
  var newData = [];
  sql.query("SELECT * FROM Users", function (err, data) {
    if (err) {
      console.log(err);
      //res.send(err);
    } else {
      console.log(data.recordset[0].UserName);
      newData = data.recordset;
      res.json(newData);
    }
  });
});

// // DELETE Record
// router.get("/remove/(:id)", function (req, res, next) {
//   var user = { RollNo: req.params.id };
//   console.log(user.RollNo);
//   sql.query(
//     "DELETE FROM StudentResult WHERE RollNo = " + user.RollNo,
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//         res.send(result);
//       }
//     }
//   );
// });

// // INSERT Record
// router.post("/add-result", function (req, res, next) {
//   console.log(req.body);
//   sql.query(
//     "Insert into StudentResult (RollNo,Name,DOB,Score) VALUES ('" +
//       req.body.rollNo +
//       "','" +
//       req.body.name +
//       "','" +
//       req.body.dateOfBirth +
//       "','" +
//       req.body.score +
//       "')",
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         //console.log(result);
//         res.send(result);
//       }
//     }
//   );
// });

// // Edit Record
// router.put("/edit-result", function (req, res, next) {
//   var rollNo = req.body.rollNo;
//   console.log(rollNo);
//   sql.query(
//     "UPDATE StudentResult SET Name='" +
//       req.body.name +
//       "', DOB='" +
//       req.body.dateOfBirth +
//       "', Score='" +
//       req.body.score +
//       "' WHERE RollNo='" +
//       req.body.rollNo +
//       "'",
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         //console.log(result);
//         res.send(result);
//       }
//     }
//   );
// });

// router.get("/student-result/:rollNo/:name", function (req, res, next) {
//   var rollNo = req.params.rollNo;
//   var name = req.params.name;
//   var newData = [];
//   sql.query(
//     "SELECT * FROM StudentResult WHERE RollNo = '" +
//       rollNo +
//       "' and Name = '" +
//       name +
//       "';",
//     function (err, result) {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         console.log(result.recordset);
//         newData = result.recordset;
//         res.json(newData);
//       }
//     }
//   );
// });

module.exports = router;
