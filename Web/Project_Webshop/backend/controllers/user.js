const Customer = require('../models/Customer');
const { validationResult } = require('express-validator');

// CREATE REQUESTS
exports.createUser = async (req, res) => {
    const { first_name, last_name, email, telephone, address, postal_code, city } = req.body;

    // Define id for new order
    let maxCustomerId = await Customer.countDocuments();    // returns 0 on empty collection

    const newCustomer = new Customer({
        _id: maxCustomerId + 1,
        first_name: first_name,
        last_name: last_name,
        email: email,
        telephone: telephone,
        address: address,
        postal_code: postal_code,
        city: city
    });
    // Add new order to database
    try {
        await newCustomer.save();
        console.log('new customer succesfully added to database');
        res.json({customer_id: maxCustomerId + 1 });
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
};

exports.getUserById = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.errors[0].msg);
        console.log("Invalid value: " + errors.errors[0].value);
        return res.status(400).send(errors);
    }
    // Execute async query on database
    const customer = await Customer.findById(req.params.id);
    if (!customer){
        console.log('customer request did not return a value from the database');
        res.status(400).send('customer request did not return a value from the database');
    }
    else{
        console.log('customer query succesfully executed');
        res.json(customer);
    }
}
