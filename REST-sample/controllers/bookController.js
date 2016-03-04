// We're using the revealing module design pattern. We have a controller and a series of defined functions. We return back the
// functions we want to expose to the outside world. In this case, we're returning two things, our post and get functions.
// Our book routes will have access to these functions, post and get.

var bookController = function (Book) {
    var post = function (req, res) {
        // To POST data or create a new book, we first instantiate a new book model with the data from the request's
        // body passed in.
        var book = new Book(req.body);

        if (!req.body.title) {
            // If there's no title in the request, send a particular status and message.
            res.status(400);
            res.send("Title is required");
        }
        else {
            book.save();
            // The status of 201 means something was created, which is our case is a new book.
            // The reason we're also sending our book back is we want that id to be available to the client,
            // whoever called our api.
            res.status(201);
            res.send(book);
        }
    };

    var get = function (req, res) {
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
                // The purpose of this large else statement is to add hyperlinks to our list of books without having
                // to modify the mongoose book model in bookModel.js.
                // First, we declare an empty array to be used to hold our returned books that have links on them. We
                // loop through the unmodified array of books, for each old book json object we assign to a newly created
                // book object called newBook. Each newBook will have then have an additional property called link, which
                // is an object. Within that links object will be a key-value pair, key being self and the value being
                // the hyperlink to itself. Finally, we push the modified newBook into our returnBooks array.
                var returnBooks = [];
                books.forEach(function(element, index, array) {
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = "http://" + req.headers.host + "/api/books/" + newBook._id;
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
        });
    }

    return {
        post: post,
        get: get
    };
};

module.exports = bookController;












