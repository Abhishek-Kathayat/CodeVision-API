const bodyparser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.post('/uploadimages', (req, res) => {
    if(!req.file) {
        return res.send({
            success: false
        });
    }
    else {
        return res.send({
            success: true
        })
    }
});

app.post('/uploadcode', (req, res) => {
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})
