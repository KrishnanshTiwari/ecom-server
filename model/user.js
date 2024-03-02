const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  phone : {type : String, required : true},
  password: { type: String, required: true, select: false },
  salt: { type: String, select: false },
  sessionToken: { type: String, select: false },
  isSeller: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserModel: UserModel,
  getUserByEmail: (email) => UserModel.findOne({ email }),
  getUserBySessionToken: (sessionToken) =>
    UserModel.findOne({ sessionToken: sessionToken }),
  createUser: (values) =>
    new UserModel(values).save().then((user) => user.toObject()),
};
