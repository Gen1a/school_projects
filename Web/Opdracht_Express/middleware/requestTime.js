const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let time = new Date();
    req.requestTime = time.toLocaleTimeString();
    next();
});

router.get('/', (req, res) => {
    res.send(req.requestTime);
});

module.exports = router;