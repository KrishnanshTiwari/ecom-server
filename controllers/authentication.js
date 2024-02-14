const express = require("express");
const { getUserByEmail, createUser } = require("../model/user");
const { authentication, random } = require("../services/index");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select("+salt +password");

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.salt, password);

    if (user.password != expectedHash) {
      return res.sendStatus(403);
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
    console.log(error);
    return res.sendStatus(400);
  }
};

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      salt,
      password: authentication(salt, password),
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = {
    login,
    register
}