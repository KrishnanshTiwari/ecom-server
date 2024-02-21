const express = require("express");

const authentication = require("./authentication.js");
const products = require("./products.js");
const seller = require("./seller.js");
const order = require('./orders.js');
const cart  = require("./cart.js");
const router = express.Router();

module.exports = () => {
  authentication(router);
  products(router);
  seller(router);
  order(router);
  cart(router);
  return router;
};
