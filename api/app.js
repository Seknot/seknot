const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./routes/router');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

if (process.env.NODE_ENV === 'production') {
    app.use(cors())
}

// Common Response for System Errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'System Error Occurred!'});
});

app.use('/', router);

module.exports = app;
