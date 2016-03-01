var express = require("express");

var app = express();

var port = process.env.PORT || 3000;

// Whenever a request hits the root of our site, a callback function is executed. Express passes it two arguments req & res.
// The client's request is req and the response we send back is res.
app.get("/", function(req, res) {
    res.send("Welcome to my API!");
});

app.listen(port, function() {
    console.log("Gulp is running my app on PORT: " + port);
});






























