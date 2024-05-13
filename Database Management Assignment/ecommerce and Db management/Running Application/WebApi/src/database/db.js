var express = require("express");
var router = express.Router();

var sql = require("mssql/msnodesqlv8");

var dbConfig = {
  server: "IN-PG02P69W",
  database: "DbManagementAssignment",
  port: 1433,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};
sql.connect(dbConfig, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected");
  }
});
module.exports = sql;
