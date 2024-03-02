const express = require("express");
const { getSellerByEmail } = require("../model/seller");

const getDetails = async (req, res) => {
  try {
    const { email, username, isSeller,phone } = req.user;
    let sellerDetails = {};

    if (isSeller) {
      sellerDetails = await getSellerByEmail(email);
    }
    const userInfo = {
      email,
      username,
      phone,
      isSeller,
      ...(isSeller && sellerDetails
        ? {
            gst: sellerDetails.gst,
            bank: sellerDetails.bank,
            account: sellerDetails.account,
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
