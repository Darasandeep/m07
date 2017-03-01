var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser"); // simplifies access to request body

var app = express();  // make express app
var http = require('http').Server(app);  // inject app into the server

// 1 set up the view engine
// 2 manage our entries
app.use(express.static(__dirname + '/assets'));
// 3 set up the logger
// 4 handle valid GET requests
// 5 handle valid POST request
// 6 respond with 404 if a bad URI is requested

// Listen for an application request on port 8081
http.listen(8081, function () {
  console.log('Guestbook app listening on http://127.0.0.1:8081/');
});
// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify our view engine

// 2 create an array to manage our entries
var entries = [];
app.locals.entries = entries; // now entries can be accessed in .ejs files

// 3 set up an http request logger to log every request automagically
app.use(logger("dev"));     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }));



// 4 handle http GET requests (default & /new-entry)
app.get("/", function (request, response) {
  response.render("index");
});
app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});




// 5 handle an http POST request to the new-entry URI 
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({  // store it
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  response.redirect("/");  // where to go next? Let's go to the home page :)
});

// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
  response.status(404).render("404");
});

// Listen for an application request on port 8081 & notify the developer
//http.listen(8081, function () {
 // console.log('Guestbook app listening on http://127.0.0.1:8081/');
//});


