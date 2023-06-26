const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/Authentication_System_With_DOCKER",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database ::");
});

module.exports = db;
