const Product = require('../models/Product');

// READ REQUESTS
exports.getAllProducts = async (req, res) => {
    // Execute async query on database
    // find() returns an instance of Query class (able to chain additional filters)
    const products = await Product.find({});

    try {
        console.log('product query succesfully executed');
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.getProductsById = async (ids) => {
    const products = await Product.find({}).where('_id').in(ids);

    try {
        console.log('product query succesfully executed');
        return products;
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

