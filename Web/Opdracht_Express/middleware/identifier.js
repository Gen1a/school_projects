const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let date = new Date();
    console.log(`Timestamp of request: ${date.toLocaleTimeString()}\nIP Address: ${req.ip}`);
    next();
});

module.exports = router;
