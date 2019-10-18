const express = require('express');
const db = require('./db.js');

const app = express();

app.use(express.static(__dirname + "/client"));

app.get("/items", (req, res) => {
    console.log(req.body);
    res.end();
});

let port = 3000;
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("listening on port " + port);
    }
});