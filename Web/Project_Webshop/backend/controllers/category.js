const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// READ REQUESTS
exports.getCategoryById = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.errors[0].msg);
        console.log("Invalid value: " + errors.errors[0].value);
        return res.status(400).send(errors);
    }
    // Execute async query on database
    // find() returns an instance of Query class (able to chain additional filters)
    const category = await Category.findById(req.params.id);

    try {
        if (!category){
            console.log('category request did not return a value from the database');
            res.status(400).send('category request did not return a value from the database');
        }
        else{
            console.log('category query succesfully executed');
            res.json(category);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}