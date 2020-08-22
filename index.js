const bodyparser = require('body-parser');
const morgan = require('morgan');
const express = require('express');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

const hostname = 'localhost';
const port = process.env.PORT || 8080;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

module.exports = app;
