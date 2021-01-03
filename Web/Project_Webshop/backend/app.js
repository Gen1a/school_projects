const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');   // security best-practice (sets HTTP headers appropriately)
const productRouter = require('./routes/product');  // import category router
const orderRouter = require('./routes/order');  // import order router
const userRouter = require('./routes/user');    // import user router
const categoryRouter = require('./routes/category');    // import category router
require('dotenv').config(); // now process.env has keys and values from .env file

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());    // parses incoming requests with JSON payloads and is based on body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
// Define fallback route
app.get('*', (req, res) => {
    res.status(404).send('Invalid request');
});

// Establish connection with MongoDB Atlas Database
mongoose
    .connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Database connection established and server running on port ${process.env.PORT}`));
    })
    .catch((err) => console.log("Error when trying to connect to MongoDB Database:" + err));

