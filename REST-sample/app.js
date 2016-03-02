var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Mongoose.connect takes in a connection string and bookAPI is simply the name of our database of which we'll connect.
// When the app starts up, a connection to the bookAPI database is opened and holds it open until we're ready to use it.
// Even if bookAPI database doesn't exist in mongodb, it will be created for you when mongoose.connect executes.
var db = mongoose.connect("mongodb://localhost/bookAPI");

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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// We could do direct routing with app.get() or we can spin up an instance of a router. We can use the router to define
// our routes. We pass router into app.use() so that will take care of loading all the roots. This is a cleaning way to
// do api routing.
var bookRouter = express.Router();

// Whenever we reach /Books route with a certain HTTP verb, express will execute the appropriate method with a callback function.
bookRouter.route("/Books")
    .post(function(req, res) {
        // To POST data or create a new book, we first instantiate a new book model with the data from the request's
        // body passed in.
        var book = new Book(req.body);

        book.save();
        // The status of 201 means something was created, which is our case is a new book.
        // The reason we're also sending our book back is we want that id to be available to the client,
        // whoever called our api.
        res.status(201).send(book);
    })
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






























