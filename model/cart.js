const mongoose = require("mongoose");

// Cart Scehma
const CartSchema = new mongoose.Schema({
  productid: { type: String, required: true },
  usermail: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = {
  CartModel,
  getcart: (mail) => CartModel.find({usermail : mail}),
  addCart: (values) =>
    new CartModel(values).save().then((user) => user.toObject()),
  deleteCartById: (id) => CartModel.findOneAndDelete({ _id: id }),
};
