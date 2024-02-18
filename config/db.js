const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("connceted to mongo"))
    .catch((err) => {
      console.error("Failed to connected mongo");
      console.error(err);
    });
};

module.exports = connectDB;
