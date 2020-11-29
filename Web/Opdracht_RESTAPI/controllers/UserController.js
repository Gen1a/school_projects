const user = require('../models/user');
const { validationResult } = require('express-validator');

const UserController = {
    getAll: (req, res) => {
        user.getAllUsers()  // call getAllUsersFromDB() promise in models/user.js
            .then(users => res.json(users)) // promise which sends back users in JSON format
            .catch(err => res.send(err));   // if error occurs during DB connection
    },

    getUser: (req, res) => {
        // check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // if validation fails
        user.getUserByID(req.params.id)
            .then(user => {
                if(!user) return res.status(400).send(`User with ID ${req.params.id} not found in database.`);  // if empty result
                res.json(user); 
            })
            .catch(err => res.send(err));
    },

    createUser: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        user.createUser(req.body)
            .then(result => {
                if(!result) return res.status(500).send(`Something went wrong during creation of new user.`);
                res.send('<p>User created!</p>');
            })
            .catch(err => res.json(err));
    },

    loginUser: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        user.login(req.body)
            .then(result => {
                if(!result) return res.status(500).send(`Something went wrong during logging in.`);
                res.send('<p>User logged in!</p>');
            })
            .catch(err => res.json(err));
    }
};

module.exports = UserController;