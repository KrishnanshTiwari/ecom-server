const express = require("express");
const { getUserByEmail } = require("../model/user");
const { createseller, editSeller } = require("../model/seller");

const addtosellers = async (req, res) => {
  try {
    const { gst, bank, ifsc, account } = req.body;
    if (
      !gst ||
      !bank ||
      !ifsc ||
      !account 
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const { email } = req.user;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isSeller = true;
    await user.save();

    const seller = await createseller({
      gst,
      email,
      bank,
      account,
      ifsc,
    });

    return res.status(200).json(seller);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error");
  }
};
const editDetails = async (req, res) => {
  try {
    const { email } = req.user; 
    const updateSeller = req.body;
    await editSeller(email, updateSeller);

    return res.status(200).json("Update successful");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error");
  }
};
module.exports = {
  addtosellers,
  editDetails
};
