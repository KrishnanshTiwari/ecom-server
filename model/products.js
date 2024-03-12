const mongoose = require("mongoose");

// Product Schema
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: Buffer, required: true },
  description: { type: String, required: true },
  sellerMail: { type: String, required: true },
  sellerName: { type: String, required: true },
  category: { type: String, required: true },
  order : {type : Number, required : false, default : 0},
  rating: {
    type: Number,
    required: false,
    default: function () {
      return parseFloat((Math.random() + 4).toFixed(1)); 
    },
  },
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = {
  ProductModel: ProductModel,
  getProducts: () => ProductModel.find(),
  getProductById: (id) => ProductModel.findById(id),
  deleteProductById: (id) => ProductModel.findOneAndDelete({ _id: id }),
  createProduct: (value) =>
    new ProductModel(value).save().then((user) => user.toObject()),
  getproductsBysellerMail: (mail) => ProductModel.find({ sellerMail: mail }),
  editOrder: (id, updates) =>
  ProductModel.findOneAndUpdate({ _id: id }, updates, { new: true }).then((user) =>
      user.toObject()
    ),
};
