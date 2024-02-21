const express = require('express');

const { addToCart,getAllCarts,deleteCart } = require('../controllers/cart');
const { isAuthenticated } = require("../middlewares/index");

const routes =  (router) => {
  router.post('/user/addtocart/:id',isAuthenticated, addToCart);
  router.get('/user/getCart',isAuthenticated,  getAllCarts);
  router.delete('/user/deleteCart/:id',isAuthenticated, deleteCart);
};

module.exports = routes;