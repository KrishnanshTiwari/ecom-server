const mongoose = require("mongoose");

// Product Schema
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: false },
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = {
  ProductModel: ProductModel,
  getProducts: () => ProductModel.find(),
  getProductById: (id) => ProductModel.findById(id),
  deleteProductById: (id) => ProductModel.findOneAndDelete({ _id: id }),
  createProduct: (value) =>
    new ProductModel(value).save().then((user) => user.toObject()),
  getproductsBySellerId: (id) => ProductModel.find({ sellerId: id }),
};
