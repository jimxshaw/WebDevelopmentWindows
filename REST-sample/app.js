var express = require("express");
var mongoose = require("mongoose");

// Mongoose.connect takes in a connection string and bookAPI is simply the name of our database of which we'll connect.
// When the app starts up, a connection to the bookAPI database is opened and holds it open until we're ready to use it.
// Even if bookAPI database doesn't exist in mongodb, it will be created for you when mongoose.connect executes.
var db = mongoose.connect("mongodb://localhost/bookAPI");

// The way mongoose translate data extracted from mongodb is the use of models. We create a model of a book that lays out
// what the data in mongodb would look like.
var Book = require("./models/bookModel");

var app = express();

var port = process.env.PORT || 3000;

// We could do direct routing with app.get() or we can spin up an instance of a router. We can use the router to define
// our routes. We pass router into app.use() so that will take care of loading all the roots. This is a cleaning way to
// do api routing.
var bookRouter = express.Router();

// Whenever we try to GET the /Books route, express will call a function.
bookRouter.route("/Books")
    .get(function (req, res) {
        // The query property is a query string passed along with the request. It's used in conjunction with Book.find.
        // An example would be localhost:8000/api/books?genre=Science%20Fiction.
        var query = {};

        // The purpose of this if statement is to limit what the user's query filtering capabilities in the navbar. If
        // the user queries by genre and that genre doesn't even exist then the user query will do nothing.
        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, function (err, books) {
            // Errors will be captured in err while everything else will be in books.
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(books);
            }
        });
    });

// Routing to GET a particular book by its id.
bookRouter.route("/Books/:bookId")
    .get(function (req, res) {
        // The .findById method is used instead of .find and then we're passing in a book id as the first argument.
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(book);
            }
        });
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






























