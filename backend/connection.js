// Connection for Database

const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react-boilerplate",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MYSQL Database");
});

module.exports = connection;
