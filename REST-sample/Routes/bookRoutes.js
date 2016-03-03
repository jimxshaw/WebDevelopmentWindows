var express = require("express");

// Routing for our app will be placed in this separate file instead of directly in app.js.
// We need a routes function. This function will return a value for this module.exports. Having a routes function
// is nice in that if we'd like to inject anything, dependencies for example, we can simply pass that into this function.
// An example of this is that our routes need access to the book model module called Book that's passed in as a dependency
// from app.js.
var routes = function (Book) {
    // We could do direct routing with app.get() or we can spin up an instance of a router. We can use the router to define
    // our routes. We pass router into app.use() so that will take care of loading all the roots. This is a cleaning way to
    // do api routing.
    var bookRouter = express.Router();

    // Whenever we reach /Books route with a certain HTTP verb, express will execute the appropriate method with a callback function.
    bookRouter.route("/")
        .post(function (req, res) {
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

    // Routing to GET, PUT, PATCH a particular book by its id.
    bookRouter.route("/:bookId")
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
        })
        .put(function(req, res) {
            // PUT aka update is similar to GET except that the existing book's property values are updated with the
            // values that come in from the request. If the request values are empty then that particular book's updated
            // values will be empty as well.
            Book.findById(req.params.bookId, function (err, book) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    book.title = req.body.title;
                    book.author = req.body.author;
                    book.genre = req.body.genre;
                    book.read = req.body.read;
                    book.save(); // Saves the update to mongodb.
                    res.json(book);
                }
            });
        })
        .patch();

    return bookRouter;
};

module.exports = routes;













