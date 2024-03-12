const mongoose = require("mongoose");

// Order Schema
const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  products: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  date: { type: Date, required: true },
  total: { type: Number, required: true },
  cost: { type: Number, required: true },
  payment: { type: String, required: true },
});

const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = {
  OrderModel,
  getorders: (mail) => OrderModel.find({ email: mail }),
  addOrder: (values) =>
    new OrderModel(values).save().then((user) => user.toObject()),
};
