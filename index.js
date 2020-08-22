const bodyparser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
            );
            // console.log("Next doing");
            next();
        });
app.use(express.static(__dirname + '/public'));

const apiIde = require("./routes/ide");
app.use('/api/ide', apiIde);



app.listen(port)
    .once("listening", ()=>{
        console.log("started on http://localhost:3000 ");
    })
    .on("error", (err)=>{
        console.log("ERror "+ err);        
    });
