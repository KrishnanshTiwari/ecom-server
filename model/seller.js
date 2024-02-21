const mongoose = require("mongoose");

// Seller Schema
const SellerSchema = new mongoose.Schema({
  gst: { type: String, required: true },
  email: { type: String, required: true },
  bank: { type: String, required: true },
  phone: { type: String, required: true },
  ifsc: { type: String, required: true },
});

const SellerModel = mongoose.model("sellers", SellerSchema);

module.exports = {
  SellerModel: SellerModel,
  createseller: (values) =>
    new SellerModel(values).save().then((user) => user.toObject()),
  getSellerByEmail: (email) => SellerModel.findOne({ email }),
  editSeller: (email, updates) =>
  SellerModel.findOneAndUpdate({ email }, updates, { new: true }).then((user) =>
      user.toObject()
    ),
};
