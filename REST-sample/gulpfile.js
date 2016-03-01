var gulp = require("gulp");
var nodemon = require("gulp-nodemon");

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





















