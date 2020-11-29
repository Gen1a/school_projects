const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {   // resolve and reject are 2 callback functions
        db.query(`SELECT * FROM users`, (err, results, fields) => { // fields contains info about returned results fields (if any)
            if (err) reject(err);   // if query fails, throw error
            resolve(results); // if query succeeds, 'results' contains the results of query
        });
    });
};
exports.getUserByID = (userID) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE id=${userID}`, (err, results, fields) => {
            if (err) reject(err);
            resolve(results[0]);
        });
    });
};
exports.createUser = (userBody) => {
    return new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt.hash(userBody.password, saltRounds)
            .then((hash) => {
                const sql = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
                db.query(sql, [userBody.first_name, userBody.last_name, userBody.email, hash], 
                        (err, results, fields) => {
                            if (err) reject(err);
                            resolve(results);
                        });
            })
            .catch(err => reject(err));
    });
};
exports.login = (userCredentials) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email=?';
        db.query(sql, [userCredentials.email], (err, results, fields) => {
            if (err) reject(err);
            //resolve(results[0]);
            bcrypt.compare(userCredentials.password, results[0].password)
                .then((result) => resolve(result))
                .catch(err => reject(err));
        });
    })
};
