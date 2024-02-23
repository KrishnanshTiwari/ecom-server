const express = require('express');
const {getDetails} = require('../controllers/user');
const { isAuthenticated } = require("../middlewares/index");

const routes = (router) => {
    router.get('/user/getDetails', isAuthenticated, getDetails);
}

module.exports = routes;