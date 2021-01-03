const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { validateID } = require('../middleware/validators');

router.get('/:id/products', validateID, orderController.getAllProducts);
router.get('/:id', validateID, orderController.getOrderById);
router.post('/', orderController.createOrder);

module.exports = router;