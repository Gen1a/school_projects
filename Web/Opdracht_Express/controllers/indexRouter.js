const express = require('express');
const router = express.Router();    // create instance of Router class

router.get('/', (req, res) => {
    res.send('<p>Homepage</p>');
});

module.exports = router;    // export router module to global object