const OrderLine = require('../models/OrderLine');
const { getProductsById } = require('./product');

// READ REQUESTS
exports.getAllProducts = async (orderId) => {
    // Execute async query on database
    // find() returns an instance of Query class (able to chain additional filters)
    const orderLines = await OrderLine.find({}).where('order_id').equals(orderId);

    try {
        let productIds = [];
        orderLines.forEach(element => productIds.push(element.product_id));
        const products = await getProductsById(productIds);
        console.log('order_line query succesfully executed');
        return products;
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}