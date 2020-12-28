const mongoose = require('mongoose');

// Define schema (= maps to MongoDB collection)
const categorySchema = new mongoose.Schema({
    _id: Number, // shorthand for {type: Number}
    name: String
});

// Compile the model and export it
module.exports = mongoose.model("Category", categorySchema);