var express = require("express");

var app = express();

var port = process.env.PORT || 3000;

// We could do direct routing with app.get() or we can spin up an instance of a router. We can use the router to define
// our routes. We pass router into app.use() so that will take care of loading all the roots. This is a cleaning way to
// do api routing.
var bookRouter = express.Router();

// Whenever we try to GET the /Books route, express will call a function.
bookRouter.route("/Books")
    .get(function(req, res) {
        // We create a sample json object and have the res send the json back to the client.
        var responseJson = {hello: "This is my api"};
        res.json(responseJson);
    });

app.use("/api", bookRouter);

// Whenever a request hits the root of our site, a callback function is executed. Express passes it two arguments req & res.
// The client's request is req and the response we send back is res.
app.get("/", function (req, res) {
    res.send("Welcome to my api!");
});

app.listen(port, function () {
    console.log("Gulp is running my app on PORT: " + port);
});






























