const express = require("express");

const authentication = require("./authentication.js");
const products = require("./products.js");
const seller = require("./seller.js");

const router = express.Router();

module.exports = () => {
  authentication(router);
  products(router);
  seller(router);
  return router;
};
