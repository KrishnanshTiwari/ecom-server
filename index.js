const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const mongoURI = process.env.mongoURI;
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Start the server and connect to mongodb
const startServer = async () => {
  try {
    console.log(mongoURI);
    connectDB(mongoURI);
    app.listen(8080, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
