const mongoose = require("mongoose");

// Order Schema
const OrderSchema = new mongoose.Schema({
  productid: { type: String, required: true },
  usermail: { type: String, required: true },
  date: { type: String, required: true },
  quantity: { type: Number, required: true },
  cod: { type: Boolean, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = {
  OrderModel,
  getorders: (mail) => OrderModel.find({usermail : mail}),
  createorder: (values) =>
    new OrderModel(values).save().then((user) => user.toObject()),
};
