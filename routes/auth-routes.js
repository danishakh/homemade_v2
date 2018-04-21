// *********************************************************************************
// auth-routes.js - this file offers a set of routes for authenticating users with OAuth
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');


module.exports = (app) => {


	// Auth Logout
	app.get('/auth/logout', (req, res) => {
		// handle with passport

		//res.send('logging out');
		//console.log(req.session); 	//will show user id as -> {user: x}
		req.logout();	//removes the userID from the cookie
		//console.log(req.session);		//will show an empty object

		res.redirect("/");
	});

	// Auth with Google
	app.get("/auth/google", passport.authenticate("google", {
		scope: ['profile', 'email']
	}));

	// Callback route for google to redirect to
	app.get("/auth/google/redirect", passport.authenticate("google", { failureRedirect: '/' }),(req, res) => {
		//res.send("google callback URI reached");
		//res.send(req.user);
		//console.log(req.user);
		res.redirect("/profile/"+req.user._id);
	});

	// Get current user logged in
	app.get('/api/currentuser', function(req, res) {
        res.send(req.user);
        console.log(req.user);
    });

	// can be used as middleware
	// function authCheck(req, res, next) {

	//     if (req.isAuthenticated())
	//         return next();
	//     res.redirect('/');
	// }

}