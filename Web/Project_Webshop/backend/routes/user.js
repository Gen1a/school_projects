const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { validateID } = require('../middleware/validators');

router.get('/:id', validateID, userController.getUserById);
router.post('/new', userController.createUser);

module.exports = router;