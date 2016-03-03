// Tests on our book controller are placed here.
// Mocha is referenced directly because mocha will run with gulp as part of the installed npm gulp-mocha package.
var should = require("should");
var sinon = require("sinon");

// Describe what we're testing and the function that will execute. Multiple describes can be chained together.
describe("Book Controller Tests", function() {
    // This is testing the post method of the book controller.
    describe("Post", function() {
        it("should not allow an empty title on post", function() {
            // Take a look at the actual post method inside book controller and see what is needed to replicate that.
            // We need a new instance of a book, a .save method, a req.body and a status code.
            var Book = function(book) {
                // Here's a mock instance of a book and a .save method, which doesn't need any actual implementation
                // because in this particular test we're not testing the ability to save.
                this.save = function(){};
            };

            // We're testing to see if an error is thrown when a title isn't included so we'll just send an author
            // in the request.
            var req = {
                body: {
                    author: "F. Scott Fitzgerald"
                }
            };

            // The response implementation needs to have two things, status and send.
            // Sinon.js provides something called spies. Spies watch your functions and report back on how they are called.
            // They don’t change the functionality of your application. They simply report what they see. We can check if
            // status is called and what it's called with.
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // We create an instance of a book controller and pass in our mock book called Book.
            var bookController = require("../controllers/bookController")(Book);

            // Now we simply called the post method of our book controller with our mock request and response as arguments.
            bookController.post(req, res);

            // Should.js is an assertion framework.
            // When our mock book tries to post without a title, an expected status of 400 should be thrown and we're
            // testing whether it equals our actual value of 400. If they are equal we should get true.
            // We also include the bad status args array to display as much info as possible.
            res.status.calledWith(400).should.equal(true, "Bad status " + res.status.args[0][0]); // 400 means bad request.

            res.send.calledWith("Title is required").should.equal(true);
        })
    });
});



























