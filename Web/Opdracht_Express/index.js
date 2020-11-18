const express = require('express'); // loads express module
const app = express();  // creates express instance
const indexRouter = require('./controllers/indexRouter.js');   // loads indexRouter.js
const testRouter = require('./controllers/testRouter.js');  // loads testRouter.js
const searchRouter = require('./controllers/searchRouter.js');  // loads searchRouter.js

// Define app-level middleware
app.use(require('./middleware/identifier.js'));

// Define controllers
app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/search', searchRouter);
app.use('/time', require('./middleware/requestTime.js'));

// Fallback route
app.get('*', (req, res) => {
    res.status(404).send('<p>NIET GEVONDEN</p>');
});

app.listen(3000);