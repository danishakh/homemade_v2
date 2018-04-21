// Dependencies
// ========================================================
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var keys = require('./keys');
var db = require("../models");


module.exports = function(passport) {

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		db.User.findById(id)
		.populate("dishes")
		.then(user => {
			done(null, user);
		});
	});


	passport.use
		(new GoogleStrategy({

			// Options for the Google Strategy
			callbackURL: "/auth/google/redirect",
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
			proxy: true
		}, (accessToken, refreshToken, profile, done) => {

			process.nextTick(function(){


				
				// Passport callback function
				// this piece of code runs when Google sends back the 'user-code' to our app after the user allows access	
				
				
				//console.log(accessToken);
				console.log("passport callback function fired");

				// Check if user with this googleID exists
				db.User.findOne({googleID: profile.id}).populate("dishes").then(currentUser => {
					if(currentUser) {
						console.log('user is: ');
						//console.log(currentUser);
						//console.log(profile);

						done(null, currentUser);	//send this user to the serializeUser method
					}

					// Create a new user
					else {

						if (profile.photos[0].value) {
							db.User.create({
								name: profile.displayName,
								email: profile.emails[0].value,
								googleID: profile.id,
								imgURL: profile.photos[0].value
							})
							.then(newUser => {
								console.log('new user created ' + newUser);	//send the new user to serializeUser method
								done(null, newUser); 
							})
							.catch(err => {
								console.log(err);
							});
						}
						else {
							db.User.create({
								name: profile.displayName,
								email: profile.emails[0].value,
								googleID: profile.id
							})
							.then(newUser => {
								console.log('new user created ' + newUser);	//send the new user to serializeUser method
								done(null, newUser); 
							})
							.catch(err => {
								console.log(err);
							});
						}
						
					}
				}) 
			})
		})
	)
}