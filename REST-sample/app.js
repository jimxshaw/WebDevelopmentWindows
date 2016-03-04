var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Mongoose.connect takes in a connection string and bookAPI is simply the name of our database of which we'll connect.
// When the app starts up, a connection to the bookAPI database is opened and holds it open until we're ready to use it.
// Even if bookAPI database doesn't exist in mongodb, it will be created for you when mongoose.connect executes.
var db;

// For testing purposes, we have to set up multiple environments. Which db instance mongoose connects to depends on the
// ENV variable set in our gulp task.
if (process.env.ENV == "Test") {
    db = mongoose.connect("mongodb://localhost/bookAPI_test");
}
else {
    db = mongoose.connect("mongodb://localhost/bookAPI");
}

// The way mongoose translate data extracted from mongodb is the use of models. We create a model of a book that lays out
// what the data in mongodb would look like.
var Book = require("./models/bookModel");

var app = express();

var port = process.env.PORT || 3000;

// After npm install body-parser and requiring up top, we have put the body-parser middleware in a use statement in order
// for us the developer to use it below.
// In order to POST data, we have to use a body parser. Body parser is a piece of middleware that allows
// express to read the body and the parse that into a json object that we can understand.
// We add the .json and .urlencoded methods to explicitly allow body-parser
// to parse json and url encoded data. The extended: true option allows parsing with the qs library.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// To use the routes in another file, created a module variable, require the path and execute the module. The book model
// is in a module variable called Book and it's injected into bookRouter when it executes. The reason we inject Book module
// is so that the module can be used in bookRoutes.js.
var bookRouter = require("./Routes/bookRoutes")(Book);

// Currently, only the book model for the book router has been implemented. In the future, should we want additional routes
// for authors or genres, we can create the author model or genre model.
app.use("/api/books", bookRouter);
//app.use("/api/authors", authorRouter);
//app.use("/api/genres", genreRouter);

// Whenever a request hits the root of our site, a callback function is executed. Express passes it two arguments req & res.
// The client's request is req and the response we send back is res.
app.get("/", function (req, res) {
    res.send("Welcome to my api!");
});

app.listen(port, function () {
    console.log("Gulp is running my app on PORT: " + port);
});






























