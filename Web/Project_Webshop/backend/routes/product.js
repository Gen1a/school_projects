const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

/* GET home page. */
router.get('/', productController.getAllProducts);

module.exports = router;