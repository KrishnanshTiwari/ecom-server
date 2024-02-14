const express = require("express");
const {
  createProduct,
  getProductById,
  deleteProductById,
  getproductsBySellerId,
  getProducts,
} = require("../model/products");

const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts();

    const simplifiedProducts = products.map((product) => ({
      title: product.title,
      image: product.image,
      price: product.price,
      category: product.category,
      rating: product.rating,
    }));

    return res.status(200).json(simplifiedProducts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductById(id);
    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(deletedProduct);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

const addProduct = async (req, res) => {
  try {
    const { title, price, image, description, sellerId, sellerName, category } =
      req.body;
    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }
    const createdProduct = await createProduct({
      title,
      price,
      image,
      description,
      sellerId,
      sellerName,
      category,
    });
    return res.status(201).json(createdProduct);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

const getProductsOfSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await getproductsBySellerId(id);
    return res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  deleteProduct,
  addProduct,
  getProductsOfSeller,
};
