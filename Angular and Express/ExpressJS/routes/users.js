var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  var data = [
    {
      a: "this is user a",
      b: "this is user b",
    },
  ];
  res.json(data);
});

module.exports = router;
