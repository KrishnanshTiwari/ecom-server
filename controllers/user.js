const express = require("express");
const { getSellerByEmail } = require("../model/seller");

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
module.exports = {
  getDetails,
};
