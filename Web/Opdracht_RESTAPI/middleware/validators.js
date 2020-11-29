const {check} = require('express-validator');

module.exports = {
    validateUserID: check("id").isInt({min: 1}).withMessage("User ID must be an integer greater than 0."),
    validateUserSchema: [
        check("first_name")
            .exists()
            .withMessage("First name is required.")
            .trim()
            .isLength({min: 2})
            .withMessage("First name has to contain at least 2 characters")
            .matches(/^[A-Za-z\s]+$/)
            .withMessage("First name can only contain letters."),
        check("last_name")
            .exists()
            .withMessage("Last name is required.")
            .trim()
            .isLength({min: 2})
            .withMessage("Last name has to contain at least 2 characters")
            .matches(/^[A-Za-z\s]+$/)
            .withMessage("Last name can only contain letters."),
        check("email")
            .exists()
            .withMessage("E-mail is required.")
            .isEmail()
            .withMessage("E-mail is invalid.")
            .normalizeEmail(),
        check("password")
            .exists()
            .withMessage("Password is required.")
            .trim()
            .isLength({min: 8, max: 20})
            .withMessage("Password has to contain at least 8 and maximum 20 characters."),
    ],
    validateLogin: [
        check("email")
            .exists()
            .withMessage("E-mail is required.")
            .isEmail()
            .withMessage("E-mail is invalid.")
            .normalizeEmail(),
        check("password")
            .exists()
            .withMessage("Password is required.")
            .trim()
            .isLength({min: 8, max: 20})
            .withMessage("Password has to contain at least 8 and maximum 20 characters.")
    ]
};