const express = require("express");

const {
  createOrder,
  getAllOrders,
} = require("../controllers/orders.js");
const { isAuthenticated } = require("../middlewares/index");

const routes = (router) => {
  router.post("/user/addtoorders",isAuthenticated, createOrder);
  router.get("/user/getorders",isAuthenticated, getAllOrders);
};

module.exports = routes;
