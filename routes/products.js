const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');

//Middleware validating input
const validateProduct = (req, res, next) => {
    const { name, price, category } = req.body;
    const errors = [];

    if(!name || name.trim() === '') {
        errors.push('Product name is required');
    }

    if(!price || isNaN(price) || price <= 0) {
        errors.push('Product price must be a positive number');
    }

    if(!category || category.trim() === '') {
        errors.push('Product category is required');
    }
}