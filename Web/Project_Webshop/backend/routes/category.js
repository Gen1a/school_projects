const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { validateID } = require('../middleware/validators');

router.get('/:id', validateID, categoryController.getCategoryById);

module.exports = router;