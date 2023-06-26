const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;
const db = require("./config/database");

app.use(cors());
app.use(express.json());
app.use("/", require("./routes/index"));
//use express router
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
