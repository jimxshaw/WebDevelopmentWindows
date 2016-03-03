var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var gulpMocha = require("gulp-mocha");

// Gulp is a task-runner and we npm installed the gulp-nodemon because we want gulp to run nodemon in addition to many
// other tasks. All we have to do is tell gulp we have a task and have a function that will setup nodemon.
gulp.task("default", function() {
    // Nodemon takes an object in order to configure itself. Add the script that it will run and add what it will
    // watch for. We want it to watch for js extensions. The env allows us to setup certain variables. Use ignore with
    // the folders you want to ignore.
    nodemon({
        script: "app.js",
        ext: "js",
        env: {
            PORT: 8000
        },
        ignore: ["./node_modules/**"]
    }).on("restart", function() {
        // Every time nodemon restarts we want to know that so we'll use the .on method with a callback function.
        console.log("Restarting");
    });
});

// Mocha is a unit testing framework and gulp-mocha is built to work with gulp.
// We're going to pull in all of our tests from our tests directory and have gulp run them. We then pipe that into gulp-mocha.

// To run the tests, execute gulp test .
gulp.task("test", function() {
    gulp.src("tests/*.js", {read: false})
        .pipe(gulpMocha({reporter: "nyan"}));
});



















