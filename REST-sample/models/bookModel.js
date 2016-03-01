// A model is essentially a json object that lays out what a book looks like.
// We have to reference mongoose and schema, which comes from mongoose.
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookModel = new Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default: false}
});

// We're loading this model into mongoose, passing it our bookModel schema and we're aliasing it as Book.
// Finally, we export this model so that in our app.js we have an instance of that book model.
module.exports = mongoose.model("Book", bookModel);














