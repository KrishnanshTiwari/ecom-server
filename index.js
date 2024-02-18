const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const router = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const mongoURI = process.env.mongoURI;
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// router
app.use("/", router());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Start the server and connect to mongodb
const startServer = async () => {
  try {
    connectDB(mongoURI);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
