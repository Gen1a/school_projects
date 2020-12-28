const mongoose = require('mongoose');

// Define schema (= maps to MongoDB collection)
const orderStatusCodeSchema = new mongoose.Schema({
    _id: Number, // shorthand for {type: Number}
    status: String
});

// Compile the model and export it
module.exports = mongoose.model("Order_Status_Code", orderStatusCodeSchema);