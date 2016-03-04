var should = require("should");
var request = require("supertest");
// We need access to our app. It's what supertest uses to execute our http calls.
var app = require("../app.js");
var mongoose = require("mongoose");
// The model Book can be pulled directly from mongoose because it's loaded into mongoose from our app.js.
var Book = mongoose.model("Book");
// Agent is what's actually used from supertest to execute all of our http calls based on our app.
var agent = request.agent(app);

// This end-to-end test is similar to our controller unit test.
describe("Book CRUD Test", function () {
    // The reason why we're returning a book id and whether or not the book has been read is because those two properties
    // are automatically created for a book when it's created. The id would be an unique identifier and read defaults
    // to false.
    it("Should allow a book to be posted and return a read and _id", function (done) {
        // First we create a sample book with only title, author and genre. This will be our req.body and what we're posting
        // into our function.
        var bookPost = {title: "Dracula", author: "Bram Stoker", genre: "Fantasy"};

        // Then we use the agent to actually do the work. It will post to a stated route and send the above sample book.
        // The expected status is 200, which is OK, the standard response for successful http requests. When we're done,
        // we end with a callback function called with error or some results. Assertions go inside our .end callback.
        agent.post("/api/books")
            .send(bookPost)
            .expect(200)
            .end(function (err, results) {
                // The default value of whether or not a new book has been read is false.
                results.body.read.should.equal(false);

                //// The whole test should fail if the above line is commented out and this line is run.
                //results.body.read.should.not.equal(false);

                // If a newly created book doesn't have an id field then something screwed up.
                results.body.should.have.property("_id");

                // Let supertest know this particular test is finished and can move on to the next thing. The next thing
                // is the below afterEach().
                done();
            });
    });

    //When all of our tests are done, we run a function.
    afterEach(function (done) {
        // We clear our database and remove the test book.
        Book.remove().exec();
        // We call done to let everything know that we're finished. The overarching describe() will end.
        done();
    });
});




















