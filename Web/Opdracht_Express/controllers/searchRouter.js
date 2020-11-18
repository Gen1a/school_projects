const express = require('express');
const router = express.Router();    // create instance of Router class

router.get('/', (req, res) =>{
    res.send(`<p>You searched: ${req.query.q}`);
});

module.exports = router;    // export router module to global object