const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: 'Incorrect credentials' });
      }
      if (user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect credentials' });
      }
      return done(null, user);
    });
  })
);
