const express = require('express');

const app = express();

app.use(express.static(__dirname + "/client"));


let port = 3000;
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("listening on port " + port);
    }
});