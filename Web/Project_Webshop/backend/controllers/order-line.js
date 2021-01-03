const OrderLine = require('../models/OrderLine');
const { getProductsById } = require('./product');

// READ REQUESTS
exports.getAllProducts = async (orderId) => {
    // Execute async query on database
    // find() returns an instance of Query class (able to chain additional filters)
    const orderLines = await OrderLine.find({}).where('order_id').equals(orderId);
    const quantities = orderLines.map((el) => el.quantity);

    try {
        const products = await getProductsById(orderLines);
        const result = {
            products: products,
            quantities: quantities
        };
        console.log('order_line query succesfully executed');
        return result;
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.addOrderLines = async (items, orderId) => {
    // Add new order line for each product in the order
    let maxOrderLineId = await OrderLine.countDocuments();
    try {
        items.forEach(async (element) => {
            // increment orderline ID
            maxOrderLineId += 1;
            // create new orderline object
            const newOrderLine = new OrderLine({
                _id : maxOrderLineId,
                product_id: element._id,
                order_id: orderId,
                quantity: element.quantity,
                price: (element.price * element.quantity),
            });
            // save orderline to database
            await newOrderLine.save();
            console.log('new orderline succesfully added to database');
        });
    } catch (err) {
        console.log(err);
    }
}