const express = require("express");
const {
  createProduct,
  getProductById,
  deleteProductById,
  getproductsBysellerMail,
  getProducts,
} = require("../model/products");

const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts();

    const productsWithImages = products.map(product => {
      const imageData = product.image.toString('base64');
      const imageSrc = `data:image/jpeg;base64,${imageData}`;
      return { ...product.toObject(), imageSrc };
    });

    return res.status(200).json(productsWithImages);
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
    
    const imageData = product.image.toString('base64');

    const imageSrc = `data:image/jpeg;base64,${imageData}`;

    const productWithImage = { ...product.toObject(), imageSrc };

    return res.status(200).json(productWithImage);
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
    const { title, price, image, description, category } = req.body;
    const { email, username } = req.user;
    if (
      !title ||
      !price ||
      !image ||
      !description ||
      !email ||
      !username ||
      !category
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const imageData = Buffer.from(image, 'base64');

    const createdProduct = await createProduct({
      title,
      price,
      image: imageData,
      description,
      sellerMail: email,
      sellerName: username,
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
    const { email } = req.user;
    const products = await getproductsBysellerMail(email);

    const productsWithImages = products.map(product => {
      const imageData = product.image.toString('base64');
      const imageSrc = `data:image/jpeg;base64,${imageData}`;
      return { ...product.toObject(), imageSrc };
    });

    return res.status(200).json(productsWithImages);
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
