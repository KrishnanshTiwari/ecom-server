const express = require("express");
const { getSellerByEmail, editSeller } = require("../model/seller");
const { editUser } = require("../model/user");

const getDetails = async (req, res) => {
  try {
    const { email, username, isSeller } = req.user;
    let sellerDetails = {};

    if (isSeller) {
      sellerDetails = await getSellerByEmail(email);
    }
    const userInfo = {
      email,
      username,
      isSeller,
      ...(isSeller && sellerDetails
        ? {
            gst: sellerDetails.gst,
            bank: sellerDetails.bank,
            phone: sellerDetails.phone,
            ifsc: sellerDetails.ifsc,
          }
        : {}),
    };
    return res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error");
  }
};
const editDetails = async (req, res) => {
  try {
    const { email, isSeller } = req.user; 
    let updateSeller = {};
    let updateUser = {};

    if (isSeller) {
      const { username, gst, bank, phone, ifsc } = req.body;
      updateSeller = { gst, bank, phone, ifsc };
      updateUser = {username};
      await editSeller(email, updateSeller);
      await editUser(email, updateUser );
    } else {
      const { username } = req.body;
      updateUser = { username };
      await editUser(email, updateUser);
    }

    return res.status(200).json("Update successful");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error");
  }
};
module.exports = {
  getDetails,
  editDetails
};
