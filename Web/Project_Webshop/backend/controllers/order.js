const Order = require('../models/Order');
const { validationResult } = require('express-validator');
const { getAllProducts, addOrderLines } = require('./order-line');

// READ REQUESTS
exports.getOrderById = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.errors[0].msg);
        console.log("Invalid value: " + errors.errors[0].value);
        return res.status(400).send(errors);
    }
    // Execute async query on database
    // find() returns an instance of Query class (able to chain additional filters)
    const order = await Order.findById(req.params.id);

    try {
        if (!order){
            console.log('order request did not return a value from the database');
            res.status(400).send('order request did not return a value from the database');
        }
        else{
            console.log('order query succesfully executed');
            res.json(order);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.getAllProducts = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.errors[0].msg);
        console.log("Invalid value: " + errors.errors[0].value);
        return res.status(400).send(errors);
    }
    // Execute async query on database
    // find() returns an instance of Query class (able to chain additional filters)
    const orderId = await Order.findById(req.params.id);

    try {
        if (!orderId){
            console.log('order request did not return a value from the database');
            res.status(400).send('order request did not return a value from the database');
        }
        else{
            // Call order-line controller
            const products = await getAllProducts(orderId);
            products.total_price = orderId.total_price;
            console.log('order query succesfully executed');
            res.send(products);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// CREATE REQUESTS
exports.createOrder = async (req, res) => {
    const { customer_id, order_statuscode, date_created, total_price, items } = req.body;

    // Define id for new order
    let maxOrderId = await Order.countDocuments();

    const newOrder = new Order({
        _id: maxOrderId + 1,
        customer_id: customer_id,
        order_statuscode: order_statuscode,
        date_created: date_created,
        total_price: total_price
    });
    // Add new order to database
    try {
        await newOrder.save();
        console.log('new order succesfully added to database');
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
    //  Add new order lines to database
    await addOrderLines(items, maxOrderId + 1);
    // Send new order id as response
    res.json({order_id: maxOrderId + 1});
}