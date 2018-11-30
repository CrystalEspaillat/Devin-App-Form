// DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// EXPRESS
var app = express();
var PORT = process.env.PORT || 8080;

// BODYPARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SERVE STATIC FILES
app.use(express.static('public'))

// ROUTER
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/home.html"));
});

// LISTENER
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
