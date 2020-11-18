const express = require('express');
const router = express.Router();    // create instance of Router class

// add middleware to parse JSON
router.use(express.json());

router.route('/')
    .get((req, res) => {
        res.send("<p>Test page</p>");
    })
    .post((req, res) => {
        req.body.server = true;
        res.send(req.body);
    });

router.get('/:id([0-9]{3})', (req, res) => {
    res.send(`<p>ID: ${req.params.id}</p>`);
});

module.exports = router;    // export router module to global object
