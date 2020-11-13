// Aanmaken student object
const student = {
    'voornaam' : 'Frederik',
    'achternaam' : 'De Brouwer',
    'leeftijd' : 29,
    'woonplaats' : 'Gent'
}

// Importeren Core module http
const http = require('http');
const schrijvenEnLezen = require('./file.js');
// Nieuwe instantie aanmaken van http.Server
const server = http.createServer((req, res) => {
    // Mogelijke request routes definiëren
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.write('<p>This is the Homepage!</p>')
        res.end();
    }
    else if (req.url === '/profile') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.write('<p>This is the Profile Page!</p>')
        res.end();
    }
    else if (req.url === '/data') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.write(JSON.stringify(student))
        res.end();
    }
    else{
        res.end('Invalid request');
    }
});
// Server starten en laten luisteren naar connecties op poortnummer 5000
server.listen(5000);

// Importeren van eigen local module 'file'
const fs = require('./file.js');
schrijvenEnLezen();