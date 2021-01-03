const mongoose = require('mongoose');

// Define schema (= maps to MongoDB collection)
const customerSchema = new mongoose.Schema({
    _id: Number, // shorthand for {type: Number}
    first_name: String, // shorthand for {type: String}
    last_name: String,
    email: String,
    telephone: String,
    address: String,
    postal_code: String,
    city: String
});

// Compile the model and export it
module.exports = mongoose.model("Customer", customerSchema);