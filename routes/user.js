const express = require('express');
const {getDetails, editDetails} = require('../controllers/user');
const { isAuthenticated } = require("../middlewares/index");

const routes = (router) => {
    router.get('/user/getDetails', isAuthenticated, getDetails);
    router.patch('/user/editDetails', isAuthenticated, editDetails);
}

module.exports = routes;