const express = require("express");
const pkg = require('lodash');
const {merge, get} = pkg;
const { getUserBySessionToken } = require("../model/user");

// isAuthenticated middleware
const isAuthenticated = async (req, res, next) => {
  try {
    const { sessiontoken } = req.headers;
    //console.log(req.headers);
    if (!sessiontoken) {
      return res.status(403).json({ message: "Unauthorized pls cehck" });
    }

    const existingUser = await getUserBySessionToken(sessiontoken);
    if (!existingUser) {
      return res.status(403).json({ message: "Unauthorized check" });
    }

    req = merge(req, { user: existingUser }); // Attach user object to the request

    return next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Bad Request" });
  }
};


// isSeller middleware
const isSeller = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isSeller) {
      return res.status(403);
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

module.exports = {
  isAuthenticated,
  isSeller,
};
