const express = require('express');

const authentication = require('./authentication.js');
const products = require('./products.js');

const router = express.Router();

module.exports = () =>{
    authentication(router);
    products(router);

    return router;
}