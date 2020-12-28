const mongoose = require('mongoose');

// Define schema (= maps to MongoDB collection)
const orderLineSchema = new mongoose.Schema({
    _id: Number, // shorthand for {type: Number}
    product_id: Number,
    order_id: Number,
    quantity: Number,
    price: Number
});

// Compile the model and export it
module.exports = mongoose.model("Order_Line", orderLineSchema);