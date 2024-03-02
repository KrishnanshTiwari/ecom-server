const express = require("express");
const { getUserByEmail, createUser } = require("../model/user");
const { authentication, random } = require("../services/index");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email).select("+salt +password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const expectedHash = authentication(user.salt, password);

    if (user.password !== expectedHash) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const salt = random();
    user.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie("auth-token", user.sessionToken, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, username, phone } = req.body;

    if (!email || !password || !username || !phone) {
      return res
        .status(400)
        .json({ message: "Email, password, phone, and username are required" });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      phone,
      salt,
      password: authentication(salt, password),
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  login,
  register,
};
