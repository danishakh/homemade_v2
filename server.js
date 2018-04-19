const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

// Initialize Express
const app = express();

// Require all models
const db = require("./models");
const routes = require("./routes");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.enable('trust proxy');


// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static("client/public"));


// Cookie Session for encryption/decryption userID when passing between client/server
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,		// 1 day in milliseconds
	keys: [keys.session.cookieKey]
}));

// Passport
app.use(passport.initialize());	// middleware to initialize passport
app.use(passport.session());	// use passport session cookies

require('./config/passport-setup.js')(passport);
require('./routes/auth-routes.js')(app);

// Add routes, both API and view
app.use(routes);

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/homemade"); //,{ useMongoClient: true }


// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
