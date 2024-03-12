const express = require('express');

const {getorders, addOrder } = require('../model/order');
const {editOrder}  = require('../model/products');

const createOrder = async (req, res) => {
    try {
      const { email } = req.user;
      const { products, total, cost, payment } = req.body;

      if (!email || !products || !total || !cost || !payment) {
        return res.status(400).json("Invalid input data");
      }
      for (const product of products) {
        const { id, quantity } = product;
        await editOrder(id, { $inc: { order: quantity } });
      }
  
      const currentDate = new Date().toISOString();
      const createdOrder = await addOrder({
        email,
        products,
        date: currentDate,
        total,
        cost,
        payment,
      });
  
      return res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server Error");
    }
  };
  
const getAllOrders = async (req,res) => {
    try{
        const { email } = req.user;
        const orders = await getorders(email);
        return res.status(200).json(orders);
    }catch (error) {
        console.error(error);
        return res.status(500).json("Server Error");
      }
}

module.exports = {
    createOrder,
    getAllOrders
}