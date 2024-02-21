const express = require('express');

const {getorders, createorder} = require('../model/order');
const {getProductById}  = require('../model/products');

const createOrder = async (req,res) => {
    try{
        const {id} = req.params;
        const {email} = req.user;
        const { quantity,cod} = req.body;
        const product = await getProductById(id);
        if(!product || !id || !email) {
            return res.status(400).json("Invalid id or user");
        }
        const currentDate = new Date().toISOString();
        const createdOrder = await createorder({
            productid : id,
            usermail : email,
            date : currentDate,
            image : product.image,
            title : product.title,
            price : product.price,
            cod : cod,
            quantity : quantity,
        })
        
        return res.status(201).json(createdOrder);
    }catch (error) {
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