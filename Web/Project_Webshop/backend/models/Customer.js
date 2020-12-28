const mongoose = require('mongoose');

// Define schema (= maps to MongoDB collection)
const customerSchema = new mongoose.Schema({
    _id: Number, // shorthand for {type: Number}
    first_name: String, // shorthand for {type: String}
    last_name: String,
    gender: String,
    email: String,
    password: String,
    telephone: String,
    address: String,
    postal_code: String,
    city: String,
    country: String
});

// Compile the model and export it
module.exports = mongoose.model("Customer", customerSchema);