const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { validateUserID, validateUserSchema, validateLogin } = require('../middleware/validators');

/* GET users listing. */
router.get('/', UserController.getAll);
router.get('/:id', validateUserID, UserController.getUser);
router.post('/', validateUserSchema, UserController.createUser);
router.post('/login', validateLogin, UserController.loginUser);

module.exports = router;
