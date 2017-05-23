const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStartegy = require('passport-local');

//Setup options for local Strategy
const localOptions = { usernameField: 'email' };

//Create Local Strategy
const localLogin = new LocalStartegy(localOptions, function(email, password, done) {
  //Check if the email and password matches with a user in db
  //if exists, call done with the user
  //otherwise, call done with false
  User.findOne({ email: email}, function(err, user){
    if(err){ return done(err);}
    if(!user){
      done(null, false);
    }
    //If User exists with the email, compare the passwords
    user.comparePassword(password, function(err, isMatch){
      if(err){ return done(err); }
      if(!isMatch){ return done(null, false);}

      return done(null, user);
    });
  });
});

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    //See if the User ID in payload exists in our database
    //If it does, call 'done' with that user
    //otherwise, call 'done' without a user object
    User.findById(payload.sub, function(err, user) {
      if(err){ return done(err, false); }

      if(user){
        done(null, user);
      }
      else{
        done(null, false);
      }
    });
});

//tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
