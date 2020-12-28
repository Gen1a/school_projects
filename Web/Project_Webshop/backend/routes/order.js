const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { validateOrderID } = require('../middleware/validators');

/* GET home page. */
router.get('/:id/products', validateOrderID, orderController.getAllProducts);
router.get('/:id', validateOrderID, orderController.getOrderById);
router.post('/', orderController.createOrder);

module.exports = router;