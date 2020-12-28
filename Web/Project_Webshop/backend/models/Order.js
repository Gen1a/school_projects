const mongoose = require('mongoose');

// Define schema (= maps to MongoDB collection)
const orderSchema = new mongoose.Schema({
    _id: Number, // shorthand for {type: Number}
    customer_id: {
        type: Number,
        min: [1, 'Customer ID has to be greater than 0'],
        required: true
    },
    order_statuscode: {
        type: Number,
        min: [1, 'Order status code has to be greater than 0'],
        max: [6, 'Order status code has to less than than 7'],
        required: true
    },
    date_created: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        min: [0, 'Total price has to be equal or greater than 0'],
        required: true
    },
});

// Compile the model and export it
module.exports = mongoose.model("Order", orderSchema);