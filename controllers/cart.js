const express = require('express');

const {getcart, addCart, deleteCartById} = require('../model/cart');
const {getProductById}  = require('../model/products');

const addToCart = async (req,res) => {
    try{
        const {id} = req.params;
        const {email} = req.user;
        const product = await getProductById(id);
        if(!product || !id || !email) {
            return res.status(400).json("Invalid id or user");
        }
        const createdCart = await addCart({
            productid : id,
            usermail : email,
            image : product.image,
            title : product.title,
            price : product.price
        })
        
        return res.status(201).json(createdCart);
    }catch (error) {
        console.error(error);
        return res.status(500).json("Server Error");
      }
};
const deleteCart = async (req,res) => {
    try{
        const {id} = req.params;
        const deletedCart = await deleteCartById(id);
        return res.status(200).json(deletedCart);
    }catch (error) {
        console.error(error);
        return res.status(500).json("Server Error");
      }
};
const getAllCarts = async (req,res) => {
    try{
        const { email } = req.user;
        const carts = await getcart(email);
        return res.status(200).json(carts);
    }catch (error) {
        console.error(error);
        return res.status(500).json("Server Error");
      }
}

module.exports = {
    addToCart,
    deleteCart,
    getAllCarts
}