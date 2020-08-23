const bodyparser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

const apiCode = require("./routes/code");
const apiVision = require("./routes/vision");

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
    next();
});

app.use(express.static(__dirname + '/public'));

app.use('/api/code', apiCode);
app.use('/api/vision', apiVision);


app.listen(port).once("listening", () => {
    console.log(`App is listening to port ${port}`);
})
.on("error", (err)=>{
    console.log("Error "+ err);        
});
