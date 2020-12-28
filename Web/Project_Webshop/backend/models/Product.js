const mongoose = require('mongoose');

// Define schema (= maps to MongoDB collection)
const productSchema = new mongoose.Schema({
    _id: Number, // shorthand for {type: Number}
    name: String, // shorthand for {type: String}
    author: String,
    description: String,
    category_id: Number,
    pages: Number,
    ean_number: String,
    price: Number
});

//  Compile the model and export it
/*  Note: 1st argument of model() method is the singular name of the collection the model is for.
    Mongoose automatically looks for the plural, lowercased version of the model name. */
module.exports = mongoose.model("Product", productSchema);  