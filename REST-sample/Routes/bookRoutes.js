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

    var bookController = require("../controllers/bookController")(Book);
    // Whenever we reach /Books route with a certain HTTP verb, express will execute the appropriate method with a
    // callback function that's located in our book controller. Of course we also pass in Book, the book model module,
    // so that the members in the book controller will have access to the book model.
    bookRouter.route("/")
        .post(bookController.post)
        .get(bookController.get);

    // DRY means Don't Repeat Yourself. Our book routes will involve repeated code so that means it's time to add some
    // middleware to handle that. What this middleware does is it's going to do a findById and to find the book id. If
    // there's an error, an error will return. If the book exists, add it to the request.
    bookRouter.use("/:bookId", function (req, res, next) {
        // The .findById method is used instead of .find and then we're passing in a book id as the first argument.
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else if (book) {
                // This will make req.book available everywhere down stream to be used.
                req.book = book;
                // Next() simply means moving on to the next middleware along the chain.
                next();
            }
            else {
                // If the book isn't found, return status 404.
                res.status(404).send("No book found");
            }
        });
    });

    // Routing to GET, PUT, PATCH a particular book by its id.
    bookRouter.route("/:bookId")
        .get(function (req, res) {
            // In order to filter our list of books by genre, we'll make the genre property into a hyperlink.
            var returnBook = req.book.toJSON();
            returnBook.links = {};
            var newLink = "http://" + req.headers.host + "/api/books/?genre=" + returnBook.genre;
            // For genres with spaces between the words, we'll replace the spaces with %20.
            returnBook.links.FilterByThisGenre = newLink.replace(" ", "%20");

            // The user's request would hit our middleware with our Book.findById() before ever reaching here. If the
            // book exists then the middleware assigns it to req.book, the same req.book that's passed into res.json below.
            // If the book doesn't exist then the req will never reach here because a 404 status would have displayed.
            res.json(returnBook);
        })
        .put(function (req, res) {
            // PUT aka update is similar to GET except that the existing book's property values are updated with the
            // values that come in from the request. If the request values are empty then that particular book's updated
            // values will be empty as well.
            // Essentially whatever exists in req.book will be updated with what's in req.body.
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;

            // Saves the update to mongodb while handling errors.
            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(req.book);
                }
            });
        })
        .patch(function (req, res) {
            // We're assigning everything in req.body over to req.book but we do not want to update the book id. We add
            // an if statement to remove the id from the request body so that it will never be assigned to req.book.
            if (req.body._id) {
                delete req.body._id;
            }

            for (var property in req.body) {
                req.book[property] = req.body[property];
            }

            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(req.book);
                }
            });
        })
        .delete(function(req, res) {
            // Take whatever book is found up in our middleware and remove it from mongodb. A callback is written to
            // handle errors and to display the removed status.
            req.book.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    // Status 204 means no content, nothing is there.
                    res.status(204).send("Removed");
                }
            });
        });

    return bookRouter;
};

module.exports = routes;













