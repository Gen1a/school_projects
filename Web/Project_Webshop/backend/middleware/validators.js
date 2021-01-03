const {check} = require('express-validator');

module.exports = {
    validateID: check("id").isInt({min: 1}).withMessage("Order ID must be an integer greater than 0.")
};